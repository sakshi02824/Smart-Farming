from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import logging

# Ensure absolute imports work if ran from within backend structure
from routes import ml, weather, auth, admin, guides
from config.settings import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Connect to MongoDB
    logger.info("Connecting to MongoDB...")
    try:
        app.mongodb_client = AsyncIOMotorClient(settings.MONGODB_URL)
        app.mongodb = app.mongodb_client[settings.DATABASE_NAME]
        logger.info(f"Successfully connected to MongoDB database: {settings.DATABASE_NAME}")
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        # In a real app, you might want to exit here
    
    yield
    
    # Shutdown: Close connection
    logger.info("Closing MongoDB connection...")
    app.mongodb_client.close()

app = FastAPI(
    title="Smart Climate-Based Farming Guidance API",
    description="API for crop recommendation, weather forecasts, and administrative alerts.",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
origins = [
    "http://localhost:5173",  # React Vite Frontend
    "http://127.0.0.1:5173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin Console"])
app.include_router(guides.router, prefix="/api/guides", tags=["Farming Guides"])
app.include_router(ml.router, prefix="/api/ml", tags=["Machine Learning"])
app.include_router(weather.router, prefix="/api/weather", tags=["Weather"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Smart Farming System Backend Protocol. MongoDB is connected!"}
