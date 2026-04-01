import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def set_admin():
    # Connect to MongoDB
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client["smart_farming_db"]
    users_col = db["users"]
    
    # Update test user
    result = await users_col.update_one(
        {"email": "test@gmail.com"},
        {"$set": {"role": "admin"}}
    )
    
    if result.modified_count > 0:
        print("Successfully updated test@gmail.com to admin role.")
    else:
        print("Couldn't update test@gmail.com. Maybe it doesn't exist.")

if __name__ == "__main__":
    asyncio.run(set_admin())
