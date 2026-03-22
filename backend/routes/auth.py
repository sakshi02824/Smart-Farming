from fastapi import APIRouter, HTTPException, Request, Depends
from fastapi.security import OAuth2PasswordBearer
from models.schema import UserCreate, UserLogin, Token
from services.auth import get_password_hash, verify_password, create_access_token
import jwt
from config.settings import settings

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), request: Request = None):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        db_user = await request.app.mongodb["users"].find_one({"email": email})
        if not db_user:
            raise HTTPException(status_code=401, detail="User not found")
            
        return db_user
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_current_admin(current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=403, 
            detail="Forbidden: Admin access only. Unauthorized intelligence status."
        )
    return current_user

@router.post("/login", response_model=Token)
async def login_user(request: Request, form_data: OAuth2PasswordRequestForm = Depends()):
    db_users = request.app.mongodb["users"]
    
    db_user = await db_users.find_one({"email": form_data.username})
    if not db_user or not verify_password(form_data.password, db_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    role = db_user.get("role", "user")
    access_token = create_access_token(data={"sub": db_user["email"], "role": role})
    
    return {"access_token": access_token, "token_type": "bearer", "role": role, "name": db_user.get("name", "User")}

@router.post("/register")
async def register_user(user: UserCreate, request: Request):
    db_users = request.app.mongodb["users"]
    
    existing_user = await db_users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    user_data = {
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "farm_location": user.farm_location,
        "hashed_password": hashed_password,
        "role": user.role
    }
    
    await db_users.insert_one(user_data)
    
    access_token = create_access_token(data={"sub": user.email, "role": user.role})
    return {"message": "User registered successfully", "access_token": access_token, "role": user.role, "name": user.name}
