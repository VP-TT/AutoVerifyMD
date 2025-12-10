from sqlalchemy import Column, Integer, String, Boolean, DateTime
from backend.db_config import Base
from datetime import datetime

class Provider(Base):
    __tablename__ = "providers"
    
    id = Column(Integer, primary_key=True, index=True)
    npi = Column(String, unique=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    specialty = Column(String)
    address = Column(String)
    phone = Column(String)
    is_verified = Column(Boolean, default=False)
    verification_score = Column(Integer, default=0)
    last_updated = Column(DateTime, default=datetime.utcnow)

class VerificationTask(Base):
    __tablename__ = "verification_tasks"
    
    id = Column(String, primary_key=True)
    provider_id = Column(Integer)
    status = Column(String) # Pending, In Progress, Completed, Failed
    result_summary = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
