import json
import logging

from agents import Runner, trace
from custom_agents.generate_text import generate_text_agent

logger = logging.getLogger(__name__)


async def generate_text(messages):
    with trace("Generate Text Agent"):
        result = await Runner.run(generate_text_agent, messages)

        return result.final_output
