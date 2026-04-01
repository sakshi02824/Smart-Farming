from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional, List
import re

# --- AUTHENTICATION SCHEMAS ---
class UserCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8)
    phone: Optional[str] = Field(None, pattern=r"^[6-9]\d{9}$")
    farm_location: Optional[str] = Field(None, min_length=3)
    role: Optional[str] = "user"

    @field_validator('email')
    def validate_email_format(cls, v):
        if not re.match(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", v):
            raise ValueError('Invalid email format')
        return v

    @field_validator('name')
    def validate_name(cls, v):
        if not re.match(r"^[A-Za-z\s]+$", v):
            raise ValueError('Name must contain only letters and spaces')
        return v

    @field_validator('password')
    def validate_password(cls, v):
        if not re.search(r"[A-Z]", v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not re.search(r"[a-z]", v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not re.search(r"\d", v):
            raise ValueError('Password must contain at least one number')
        if not re.search(r"[!@#$%^&\*\(\)_\+\-\=\[\]\{\};':\"\\|,.<>\/?]+", v):
            raise ValueError('Password must contain at least one special character')
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
    name: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone: Optional[str] = None
    farm_location: Optional[str] = None
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
