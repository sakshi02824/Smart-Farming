import asyncio
from fastapi.testclient import TestClient
from main import app

with TestClient(app) as client:
    res = client.post("/api/auth/register", json={
        "name": "Test",
        "email": "test2@test.com",
        "phone": "1234567890",
        "farm_location": "Test",
        "password": "password",
        "role": "user"
    })

    res = client.post("/api/auth/login", data={"username": "test2@test.com", "password": "password"})
    token = res.json().get("access_token")

    headers = {"Authorization": f"Bearer {token}"}
    payload = {
        "temperature": 25,
        "humidity": 60,
        "rainfall": 100,
        "soil_type": "loamy",
        "ph_value": 4.3,
        "N": 10,
        "P": 10,
        "K": 10
    }
    res = client.post("/api/ml/recommend-crop", json=payload, headers=headers)
    with open("test_output.txt", "w") as f:
        f.write(f"STATUS CODE: {res.status_code}\n")
        f.write(f"RESPONSE: {res.json()}\n")
