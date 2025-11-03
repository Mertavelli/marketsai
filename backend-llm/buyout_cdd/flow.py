import asyncio
import json
import os

from crewai import LLM
from crewai.agent import Agent
from crewai.flow.flow import Flow, listen, start
from crewai_tools import SerperDevTool

from .crews.company_profile.company_profile import CompanyProfileCrew
from .crews.executive_summary.executive_summary import ExecutiveSummaryCrew
from .crews.growth_opportunities.growth_opportunities import GrowthOpportunitiesCrew
from .crews.investment_case.investment_case import InvestmentCaseCrew
from .crews.key_drivers.key_drivers import KeyDriversCrew
from .crews.market_development.market_development import MarketDevelopmentCrew
from .crews.market_entry.market_entry import MarketEntryCrew
from .crews.market_trends.market_trends import MarketTrendsCrew
from .crews.product_portfolio.product_portfolio import ProductPortfolioCrew
from .models.models import CDDState


class CDDFlow(Flow[CDDState]):
    """Flow for creating a comprehensive Commercial Due Diligence of a company"""

    def __init__(self):
        super().__init__()

    async def kickoff_async(self, inputs=None):
        if inputs:
            for key, value in inputs.items():
                if hasattr(self.state, key):
                    setattr(self.state, key, value)

        return await super().kickoff_async()

    @start()
    async def get_company_profile(self):
        """Empfange die User Nachricht und erstelle ein strukturiertes Unternehmensprofil"""

        # Optional: Zugriff über self.state.messages, falls du später noch damit arbeitest
        message_list = self.state.messages
        if not message_list:
            raise ValueError("No messages provided")

        # In ein lesbares Format umwandeln
        messages_as_string = "\n".join(
            f"{msg['role'].capitalize()}: {msg['content']}" for msg in message_list
        )

        inputs = {"messages": messages_as_string}

        result = CompanyProfileCrew().crew().kickoff(inputs=inputs)

        company_profile = result.pydantic.model_dump()

        os.makedirs("output", exist_ok=True)

        with open("output/company_profile.json", "w", encoding="utf-8") as f:
            json.dump(company_profile, f, indent=2, ensure_ascii=False)

        self.state.company_profile = result.pydantic

        return {"company profile": company_profile}

    @listen(get_company_profile)
    async def get_investment_case(self):
        """Erstelle den Investment Case"""

        inputs = {
            "target_name": self.state.company_profile.company_name_presentation,
            "buyer_name": "AUCTUS",
            "industry": self.state.company_profile.industry,
            "headquarters_country": self.state.company_profile.operating_countries[0],
        }

        result = InvestmentCaseCrew().crew().kickoff(inputs=inputs)
        investment_case = result.pydantic.model_dump()

        os.makedirs("output", exist_ok=True)

        with open("output/investment_case.json", "w", encoding="utf-8") as f:
            json.dump(investment_case, f, indent=2, ensure_ascii=False)

        self.state.investment_case = result.pydantic
        return {"investment_case": investment_case}

    @listen(get_investment_case)
    async def get_market_development(self):
        """Erstelle die Marktentwicklung"""

        inputs = {
            "industry": self.state.company_profile.industry,
            "country_primary": self.state.company_profile.operating_countries[0],
            "country_secondary": self.state.company_profile.operating_countries[1],
        }

        result = MarketDevelopmentCrew().crew().kickoff(inputs=inputs)
        market_development = result.pydantic.model_dump()

        os.makedirs("output", exist_ok=True)

        with open("output/market_development.json", "w", encoding="utf-8") as f:
            json.dump(market_development, f, indent=2, ensure_ascii=False)

        self.state.market_development = result.pydantic
        return {"market_development": market_development}

    @listen(get_market_development)
    async def get_market_trends(self):
        """Erstelle die Markttrends"""

        inputs = {
            "industry": self.state.company_profile.industry,
            "country_primary": self.state.company_profile.operating_countries[0],
        }

        result = MarketTrendsCrew().crew().kickoff(inputs=inputs)
        market_trends = result.pydantic.model_dump()

        os.makedirs("output", exist_ok=True)

        with open("output/market_trends.json", "w", encoding="utf-8") as f:
            json.dump(market_trends, f, indent=2, ensure_ascii=False)

        self.state.market_trends = result.pydantic
        return {"investment_case": market_trends}

    @listen(get_market_trends)
    async def get_product_portfolio(self):
        """Erstelle die Product Portfolio"""

        inputs = {
            "company_name": self.state.company_profile.company_name,
        }

        result = ProductPortfolioCrew().crew().kickoff(inputs=inputs)
        product_portfolio = result.pydantic.model_dump()

        os.makedirs("output", exist_ok=True)

        with open("output/product_portfolio.json", "w", encoding="utf-8") as f:
            json.dump(product_portfolio, f, indent=2, ensure_ascii=False)

        self.state.product_portfolio = result.pydantic
        return {"product_portfolio": product_portfolio}

    @listen(get_product_portfolio)
    async def get_key_drivers(self):
        """Erstelle die Key Drivers"""

        inputs = {
            "company_name": self.state.company_profile.company_name_presentation,
        }

        result = KeyDriversCrew().crew().kickoff(inputs=inputs)
        key_drivers = result.pydantic.model_dump()

        os.makedirs("output", exist_ok=True)

        with open("output/key_drivers.json", "w", encoding="utf-8") as f:
            json.dump(key_drivers, f, indent=2, ensure_ascii=False)

        self.state.key_drivers = result.pydantic
        return {"key_drivers": key_drivers}

    @listen(get_key_drivers)
    async def get_growth_opportunities(self):
        """Erstelle die Growth Opportunities"""

        inputs = {
            "company_name": self.state.company_profile.company_name,
            "country": self.state.company_profile.operating_countries[0],
        }

        result = GrowthOpportunitiesCrew().crew().kickoff(inputs=inputs)
        growth_opportunities = result.pydantic.model_dump()

        os.makedirs("output", exist_ok=True)

        with open("output/growth_opportunities.json", "w", encoding="utf-8") as f:
            json.dump(growth_opportunities, f, indent=2, ensure_ascii=False)

        self.state.growth_opportunities = result.pydantic
        return {"growth_opportunities": growth_opportunities}

    @listen(get_growth_opportunities)
    async def get_market_entry(self):
        """Erstelle die Market Entry"""

        inputs = {
            "industry": self.state.company_profile.industry,
            "company_name": self.state.company_profile.company_name_presentation,
        }

        result = MarketEntryCrew().crew().kickoff(inputs=inputs)
        market_entry = result.pydantic.model_dump()

        os.makedirs("output", exist_ok=True)

        with open("output/market_entry.json", "w", encoding="utf-8") as f:
            json.dump(market_entry, f, indent=2, ensure_ascii=False)

        self.state.market_entry = result.pydantic
        return {"growth_opportunities": market_entry}

    @listen(get_market_entry)
    async def get_executive_summary(self):
        """Erstelle die Executive Summary"""

        inputs = {
            "analysis": self.state.model_dump_json(
                indent=2, exclude={"executive_summary"}
            )
        }

        result = ExecutiveSummaryCrew().crew().kickoff(inputs=inputs)
        executive_summary = result.pydantic.model_dump()

        os.makedirs("output", exist_ok=True)

        with open("output/executive_summary.json", "w", encoding="utf-8") as f:
            json.dump(executive_summary, f, indent=2, ensure_ascii=False)

        self.state.executive_summary = result.pydantic
        return {"executive_summary": executive_summary}

    @listen(get_executive_summary)
    async def get_state(self):

        with open("output/cddState.json", "w", encoding="utf-8") as f:
            json.dump(self.state.model_dump(), f, indent=2, ensure_ascii=False)

        return self.state
