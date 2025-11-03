from agents import Agent, ModelSettings, WebSearchTool
from models.investment_memo import CompanyOverview

company_overview_instructions = """
Du bist ein Company Analyse Agent. Deine Aufgabe ist es zentrale Informationen eines Unternehmens zu ermitteln:

1. Vollständiger rechtlicher Name des Unternehmens mit Rechtszusatz
2. Industrie des Unternehmens
3. Website des Unternehmens
4. Headquarter des Unternehmens

Wichtig:
- Wenn ein Ergebnis unvollständig oder leer ist, akzeptiere es wie es ist.
- Nutze immer das **aktuellste verfügbare Jahr** (z. B. 2024).
"""

company_overview_agent = Agent(
    name="Company Overview Agent",
    model="gpt-4o-mini",
    instructions=company_overview_instructions,
    output_type=CompanyOverview,
    model_settings=ModelSettings(max_tokens=500),
)
