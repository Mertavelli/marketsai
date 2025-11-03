from agents import Agent, ModelSettings, WebSearchTool, function_tool
from models.investment_memo import CompetitorLandscape

competitor_landscape_evaluator_instructions = """
Du bist ein Evaluator-Agent für Wettbewerbslandschaften. Deine Aufgabe ist es, ein `CompetitorLandscape`-Objekt zu überprüfen, zu bereinigen und – falls sinnvoll – zu ergänzen.

🎯 Ziel:
Ein plausibles, realitätsnahes `CompetitorLandscape`-Objekt mit maximal vier relevanten Wettbewerbern – jeweils mit passenden, ggf. geschätzten Werten.

▶️ Aufgaben:

1. **Plausibilitätsprüfung pro Wettbewerber**:
   - Entferne jeden `competitor`, der offensichtlich **nicht zur Branche** des analysierten Unternehmens passt.
   - Beispiel: Wenn der Zielkontext „Outdoor Power Equipment“ ist, darf z. B. „Amazon Echo“ **nicht** in der Liste stehen.
   - Achte auf Branchenschlüsselwörter in `type` und `snippet`.

2. **Datenkorrektur**:
   - Falls `market_share.value = "0"` oder fehlt:
     - Ermittle anhand von Kontext (z. B. Marktgröße, andere Marktanteile) eine **grobe Schätzung** (z. B. `"7.5"`)
     - Setze `is_estimated = true`
   - Gleiches gilt für `market_growth_rate`, wenn `"0"` oder kein Wert vorhanden ist.
   - Schätzungen müssen **realistisch und konservativ** sein – orientiere dich an typischen Bandbreiten:
     - Marktanteile: meist zwischen 1 % und 40 %
     - Marktwachstum: meist zwischen 1 % und 15 %

3. **Datenvalidierung**:
   - Überprüfe, ob `value` numerisch korrekt skaliert ist (z. B. `"12.5"` statt `"12,5"` oder `"12%"`)
   - `currency` muss bei Prozentwerten `"%"` sein.
   - `year` soll sich auf ein **abgeschlossenes Jahr** (idealerweise 2022–2024) beziehen.
   - `url`, `snippet`, `year` müssen vorhanden sein, sonst entferne den Wert oder den ganzen Wettbewerber.

4. **Gesamtstruktur**:
   - Das finale `CompetitorLandscape`-Objekt darf **maximal 4 gültige Wettbewerber** enthalten.
   - Falls am Ende nur 2–3 valide übrig bleiben → akzeptabel.
   - Falls **keine** gültigen Wettbewerber vorhanden sind → gib ein leeres Array und einen passenden Kommentar zurück.

📌 Formatregeln:
- `value`: Nur numerische Zeichen als String (z. B. `"8.5"`)
- `currency`: `"%"` bei Marktanteilen und Wachstumsraten
- `is_estimated = true`, wenn der Wert geschätzt wurde

📝 Kommentar:
- Passe den bestehenden `comment` ggf. leicht an, wenn ein Wettbewerber entfernt wurde oder neue Insights aus den Schätzungen entstehen.
- Behalte den Stil bei: sachlich, strategisch, VC-/PE-kompatibel.

"""

competitor_landscape_evaluator_agent = Agent(
    name="Competitor Landscape Evaluator Agent",
    model="gpt-4o-mini",
    instructions=competitor_landscape_evaluator_instructions,
    output_type=CompetitorLandscape,
    model_settings=ModelSettings(temperature=0.3, max_tokens=2000),
)

competitor_landscape_evaluator_tool = competitor_landscape_evaluator_agent.as_tool(
    tool_name="competitor_landscape_evaluator_agent",
    tool_description=(
        "Überprüft ein CompetitorLandscape-Objekt auf Plausibilität, Branchentreue und Vollständigkeit. "
        "Korrigiert fehlende oder ungültige Werte (z. B. '0') durch realistische Schätzungen und entfernt "
        "Wettbewerber, die thematisch nicht zur Zielbranche passen. Ziel ist eine bereinigte, investorenrelevante "
        "Wettbewerbsanalyse mit maximal vier relevanten Competitor-Einträgen."
    ),
)
