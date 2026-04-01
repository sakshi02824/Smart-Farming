import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime

async def seed_guides():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client["smart_farming_db"]
    guides_col = db["farming_guides"]
    
    # Check if we already have these guides to avoid duplicates
    existing_count = await guides_col.count_documents({})
    if existing_count > 1:
        print(f"Database already has {existing_count} guides. Seeding cautiously.")

    guides_to_insert = [
        {
            "crop": "Rice",
            "soil_preparation": "Puddle the soil to create a hardpan which prevents water loss. Ensure the field is well-leveled.",
            "seed_selection": "Choose high-yielding, disease-resistant varieties suited for your region's climate.",
            "irrigation_method": "Maintain continuous flooding of 2-5 cm during the vegetative stage. Drain before harvest.",
            "fertilizer_usage": "Apply NPK (Nitrogen, Phosphorous, Potassium) based on soil test. Use split doses of Nitrogen.",
            "pest_control": "Monitor for stem borers and leaf folders. Use neem oil or integrated pest management.",
            "harvesting_time": "Harvest when 80% of the panicles turn straw color and grains are hard.",
            "created_by": "system_seeder",
            "timestamp": datetime.utcnow()
        },
        {
            "crop": "Corn (Maize)",
            "soil_preparation": "Deep plowing followed by harrowing to break clods. Ideal soil pH is 5.8 to 7.0.",
            "seed_selection": "Select hybrid seeds treated with fungicides for better germination and yield.",
            "irrigation_method": "Requires crucial watering during tasseling and silking stages. Drip irrigation is highly effective.",
            "fertilizer_usage": "Heavy feeder of Nitrogen. Apply basal dose of NPK and side-dress Nitrogen later.",
            "pest_control": "Fall armyworms are a major threat. Use pheromone traps and recommended bio-pesticides.",
            "harvesting_time": "Harvest when the husk turns brown and silks are completely dry.",
            "created_by": "system_seeder",
            "timestamp": datetime.utcnow()
        },
        {
            "crop": "Tomato",
            "soil_preparation": "Prepare raised beds for good drainage. Incorporate well-rotted organic manure.",
            "seed_selection": "Use certified, disease-resistant seeds. Start in a nursery before transplanting.",
            "irrigation_method": "Drip irrigation is best to avoid wetting the leaves and preventing fungal diseases.",
            "fertilizer_usage": "Requires balanced NPK. High potassium is needed during the fruiting stage.",
            "pest_control": "Watch for whiteflies and fruit borers. Use yellow sticky traps and safe insecticides.",
            "harvesting_time": "Harvest at the breaker stage for distant markets, or fully ripe for local use.",
            "created_by": "system_seeder",
            "timestamp": datetime.utcnow()
        },
        {
            "crop": "Potato",
            "soil_preparation": "Requires loose, well-drained, deep sandy loam soil. Avoid waterlogged areas.",
            "seed_selection": "Use certified disease-free seed tubers with visible sprouts.",
            "irrigation_method": "Keep soil evenly moist but not soggy. Stop irrigation 10-15 days before harvest.",
            "fertilizer_usage": "Apply phosphorous heavily at planting. Nitrogen should be split.",
            "pest_control": "Control potato beetles and late blight using appropriate fungicides and crop rotation.",
            "harvesting_time": "Harvest when the vines die back and the potato skin is firm.",
            "created_by": "system_seeder",
            "timestamp": datetime.utcnow()
        },
        {
            "crop": "Sugarcane",
            "soil_preparation": "Deep plowing up to 60 cm. Prepare ridges and furrows for proper water management.",
            "seed_selection": "Use healthy setts (stem cuttings) with 2-3 buds treated with fungicide.",
            "irrigation_method": "High water requirement. furrow irrigation or drip irrigation is recommended.",
            "fertilizer_usage": "Requires heavy manuring and NPK applications throughout the growth cycle.",
            "pest_control": "Early shoot borer and termites are common. Use deep plowing and safe systemic insecticides.",
            "harvesting_time": "Harvest at 10-18 months depending on the variety, when sucrose content is peak.",
            "created_by": "system_seeder",
            "timestamp": datetime.utcnow()
        },
        {
            "crop": "Cotton",
            "soil_preparation": "Requires deep soil with good drainage. Deep plowing helps root penetration.",
            "seed_selection": "Use Bt cotton or certified hybrid seeds for better pest resistance and yield.",
            "irrigation_method": "Drip irrigation is highly efficient. Avoid water stress during flowering and boll formation.",
            "fertilizer_usage": "Apply NPK in split doses. Boron and Magnesium sprays improve boll retention.",
            "pest_control": "Bollworms and whiteflies are severe. Follow IPM and use yellow sticky traps.",
            "harvesting_time": "Pick manually when bolls are fully opened and fluffy on dry, sunny days.",
            "created_by": "system_seeder",
            "timestamp": datetime.utcnow()
        },
        {
            "crop": "Soybean",
            "soil_preparation": "Thorough seedbed preparation to ensure good seed-to-soil contact.",
            "seed_selection": "Choose high-germination, disease-free seeds. Inoculate with Rhizobium bacteria.",
            "irrigation_method": "Crucial during pod fill stage. Usually grown as a rainfed crop but may need supplemental watering.",
            "fertilizer_usage": "Low nitrogen requirement due to fixation. Focus on Phosphorous and Potassium.",
            "pest_control": "Monitor for soybean aphids and pod borers. Use appropriately timed organic sprays.",
            "harvesting_time": "Harvest when leaves drop off and pods turn brown and dry.",
            "created_by": "system_seeder",
            "timestamp": datetime.utcnow()
        }
    ]

    # Insert only if they don't already exist to avoid spamming the DB
    inserted = 0
    for guide in guides_to_insert:
        exists = await guides_col.find_one({"crop": {"$regex": f"^{guide['crop']}$", "$options": "i"}})
        if not exists:
            await guides_col.insert_one(guide)
            inserted += 1
            
    print(f"Successfully seeded {inserted} new crop guides into the database.")

if __name__ == "__main__":
    asyncio.run(seed_guides())
