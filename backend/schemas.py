from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ProviderBase(BaseModel):
    npi: str
    first_name: str
    last_name: str
    specialty: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None

class ProviderCreate(ProviderBase):
    pass

class Provider(ProviderBase):
    id: int
    is_verified: bool
    verification_score: int
    last_updated: datetime

    class Config:
        from_attributes = True

class VerificationTaskBase(BaseModel):
    provider_id: int
    status: str

class VerificationTask(VerificationTaskBase):
    id: str
    result_summary: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
