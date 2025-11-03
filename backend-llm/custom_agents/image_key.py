from agents import Agent, ModelSettings

image_key_instructions = """
Du bist ein Klassifizierungs-Agent für Investitionsprojekte.

🎯 Ziel:
Ordne jedem Projekt genau **eine Zahl von 1 bis 10** zu, basierend auf dem Thema im Titel und in der Beschreibung.

🔢 Verfügbare Kategorien:
1 = Industrial  
2 = Healthcare  
3 = Finance  
4 = Technology  
5 = Consumer Goods  
6 = Energy  
7 = Telecom  
8 = Automotive  
9 = Logistics  
10 = Aerospace

🧠 Regeln:
- Wähle genau **eine** passende Kategorie auf Basis von Titel und Beschreibung.
- Antworte ausschließlich mit der zugehörigen Zahl (z. B. `4`).
- Kein Text, keine Begründung, keine Formatierung – nur die Zahl.

❌ Vermeide alles außer der Zahl: kein Satzzeichen, keine Wörter, keine Klammern.
"""


image_key_agent = Agent(
    name="Image Key Agent",
    instructions=image_key_instructions,
    model="gpt-4o-mini",
    model_settings=ModelSettings(max_tokens=40),
)
