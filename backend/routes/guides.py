from fastapi import APIRouter, Request
from typing import Optional

router = APIRouter()

@router.get("/farming-guide")
async def get_all_guides(request: Request, crop: Optional[str] = None):
    db_guides = request.app.mongodb["farming_guides"]
    query = {}
    if crop:
        query["crop"] = {"$regex": crop, "$options": "i"}
    guides = await db_guides.find(query).to_list(100)
    # convert ObjectIDs to string
    for guide in guides:
        guide["_id"] = str(guide["_id"])
    return guides
