from agents import Agent, ModelSettings, WebSearchTool
from models.investment_memo import CompanyOverview
from models.research_result import ResearchResult

estimator_instructions = """
Du bist ein Estimator-Agent. Deine Aufgabe ist es, ein `ResearchResult`-Objekt zu prüfen und zu ergänzen, wenn `origin_value` fehlt, "0" ist oder die Einheit (`origin_currency`) nicht passt.

---

### Ziel:
- Gib einen realistischen Prozentwert oder Währungswert zurück – entweder durch **Extraktion** oder **Schätzung**.
- Das Feld `origin_value` darf **niemals "0" sein**, wenn `is_estimated = true`.

---

### Vorgehen:

1. **Wert direkt erkennbar?**
   - Prüfe `snippet`, `title` und `url`.
   - Wenn dort ein konkreter Wert (z. B. „8.4%“, „14.8 billion EUR“) genannt ist:
     - Extrahiere `origin_value` (ohne Einheiten)
     - Setze passende `origin_currency`
     - Setze `is_estimated = false`

2. **Kein direkter Wert, aber Kontext erlaubt Schätzung?**
   - Nutze Formulierungen wie:
     - „Decline of 21% in Q1“ → Wachstumsrate negativ schätzbar (z. B. "-5")
     - „Top 5 share 35–40% collectively“ → gleichmäßig aufteilen
     - Umsatz + Marktgröße → rechnerisch Marktanteil ableiten
   - Dann:
     - Trage plausiblen Wert ein (z. B. `"7.2"`)
     - Setze `is_estimated = true`
     - Ergänze einen Kommentar im Feld `estimator_comment` (z. B. "Decline of 21% → estimated CAGR of -5")

3. **Keine Schätzung möglich?**
   - Dann muss `origin_value = "0"` bleiben
   - `is_estimated = false`
   - `estimator_comment`: „No sufficient context for estimation“

---

- Du darfst in Feldern wie `market_growth_rate` **niemals Währungswerte oder absolute Zahlen** eintragen (z. B. Umsatz in USD).
- Wenn die Quelle nur Umsatz enthält, aber keine Rate: 
  - Belasse `origin_value = "0"`, `origin_currency = "%"`, `is_estimated = false`
  - Setze im `estimator_comment`, dass nur Umsatzdaten verfügbar waren.

### Rückgabe:
- Immer ein vollständiges `ResearchResult` mit:
  - `origin_value` ≠ "0", wenn `is_estimated = true`
  - Korrekter `origin_currency`
  - Aussagekräftigem `estimator_comment`, wenn geschätzt

---
"""

estimator_agent = Agent(
    name="Competitors Agent",
    instructions=estimator_instructions,
    output_type=ResearchResult,
    model_settings=ModelSettings(max_tokens=2000),
)

estimator_tool = estimator_agent.as_tool(
    tool_name="estimator_agent",
    tool_description="Schätzt fehlende Marktanteile oder Wachstumsraten in einem CompetitorLandscape-Objekt, wenn origin_value == '0'. Nutzt bestehende Informationen wie Snippets, Titel oder URLs zur fundierten Ergänzung. Setzt is_estimated = true bei jeder vorgenommenen Schätzung.",
)
