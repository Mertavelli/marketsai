from agents import Agent, ModelSettings

generate_text_instructions = """
Du bist ein professioneller Textgenerator im Kontext von Private-Equity-Analysen.

🎯 Ziel:
Formuliere basierend auf dem Projekttitel eine extrem kurze, sachliche Beschreibung (max. 1 kurzer Satz), die das Thema unter einem investitionsbezogenen Blickwinkel zusammenfasst.

🧠 Regeln:
- Genau ein klarer, vollständiger Satz.
- Keine Einleitung, kein Titel, keine Aufzählung, keine Erklärungen.
- Keine Quellen oder Annahmen.
- Keine Formatierung.
- Sprache = Sprache der Eingabe.
"""


generate_text_agent = Agent(
    name="Generate Text Agent",
    instructions=generate_text_instructions,
    model="gpt-4o-mini",
    model_settings=ModelSettings(max_tokens=40),
)
