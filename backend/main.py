from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from backend.agents.orchestrator import OrchestratorAgent
from backend.db_config import engine, Base, get_db
import backend.crud as crud
import backend.models as models

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AutoVerifyMD API", version="1.0.0")

# CORS Setup
origins = ["http://localhost:5173", "http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

orchestrator = OrchestratorAgent()

import backend.schemas as schemas

@app.get("/")
def read_root():
    return {"message": "Welcome to AutoVerifyMD API"}

@app.get("/providers", response_model=list[schemas.Provider])
def read_providers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    providers = crud.get_providers(db, skip=skip, limit=limit)
    return providers

@app.post("/verify/provider")
def verify_provider(provider_data: schemas.ProviderCreate, db: Session = Depends(get_db)):

    """
    Trigger the verification process for a provider.
    """

    # Create provider record if not exists
    npi = provider_data.npi
    provider = crud.get_provider_by_npi(db, npi)
    if not provider:
        provider = crud.create_provider(db, provider_data)
    
    result = orchestrator.dispatch_verification(provider_data.model_dump())
    task_id = result["task_id"]
    score = result["score"]
    
    crud.create_verification_task(db, task_id, provider.id)
    crud.update_provider_verification(db, provider.id, score)
    
    return {"task_id": task_id, "message": "Verification started", "provider_id": provider.id, "score": score}
