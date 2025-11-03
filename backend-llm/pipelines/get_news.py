import json
import logging

from agents import Runner, trace
from custom_agents.get_news import get_news_agent

logger = logging.getLogger(__name__)


async def get_news(messages):
    with trace("Get News Agent"):
        result = await Runner.run(get_news_agent, messages)

        return result.final_output
