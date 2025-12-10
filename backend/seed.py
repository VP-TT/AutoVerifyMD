from sqlalchemy.orm import Session
from backend.db_config import SessionLocal, engine, Base
from backend.models import Provider
import random

def seed_data():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()
    
    if db.query(Provider).count() > 0:
        print("Database already seeded.")
        return

    providers = [
        {"npi": "1234567890", "first_name": "John", "last_name": "Doe", "specialty": "Cardiology", "address": "123 Heart St", "phone": "555-1234"},
        {"npi": "0987654321", "first_name": "Jane", "last_name": "Smith", "specialty": "Dermatology", "address": "456 Skin Ave", "phone": "555-5678"},
        {"npi": "1122334455", "first_name": "Emily", "last_name": "White", "specialty": "Pediatrics", "address": "789 Kid Ln", "phone": "555-9012"},
        {"npi": "5544332211", "first_name": "Michael", "last_name": "Brown", "specialty": "Neurology", "address": "321 Brain Blvd", "phone": "555-3456"},
        {"npi": "6677889900", "first_name": "Sarah", "last_name": "Davis", "specialty": "Orthopedics", "address": "654 Bone Rd", "phone": "555-7890"},
    ]

    for p in providers:
        db_provider = Provider(**p)
        db.add(db_provider)
    
    db.commit()
    print("Seeded 5 providers.")
    db.close()

if __name__ == "__main__":
    seed_data()
