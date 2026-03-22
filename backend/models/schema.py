from pydantic import BaseModel, EmailStr
from typing import Optional, List

# --- AUTHENTICATION SCHEMAS ---
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone: Optional[str] = None
    farm_location: Optional[str] = None
    role: Optional[str] = "user"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: str

# --- ADMIN SCHEMAS ---
class GuideCreate(BaseModel):
    crop: str
    soil_preparation: str
    seed_selection: str
    irrigation_method: str
    fertilizer_usage: str
    pest_control: str
    harvesting_time: str

class AlertCreate(BaseModel):
    type: str
    severity: str
    message: str
