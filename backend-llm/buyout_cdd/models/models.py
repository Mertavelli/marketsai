from typing import Annotated, Dict, List, Literal, Optional

from pydantic import BaseModel, Field, HttpUrl, conint


class CompanyProfile(BaseModel):
    company_name: str = Field(
        description="The full legal name of the company, including legal suffix (e.g., GmbH, AG, Ltd.)"
    )
    company_name_presentation: str = Field(
        description="The commonly used name of the company, without legal suffix or formal additions. Short and presentation-friendly."
    )
    industry: str = Field(description="The industry the company operates in")
    website: str = Field(description="The website of the company")
    headquarters_location: str = Field(
        description="The headquarters location of the company"
    )
    operating_countries: List[str] = Field(
        default_factory=list, description="List of countries where the company operates"
    )


class SourceEntry(BaseModel):
    source: str = Field(..., description="The name or title of the source")
    url: Optional[str] = Field(None, description="URL to the source if available")


class InvestmentCase(BaseModel):
    summary: str = Field(
        ..., description="One-sentence summary why this is an attractive acquisition"
    )
    strengths: List[str] = Field(
        ...,
        description="Bullet points summarizing target's current strengths, each prefixed by category (e.g. 'Performance: ...')",
    )
    opportunities: List[str] = Field(
        ...,
        description="Bullet points outlining post-buyout value creation levers, each prefixed by category (e.g. 'Vertical Integration: ...')",
    )


class YearlyStat(BaseModel):
    year: int = Field(..., description="Year of measurement")
    value: float = Field(..., description="Market volume in billions (or given unit)")


class MarketDevelopment(BaseModel):
    title: str = Field(
        ...,
        description="Short sentence on market trend, e.g., 'Germany shows steady growth in Health sector'.",
    )
    market: str = Field(
        ..., description="Name of the market, e.g., 'Electric mobility'"
    )
    country: str = Field(..., description="Name of the country, e.g., 'Germany'")
    unit: str = Field(..., description="Unit of measurement, e.g., 'bn EUR'")
    data: List[YearlyStat] = Field(
        ..., description="List of year-value pairs for market volume"
    )
    source: str = Field(..., description="Link to the main source of the data")
    source_name: str = Field(
        ..., description="Name of the source, e.g., 'Statista', 'McKinsey'"
    )


class MarketDevelopmentAll(BaseModel):
    title: str = Field(
        ...,
        description="Overall market development headline, e.g., 'Europe shows strong momentum in Health & Beauty'",
    )
    markets: List[MarketDevelopment] = Field(
        ..., description="List of market trends across multiple countries"
    )


class MarketTrend(BaseModel):
    type: str
    description: str
    growth_direction: Literal["up", "down", "neutral"]


class MarketTrends(BaseModel):
    market: str
    country: str
    trends: List[MarketTrend]
    source: str
    source_name: str


class Pillar(BaseModel):
    name: str = Field(
        ...,
        description="Name of the product pillar, e.g., 'Household', 'Pharmacy', 'Vitamins', 'Beauty'",
    )
    products: List[str] = Field(
        ..., description="List of product names under this pillar"
    )
    price_strategy: List[str] = Field(
        ..., description="List of pricing logic or strategy applied to this pillar"
    )


class ProductPortfolio(BaseModel):
    title: str = Field(
        ..., description="Short headline summarizing the product portfolio strategy"
    )
    value_proposition: str = Field(
        ..., description="Short core value proposition across the product portfolio"
    )
    pillars: List[Pillar] = Field(
        ...,
        description="List of strategic product pillars including products and pricing",
    )
    source: str = Field(
        ..., description="URL to the source used for product or strategy information"
    )
    source_name: str = Field(
        ...,
        description="Name of the source organization, e.g., 'Statista', 'Company Website'",
    )


class KeyDriver(BaseModel):
    type: str = Field(
        ...,
        description="Category of the driver, e.g., 'Location', 'Brand', 'Price', 'Service'",
    )
    description: List[str] = Field(
        ...,
        description="List with 2 entries for explanation of how this driver applies to the company",
    )
    source_url: str = Field(
        ...,
        description="Public URL supporting the statement (e.g., website, news article, report)",
    )


class KeyDrivers(BaseModel):
    summary: str = Field(
        ...,
        description="Short introduction, e.g., '[Target] relies on four main drivers to ensure high customer traffic'",
    )
    drivers: List[KeyDriver] = Field(
        ..., description="List of relevant drivers including description and source"
    )


class MarketGrowthOpportunity(BaseModel):
    country: str = Field(
        ..., description="Country where the company is currently active"
    )
    new_organic: bool = Field(
        ..., description="True if growth is expected organically in a new market"
    )
    new_acquisition: bool = Field(
        ...,
        description="True if growth is expected through acquisitions in a new market",
    )
    existing_organic: bool = Field(
        ..., description="True if growth is expected organically in an existing market"
    )
    existing_acquisition: bool = Field(
        ...,
        description="True if growth is expected through acquisitions in an existing market",
    )
    source_url: str = Field(
        ..., description="Public source supporting the growth opportunity"
    )


class MarketEvaluation(BaseModel):
    country: str = Field(..., description="Name of the country, e.g., 'Belgium'")
    attractiveness: Annotated[int, Field(ge=1, le=10)] = Field(
        ..., description="Market attractiveness from 1 (low) to 9 (high)"
    )
    ease_of_entry: Annotated[int, Field(ge=1, le=10)] = Field(
        ..., description="Ease of entry from 1 (difficult) to 9 (easy)"
    )
    focus: Literal["current", "future", "no_potential"] = Field(
        ..., description="Strategic focus for the company"
    )


class MarketEntryAssessment(BaseModel):
    title: str = Field(
        ...,
        description="A concise summary sentence for use as a slide headline, e.g., 'Northern European markets seem most promising for [Target]' – should reflect the main insight of the analysis.",
    )
    evaluated_markets: List[MarketEvaluation] = Field(
        ..., description="List of evaluated countries with reasoning"
    )
    future_markets_comment: str = Field(
        ...,
        description="Explanation of how future markets were selected. Should be based on criteria such as managerial resources, financial priorities, and strategic fit.",
    )


class ExecutiveSummaryItem(BaseModel):
    takeaway: str = Field(description="A key takeaway or conclusion")
    supporting_arguments: List[str] = Field(
        description="Supporting arguments for the takeaway"
    )


class ExecutiveSummary(BaseModel):
    key_takeaways: List[ExecutiveSummaryItem] = Field(
        description="List of key takeaways with supporting arguments",
    )
    final_recommendation: str = Field(
        description="A final conclusion or investment recommendation"
    )


class CDDState(BaseModel):
    messages: Optional[List[Dict[str, str]]] = None
    executive_summary: str = ""
    company_profile: Dict = {}
    investment_case: Optional[InvestmentCase] = None
    market_development: MarketDevelopmentAll = None
    market_trends: MarketTrends = None
    product_portfolio: ProductPortfolio = None
    key_drivers: KeyDrivers = None
    growth_opportunities: MarketGrowthOpportunity = None
    market_entry: MarketEntryAssessment = None
