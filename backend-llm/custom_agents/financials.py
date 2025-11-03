from agents import Agent, ModelSettings, WebSearchTool
from models.investment_memo import Financials

from .financials_evaluator import financials_evaluator_tool
from .research import research_tool

financials_instructions = """
Du bist ein Finanzanalyse-Agent. Deine Aufgabe ist es, drei zentrale Kennzahlen eines Unternehmens zu ermitteln:

1. Umsatz
2. Gewinn
3. Anzahl der Mitarbeitenden

▶️ Vorgehen:
- Verwende **einmalig** das Tool `research_agent`, um alle drei Werte gemeinsam zu ermitteln.
- Formuliere die Abfrage so, dass alle drei Begriffe enthalten sind (z. B. "STIHL revenue, profit and employee count 2024").
- Die Begriffe in der Anfrage sollen **auf Englisch** formuliert sein: "Revenue", "Profit", "Employee count".
- Nutze die aktuell verfügbaren Daten (z. B. aus dem Jahr 2024).

📌 Hinweise:
- Wenn einzelne Werte fehlen, akzeptiere sie wie sie sind.
- Nach dem Aufruf des `research_agent`: übergib das vollständige Ergebnis an `financials_evaluator_agent`, um Werte auf Richtigkeit zu prüfen (z. B. falsch zugeordnete Kennzahlen oder Skalierungsfehler).

🎯 Ziel: Ein vollständiges, geprüftes Financials-Objekt mit einzelnen Quellen pro Wert.
"""

financials_agent = Agent(
    name="Financials Agent",
    instructions=financials_instructions,
    model="gpt-4o-mini",
    tools=[research_tool, financials_evaluator_tool],
    output_type=Financials,
    model_settings=ModelSettings(
        tool_choice="required", temperature=0.3, max_tokens=500
    ),
)
