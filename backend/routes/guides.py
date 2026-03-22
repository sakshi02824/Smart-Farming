from fastapi import APIRouter, Request

router = APIRouter()

@router.get("/farming-guide")
async def get_all_guides(request: Request):
    db_guides = request.app.mongodb["farming_guides"]
    guides = await db_guides.find().to_list(100)
    # convert ObjectIDs to string
    for guide in guides:
        guide["_id"] = str(guide["_id"])
    return guides
