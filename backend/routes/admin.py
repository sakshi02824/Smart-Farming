from fastapi import APIRouter, HTTPException, Request, Depends
from models.schema import GuideCreate, AlertCreate
from routes.auth import get_current_user
from datetime import datetime

router = APIRouter()

@router.post("/guides")
async def create_guide(guide: GuideCreate, request: Request, current_user: str = Depends(get_current_user)):
    db_guides = request.app.mongodb["farming_guides"]
    guide_data = guide.dict()
    guide_data["created_by"] = current_user
    guide_data["timestamp"] = datetime.utcnow()
    await db_guides.insert_one(guide_data)
    return {"message": "Farming guide added successfully"}

@router.post("/alerts")
async def create_alert(alert: AlertCreate, request: Request, current_user: str = Depends(get_current_user)):
    db_alerts = request.app.mongodb["alerts"]
    alert_data = alert.dict()
    alert_data["created_by"] = current_user
    alert_data["timestamp"] = datetime.utcnow()
    await db_alerts.insert_one(alert_data)
    return {"message": "Alert generated successfully"}

@router.get("/alerts")
async def get_alerts(request: Request):
    db_alerts = request.app.mongodb["alerts"]
    alerts = await db_alerts.find().sort("timestamp", -1).to_list(10)
    for alert in alerts:
        alert["_id"] = str(alert["_id"])
    return alerts
