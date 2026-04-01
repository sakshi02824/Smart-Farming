import asyncio
from fastapi.testclient import TestClient
from main import app

def run():
    with TestClient(app) as client:
        with open("profile_test_out.txt", "w") as f:
            f.write("--- Testing Validation & Profile ---\n")
            
            # Test 1: Invalid 11-digit mobile
            r1 = client.post("/api/auth/register", json={
                "name": "Jane Test",
                "email": "jane@gmail.com",
                "password": "StrongPassword123!",
                "phone": "90000000000", # 11 digits
                "farm_location": "Delhi"
            })
            f.write(f"11-digit phone (Should Fail 422): {r1.status_code}\n")
            
            # Test 2: Valid 10-digit mobile starting with 9
            email = "jane.valid@gmail.com"
            r2 = client.post("/api/auth/register", json={
                "name": "Jane Test",
                "email": email,
                "password": "StrongPassword123!",
                "phone": "9123456780",
                "farm_location": "Delhi"
            })
            f.write(f"10-digit phone (Should Pass 200/400): {r2.status_code}\n")
            
            # Login to get token
            r = client.post("/api/auth/login", data={"username": email, "password": "StrongPassword123!"})
            token = r.json().get("access_token")
            
            # Test 3: Get Profile
            r3 = client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
            f.write(f"Profile Data (Should be 200): {r3.status_code} - {r3.json()}\n")

if __name__ == "__main__":
    run()
