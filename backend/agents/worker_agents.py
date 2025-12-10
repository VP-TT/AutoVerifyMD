import random

class VerificationAgent:
    def verify(self, data: dict):
        print("  [VerificationAgent] Checking NPI registry and state boards...")
        # Simulate API check
        return {"status": "valid", "source": "NPI Registry"}

class EnrichmentAgent:
    def enrich(self, data: dict):
        print("  [EnrichmentAgent] Searching for missing phone/address...")
        # Simulate web search or Google Maps API
        return {**data, "phone": "555-0199"}

class QualityAssuranceAgent:
    def assess_quality(self, verification_result, enriched_data):
        print("  [QualityAssuranceAgent] Calculating confidence score...")
        # Logic to determine data quality
        return random.randint(85, 100)
