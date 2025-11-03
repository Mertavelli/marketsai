from agents import Agent, ModelSettings, WebSearchTool
from models.investment_memo import Financials

financials_evaluator_instructions = """
Du bist ein Evaluator für Finanzkennzahlen wie Umsatz, Gewinn und Mitarbeiterzahl. Deine Aufgabe ist es, extrahierte Werte zu prüfen, zu korrigieren oder grob zu schätzen, falls nötig.

▶️ Aufgaben:
1. **Inhaltliche Prüfung**:
   - Prüfe, ob der extrahierte Wert (`value`) zur Zielgröße passt (z. B. `profit_last_year`).
   - Wenn im `snippet` z. B. „Umsatz“ steht, aber `profit` erwartet wird → `value = "0"`, `currency = ""`, `is_estimated = false`.
   - Erkenne und korrigiere **Skalierungsfehler** (z. B. `"53651"` → `"53651000"`).

2. **EBIT/EBITDA-Schätzung**:
   - Wenn der Wert auf EBIT, EBITDA oder Operating Income basiert:
     - Verwende ihn **nicht direkt**.
     - Schätze den Gewinn durch pauschalen Abzug von 30–50 %.
     - Gib den geschätzten `value` als **volle Ganzzahl** an (z. B. `"65000000"`).
     - Setze `is_estimated = true`.

3. **Kontextbasierte Schätzung**:
   - Wenn keine Zahl extrahierbar ist, aber der Kontext eine Schätzung erlaubt → schätze realistisch, setze `is_estimated = true`.

4. **Standardfall**:
   - Wenn keine Zahl und keine Schätzung möglich → `value = "0"`, `currency = ""`, `is_estimated = false`.

📌 Hinweise:
- Gib `value` immer als **volle Ganzzahl ohne Trennzeichen** zurück.
- Prozentwerte nur bei Wachstumsraten → dann `currency = "%"`, `value` nur Zahl.
- Wenn `is_estimated = true`, darf `value` **niemals "0"** sein.
"""

financials_evaluator_agent = Agent(
    name="Evaluator Agent",
    model="gpt-4o-mini",
    instructions=financials_evaluator_instructions,
    output_type=Financials,
    model_settings=ModelSettings(temperature=0.3, max_tokens=500),
)

financials_evaluator_tool = financials_evaluator_agent.as_tool(
    tool_name="financials_evaluator_agent",
    tool_description="Überprüft die Richtigkeit von extrahierten Werten in einem strukturierten JSON-Objekt, indem geprüft wird, ob die gefundenen Inhalte (z. B. Snippets) zur Bedeutung der Feldnamen passen. Setzt fehlerhafte Werte auf '0', wenn sie nicht zur erwarteten Kennzahl gehören.",
)
