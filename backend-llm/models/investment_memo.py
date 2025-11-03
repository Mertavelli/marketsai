from typing import List, Optional

from pydantic import BaseModel

from .research_result import ResearchResult


class ListElement(BaseModel):
    value: str
    year: str


class CompanyOverview(BaseModel):
    name: str
    industry: str
    website: str
    headquarter: str


class Financials(BaseModel):
    revenue_last_year: ResearchResult
    profit_last_year: ResearchResult
    employees: ResearchResult


class MarketSize(BaseModel):
    target_region: str
    tam: ResearchResult
    sam: ResearchResult
    comment: str


class MarketGrowth(BaseModel):
    values: List[ListElement]
    currency: Optional[str]
    url: str
    snippet: str
    year: str
    is_estimated: bool
    comment: str


class Competitor(BaseModel):
    name: str
    type: str
    market_share: ResearchResult
    market_growth_rate: ResearchResult
    website: str


class CompetitorLandscape(BaseModel):
    competitors: List[Competitor]
    comment: str


class Risk(BaseModel):
    market: int
    competitive: int
    regulatory: int
    technology: int
    reputational: int
    comment: str


class Member(BaseModel):
    name: str
    position: str
    comment: str


class ManagementTeam(BaseModel):
    team: List[Member]
    comment: str


class InvestmentMemo(BaseModel):
    company_overview: CompanyOverview
    financials: Financials
    market_size: MarketSize
    market_growth: MarketGrowth
    competitor_landscape: CompetitorLandscape
    risks: Risk
    management_team: ManagementTeam
