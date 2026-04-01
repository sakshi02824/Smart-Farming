import asyncio
from fastapi.testclient import TestClient
from main import app

def run_tests():
    with TestClient(app) as client:
        with open("validation_results.txt", "w") as f:
            f.write("--- Testing Backend Validation ---\n")
            
            # Test 1: Weak Password
            res1 = client.post("/api/auth/register", json={
                "name": "Valid Name",
                "email": "test_weak@test.com",
                "phone": "+919000000000",
                "farm_location": "Test Loc",
                "password": "weak", # Should fail length and complexity
                "role": "user"
            })
            f.write(f"Test 1 (Weak Pass): {res1.status_code} - {res1.json()}\n")
            
            # Test 2: Invalid Name
            res2 = client.post("/api/auth/register", json={
                "name": "Invalid123", # Should fail (no numbers allowed)
                "email": "test_name@test.com",
                "phone": "+919000000000",
                "farm_location": "Test Loc",
                "password": "StrongPassword123!",
                "role": "user"
            })
            f.write(f"Test 2 (Invalid Name): {res2.status_code} - {res2.json()}\n")
            
            # Test 3: Invalid Phone
            res3 = client.post("/api/auth/register", json={
                "name": "Valid Name",
                "email": "test_phone@test.com",
                "phone": "invalid_phone", # Should fail regex
                "farm_location": "Test Loc",
                "password": "StrongPassword123!",
                "role": "user"
            })
            f.write(f"Test 3 (Invalid Phone): {res3.status_code} - {res3.json()}\n")

if __name__ == "__main__":
    run_tests()
