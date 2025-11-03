import json
import logging

from agents import Runner, trace
from custom_agents.image_key import image_key_agent

logger = logging.getLogger(__name__)


async def image_key(messages):
    with trace("Image Key Agent"):
        result = await Runner.run(image_key_agent, messages)

        return result.final_output
