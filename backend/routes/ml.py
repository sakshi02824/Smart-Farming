from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel
import pickle
import os
from routes.auth import get_current_user

router = APIRouter()

class CropPredictionRequest(BaseModel):
    temperature: float
    humidity: float
    rainfall: float
    soil_type: str
    ph_value: float
    N: float = 0.0
    P: float = 0.0
    K: float = 0.0

class CropPredictionResponse(BaseModel):
    recommended_crop: str
    reason: str
    suitable_season: str

MODEL_PATH = os.path.join(os.path.dirname(__file__), "../../ml_model/crop_prediction_model.pkl")

# Load model lazily
model = None

def get_model():
    global model
    if model is None:
        try:
            with open(MODEL_PATH, "rb") as f:
                model = pickle.load(f)
        except Exception as e:
            # Fallback for demonstration if model is not generated yet
            print(f"Warning: Model not found at {MODEL_PATH}. Using mock predictor.")
            return "MOCK"
    return model

# Soil type encoding dictionary used during training
SOIL_TYPE_MAPPING = {
    "clay": 0,
    "sandy": 1,
    "loamy": 2,
    "silt": 3,
    "peaty": 4,
    "saline": 5
}

@router.post("/recommend-crop", response_model=CropPredictionResponse)
async def recommend_crop(req: CropPredictionRequest, request: Request, current_user = Depends(get_current_user)):
    predictor = get_model()
    
    # Simple logic for mock predictor if ML model is missing
    if predictor == "MOCK":
        crop = "Wheat"
        if req.rainfall > 150:
            crop = "Rice"
        elif req.temperature > 30 and req.humidity < 50:
            crop = "Cotton"
        elif req.ph_value < 6.0:
            crop = "Tea"
        
        result = {
            "recommended_crop": crop,
            "reason": f"Based on the given metrics ({req.temperature}C, {req.humidity}% humidity, {req.rainfall}mm rainfall).",
            "suitable_season": "Kharif/Rabi (Mocked)"
        }
    else:
        try:
            soil_encoded = SOIL_TYPE_MAPPING.get(req.soil_type.lower(), 2) # default to loamy
            # Features order must match training: N, P, K, temperature, humidity, rainfall, soil_type, ph_value
            features = [[req.N, req.P, req.K, req.temperature, req.humidity, req.rainfall, soil_encoded, req.ph_value]]
            prediction = predictor.predict(features)[0]
            
            # For demonstration, map prediction to typical rules
            season_mapping = {
                "rice": "Kharif", "wheat": "Rabi", "maize": "Kharif/Rabi", 
                "cotton": "Kharif", "tea": "Ongoing", "coffee": "Ongoing",
                "mungbean": "Summer", "grapes": "Rabi/Spring"
            }
            
            result = {
                "recommended_crop": prediction.capitalize(),
                "reason": "Predicted using Random Forest based on inputted soil nutrients (N, P, K), climate, and soil pH.",
                "suitable_season": season_mapping.get(prediction.lower(), "Dependent on Region")
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    # Save recommendation to database
    db_record = result.copy()
    db_record["user_id"] = str(current_user["_id"])
    db_record["inputs"] = req.dict()
    await request.app.mongodb["recommendations"].insert_one(db_record)
    
    return result
