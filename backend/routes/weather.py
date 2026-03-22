import httpx
from fastapi import APIRouter, Depends, HTTPException, Query
from config.settings import settings

router = APIRouter()

@router.get("/")
async def get_weather(city: str = Query(..., description="City name to fetch weather for")):
    if not settings.OPENWEATHERMAP_API_KEY or settings.OPENWEATHERMAP_API_KEY == "your_openweathermap_api_key_here":
        # Return mock data if API key is not set
        return {
            "city": city,
            "temperature": 25.5,
            "humidity": 60,
            "wind_speed": 12.5,
            "weather_condition": "Clear",
            "mocked": True,
            "forecast": [
                {"day": "Day 1", "temp": 26, "condition": "Sunny"},
                {"day": "Day 2", "temp": 24, "condition": "Cloudy"},
                {"day": "Day 3", "temp": 22, "condition": "Rainy"},
                {"day": "Day 4", "temp": 23, "condition": "Partly Cloudy"},
                {"day": "Day 5", "temp": 25, "condition": "Clear"}
            ]
        }

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={settings.OPENWEATHERMAP_API_KEY}&units=metric"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to fetch weather data")
        
        data = response.json()
        
        # Also fetching forecast
        forecast_url = f"http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={settings.OPENWEATHERMAP_API_KEY}&units=metric"
        forecast_response = await client.get(forecast_url)
        forecast_data = []
        if forecast_response.status_code == 200:
            fd = forecast_response.json()
            # Extract one forecast per day (every 8th item for 3hr gaps)
            forecast_data = [
                {"date": item["dt_txt"], "temp": item["main"]["temp"], "condition": item["weather"][0]["main"]}
                for item in fd.get("list", [])[0::8][:5]
            ]
        
        return {
            "city": data.get("name"),
            "temperature": data.get("main", {}).get("temp"),
            "humidity": data.get("main", {}).get("humidity"),
            "wind_speed": data.get("wind", {}).get("speed"),
            "weather_condition": data.get("weather", [{}])[0].get("main"),
            "forecast": forecast_data
        }
