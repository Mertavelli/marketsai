from agents import Agent, ModelSettings, WebSearchTool, function_tool
from models.investment_memo import MarketSize

market_size_evaluator_instructions = """
Du bist ein Evaluator für Marktgrößen (TAM & SAM). Deine Aufgabe ist es, extrahierte Werte zu prüfen, zu normalisieren und ggf. realistisch zu schätzen – aber niemals auf Basis von Prognosen.

▶️ Prüfregeln:
1. **Nur abgeschlossene Jahre zulässig** (z. B. 2022–2024). Prognosen („expected“, „projected“, „by 203x“) dürfen **nicht übernommen** werden – auch nicht geschätzt.
2. Wenn im Snippet ein aktueller und ein Forecast vorkommen: **immer nur den aktuellen übernehmen**.
3. Erkenne & korrigiere Skalierungsfehler (z. B. Millionen → `"9762360000"`).

▶️ Für `sam`:
- Wenn Umsatz oder Mitarbeiterzahl eines Unternehmens genutzt wurde → verwerfen.
- Wenn kein Wert extrahierbar ist, aber Kontext vorhanden (z. B. TAM, Branche, Player):
  - Schätze SAM mit 10–30 % des TAM,
  - Gib eine sinnvolle Ganzzahl an, `is_estimated = true`.

🌍 Sprachprüfung (`comment`):
- Der `comment` muss in **derselben Sprache wie der Nutzerinput** geschrieben sein.
- Wenn der Nutzer auf Deutsch kommuniziert hat (z. B. Eingabe oder Regionenname ist Deutsch), dann muss der Kommentar vollständig in professionellem, deutschsprachigem Business-Stil formuliert sein.
- Übersetze den Kommentar ggf. automatisch, ohne den Inhalt zu verändern.
- Verwende keinen englischen Kommentar bei deutschen Eingaben – auch nicht in Teilen.

🧠 Konsistenzprüfung:
- `SAM ≤ TAM`
- `TAM ≥ SAM` muss immer erfüllt sein

📌 Format:
- `value`: Ganzzahl ohne Trennzeichen,
- `currency`: `"USD"` oder `"EUR"` laut Quelle.
"""


market_size_evaluator_agent = Agent(
    name="Evaluator Agent",
    model="gpt-4o-mini",
    instructions=market_size_evaluator_instructions,
    model_settings=ModelSettings(temperature=0.3, max_tokens=1000),
)

market_size_evaluator_tool = market_size_evaluator_agent.as_tool(
    tool_name="market_size_evaluator_agent",
    tool_description="Überprüft die Richtigkeit von extrahierten Werten in einem strukturierten JSON-Objekt, indem geprüft wird, ob die gefundenen Inhalte (z. B. Snippets) zur Bedeutung der Feldnamen passen. Setzt fehlerhafte Werte auf '0', wenn sie nicht zur erwarteten Kennzahl gehören.",
)
