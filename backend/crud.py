from sqlalchemy.orm import Session
from backend.models import Provider, VerificationTask
import datetime

def get_provider(db: Session, provider_id: int):
    return db.query(Provider).filter(Provider.id == provider_id).first()

def get_provider_by_npi(db: Session, npi: str):
    return db.query(Provider).filter(Provider.npi == npi).first()

def get_providers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Provider).offset(skip).limit(limit).all()

def create_provider(db: Session, provider):
    # provider can be a dict or a Pydantic model
    if hasattr(provider, 'npi'):
        data = provider.dict() if hasattr(provider, 'dict') else provider.model_dump()
    else:
        data = provider

    db_provider = Provider(
        npi=data.get("npi"),
        first_name=data.get("first_name"),
        last_name=data.get("last_name"),
        specialty=data.get("specialty"),
        address=data.get("address"),
        phone=data.get("phone"),
        is_verified=False,
        verification_score=0
    )
    db.add(db_provider)
    db.commit()
    db.refresh(db_provider)
    return db_provider

def create_verification_task(db: Session, task_id: str, provider_id: int):
    db_task = VerificationTask(
        id=task_id,
        provider_id=provider_id,
        status="Pending"
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def update_provider_verification(db: Session, provider_id: int, score: int):
    db_provider = db.query(Provider).filter(Provider.id == provider_id).first()
    if db_provider:
        db_provider.verification_score = score
        db_provider.is_verified = True
        db.commit()
        db.refresh(db_provider)
    return db_provider
