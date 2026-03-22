from fastapi import APIRouter, HTTPException, Request, Depends
from fastapi.security import OAuth2PasswordBearer
from models.schema import UserCreate, UserLogin, Token
from services.auth import get_password_hash, verify_password, create_access_token
import jwt
from config.settings import settings

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return email
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.post("/register")
async def register_user(user: UserCreate, request: Request):
    db_users = request.app.mongodb["users"]
    
    # Check if user already exists
    existing_user = await db_users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    user_data = {
        "name": user.name,
        "email": user.email,
        "hashed_password": hashed_password
    }
    
    await db_users.insert_one(user_data)
    
    # Generate token to auto-login after register
    access_token = create_access_token(data={"sub": user.email})
    return {"message": "User registered successfully", "access_token": access_token}

@router.post("/login", response_model=Token)
async def login_user(user: UserLogin, request: Request):
    db_users = request.app.mongodb["users"]
    
    db_user = await db_users.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Create JWT token
    access_token = create_access_token(data={"sub": db_user["email"]})
    
    return {"access_token": access_token, "token_type": "bearer", "user": {"name": db_user["name"], "email": db_user["email"]}}
