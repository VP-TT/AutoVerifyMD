import uuid
from backend.agents.worker_agents import VerificationAgent, EnrichmentAgent, QualityAssuranceAgent

class OrchestratorAgent:
    def __init__(self):
        self.verifier = VerificationAgent()
        self.enricher = EnrichmentAgent()
        self.qa = QualityAssuranceAgent()

    def dispatch_verification(self, provider_data: dict) -> str:
        """
        Orchestrate the verification flow:
        1. Validate using VerificationAgent
        2. Enrich using EnrichmentAgent
        3. QA check
        """
        task_id = str(uuid.uuid4())
        print(f"[{task_id}] Starting verification flow for {provider_data.get('npi')}")

        # In a real async setup, these would be Celery tasks. 
        # For prototype, we call them synchronously or simulate async.
        
        # Step 1: Verification
        verification_result = self.verifier.verify(provider_data)
        
        # Step 2: Enrichment (if verification passed or needs more info)
        enriched_data = self.enricher.enrich(provider_data)
        
        # Step 3: QA
        final_score = self.qa.assess_quality(verification_result, enriched_data)
        
        print(f"[{task_id}] Process complete. Score: {final_score}")
        return {"task_id": task_id, "score": final_score}
