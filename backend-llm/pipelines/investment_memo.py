import asyncio
import json
import logging

from agents import Runner, trace
from custom_agents.company_overview import company_overview_agent
from custom_agents.competitor_landscape import competitor_landscape_agent
from custom_agents.executive_summary import executive_summary_agent
from custom_agents.financials import financials_agent
from custom_agents.management_team import management_team_agent
from custom_agents.market_growth import market_growth_agent
from custom_agents.market_size import market_size_agent
from custom_agents.risks import risk_agent

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def investment_memo(messages):
    with trace("Investment Memo"):
        logger.info("Starte Investment Memo...")

        # ▓▓ Phase 1 – zuerst weniger aufwändige Agenten (ohne viele Tool-Calls)
        logger.info("Führe Phase 1 aus...")
        overview_result, financials_result, market_size_result = await asyncio.gather(
            Runner.run(company_overview_agent, messages, max_turns=6),
            Runner.run(financials_agent, messages, max_turns=6),
            Runner.run(market_size_agent, messages, max_turns=6),
        )

        # ▓▓ Phase 2 – komplexere Agenten nacheinander (weniger gleichzeitige Tools)
        logger.info("Führe Phase 2 aus...")
        market_growth_result = await Runner.run(
            market_growth_agent, messages, max_turns=6
        )
        competitor_landscape_result = await Runner.run(
            competitor_landscape_agent, messages, max_turns=8
        )
        risk_result = await Runner.run(risk_agent, messages, max_turns=6)
        management_team_result = await Runner.run(
            management_team_agent, messages, max_turns=6
        )

        combined_output = {
            "company_overview": overview_result.final_output,
            "financials": financials_result.final_output,
            "market_size": market_size_result.final_output,
            "market_growth": market_growth_result.final_output,
            "competitor_landscape": competitor_landscape_result.final_output,
            "risks": risk_result.final_output,
            "management_team": management_team_result.final_output,
        }

        logger.info("Rufe Executive Summary Agent auf...")
        executive_context = {
            "role": "user",
            "content": json.dumps(
                {k: v.model_dump() for k, v in combined_output.items()}, indent=2
            ),
        }

        summary_result = await Runner.run(executive_summary_agent, [executive_context])

        final_output = {
            **combined_output,
            "executive_summary": summary_result.final_output,
        }

        logger.info("Investment Memo erfolgreich erstellt.")
        return final_output
