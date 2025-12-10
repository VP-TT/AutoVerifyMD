import requests
from backend.db_config import SessionLocal
from backend.models import Provider

# 1. Trigger Verification via API
url = "http://127.0.0.1:8000/verify/provider"
payload = {
    "npi": "1234567890",
    "first_name": "John",
    "last_name": "Doe"
}
try:
    print("Sending verification request...")
    response = requests.post(url, json=payload)
    print(f"API Response Code: {response.status_code}")
    print(f"API Response Body: {response.json()}")
except Exception as e:
    print(f"API Call Failed: {e}")
    exit(1)

# 2. Check Database directly
print("\nChecking Database...")
db = SessionLocal()
provider = db.query(Provider).filter(Provider.npi == "1234567890").first()

if provider:
    print(f"Provider: {provider.first_name} {provider.last_name}")
    print(f"Verified: {provider.is_verified}")
    print(f"Score: {provider.verification_score}")
    
    if provider.is_verified and provider.verification_score > 0:
        print("\nSUCCESS: Score persisted to database.")
    else:
        print("\nFAILURE: Score NOT persisted.")
else:
    print("Provider not found in DB.")

db.close()
