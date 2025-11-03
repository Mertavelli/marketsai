import json

from agents import Runner, trace
from custom_agents.clarification import get_clarification_agent


def try_parse_json(text):
    """
    Versucht, den String als JSON zu parsen.
    Gibt bei Erfolg das dict zurück, sonst None.
    """
    try:
        result = json.loads(text)
        if isinstance(result, dict):
            return result
    except (json.JSONDecodeError, TypeError):
        pass
    return None


async def clarification(messages, page_slug):
    with trace("Clarification Agent"):

        agent = get_clarification_agent(page_slug)
        result = await Runner.run(agent, messages)

        agent_output = result.final_output
        user_message = str(agent_output)

        parsed_output = try_parse_json(agent_output)

        if parsed_output:
            user_message = parsed_output.get("message", agent_output)

        return {
            "message": user_message,
        }
