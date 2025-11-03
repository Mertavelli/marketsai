import asyncio
from typing import List, Optional

from agents import Agent, ModelSettings, Runner, WebSearchTool, function_tool
from models.investment_memo import Competitor, CompetitorLandscape

from .competitor_landscape_evaluator import competitor_landscape_evaluator_tool
from .research import research_tool

competitor_instructions = """
Du bist ein Wettbewerbsanalyse-Agent. Deine Aufgabe ist es, ein bestimmtes Unternehmen strukturiert zu analysieren, damit es als Wettbewerberprofil in einem Investment Memo dargestellt werden kann.

▶️ Zielstruktur (Competitor-Objekt):
- `name`: Vollständiger rechtlicher Name des Unternehmens
- `type`: Kurzbeschreibung der Tätigkeit (z. B. "Power tool manufacturer")
- `market_share`: Marktanteil in Prozent – als `ResearchResult`
- `market_growth_rate`: Wachstumsrate des relevanten Zielmarkts – als `ResearchResult`
- `website`: Offizielle Website-URL

🔍 Tool-Nutzung:
- Verwende das Tool `research_agent` **jeweils genau einmal** für:
  - `market_share`
  - `market_growth_rate`
- Verwende es **nicht mehrfach**, kein Retry, keine Schleifen.

📌 Recherche-Regeln:
- Nutze nur Werte aus **abgeschlossenen Jahren** (z. B. 2022–2024).
- Forecasts („expected“, „projected“, „CAGR“, „by 203x“) **dürfen nicht** als `value` verwendet werden.
- Entferne Einheiten:
  - „12,4 %“ → `"12.4"`, `currency = "%"`, `value` als String

📉 Wenn kein exakter Wert gefunden wird:
- Lass das Feld **einfach leer** (also kein Eintrag oder `None` im finalen JSON),
- Gib **keine Schätzung** ab,
- `value` darf **nicht "0"** sein.

🌐 Website:
- Gib die offizielle Unternehmens-Website an – kein LinkedIn, kein Händler.

🎯 Ziel:
Ein einzelnes, valides `Competitor`-Objekt für das übergebene Unternehmen – mit maximal zwei ResearchResulten, geeignet für den Einsatz in Wettbewerbsanalysen (VC/PE).
"""

competitor_agent = Agent(
    name="Competitor Agent",
    model="gpt-4o-mini",
    instructions=competitor_instructions,
    tools=[research_tool],
    output_type=Competitor,
    model_settings=ModelSettings(
        tool_choice="required", temperature=0.3, max_tokens=500
    ),
)


@function_tool
async def run_competitor_analysis(queries: List[str]) -> List[Competitor]:
    """
    Führt parallele Wettbewerbsanalysen durch. Jeder Eintrag in `queries` sollte ein Wettbewerbername sein.
    Gibt eine Liste mit erfolgreichen Competitor-Objekten zurück.
    """

    async def safe_run(query: str):
        try:
            result = await Runner.run(
                competitor_agent, [{"role": "user", "content": query}], max_turns=6
            )
            return result.final_output
        except Exception:
            return None  # Ignoriere fehlgeschlagene Runs

    # Starte alle parallel
    results = await asyncio.gather(*[safe_run(q) for q in queries])

    # Filtere fehlgeschlagene Ergebnisse raus
    return [r for r in results if r is not None]


competitor_landscape_instructions = """
Du bist ein Wettbewerbslandschafts-Agent. Deine Aufgabe ist es, für ein gegebenes Unternehmen ca. 4 relevante Wettbewerber zu identifizieren und strukturiert als `CompetitorLandscape`-Objekt darzustellen.

▶️ Zielstruktur (`CompetitorLandscape`):
- `competitors`: Liste mit ca. 4 vollständigen `Competitor`-Objekten
- `comment`: Strategische Zusammenfassung der Wettbewerbssituation

🔧 Tool-Nutzung:
1. Verwende das Tool `run_competitor_analysis` **genau einmal**:
   - Übergebe eine Liste mit vier passenden Wettbewerbern (z. B. `["...", "...", "...", "..."]`).
   - Das Tool liefert bis zu vier `Competitor`-Objekte zurück.
   - **Führe diesen Aufruf nur einmal aus. Keine Wiederholung. Kein Retry. Keine Schleife.**

2. Verwende nach dem ersten Tool-Aufruf das Tool `competitor_landscape_evaluator_agent`, um:
   - ungültige oder branchenfremde Einträge zu entfernen,
   - fehlende Werte sinnvoll zu schätzen (`is_estimated = true`),
   - und das finale `CompetitorLandscape`-Objekt zu validieren.

📌 Anforderungen an die Wettbewerber:
- Müssen in derselben Branche oder einem angrenzenden Markt wie das Zielunternehmen aktiv sein.
- Internationale Marken oder regionale Marktführer bevorzugt.
- Keine Tochterunternehmen des Zielunternehmens.
- Keine Namensverwechslungen mit branchenfremden Unternehmen (z. B. nicht "Echo" von Amazon).
- Nur Unternehmen, die tatsächlich **direkte Marktteilnehmer** sind.

📉 Validität:
- Jeder `Competitor` muss `market_share` und `market_growth_rate` enthalten.
- `"value": "0"` ist nicht erlaubt – ggf. Schätzung mit `is_estimated = true`.
- Keine Duplikate.

📝 Kommentar (`comment`):
- Verfasse eine **strategische Wettbewerbsanalyse** in **ca. 5 Sätzen** (max. 6):
  - Beschreibe die Marktstruktur: Ist der Markt eher fragmentiert oder konzentriert? Gibt es dominante Player?
  - Ordne das Zielunternehmen strategisch ein: Marktführer, Herausforderer, Nischenanbieter?
  - Vergleiche die Wettbewerber anhand von Geschäftsmodellen, Technologiefokus oder regionaler Präsenz.
  - Identifiziere mögliche disruptive Trends, Marktdynamiken oder neue Wettbewerber.
  - Gib eine Einschätzung zur Intensität des Wettbewerbs und strategischen Relevanz für Investoren.

- Stil: faktenbasiert, professionell, analytisch – wie in VC-/PE-Investment-Memos üblich.


🎯 Ziel:
Ein valides, strategisch aussagekräftiges `CompetitorLandscape`-Objekt mit relevanten Wettbewerbern – **basierend auf genau einem Tool-Aufruf** zur Wettbewerberanalyse.
"""


competitor_landscape_agent = Agent(
    name="Competitor Landscape Agent",
    model="gpt-4o-mini",
    instructions=competitor_landscape_instructions,
    tools=[run_competitor_analysis, competitor_landscape_evaluator_tool],
    output_type=CompetitorLandscape,
    model_settings=ModelSettings(
        tool_choice="required", temperature=0.3, max_tokens=2000
    ),
)
