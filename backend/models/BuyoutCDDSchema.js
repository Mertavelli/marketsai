const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    role: { type: String, required: true },
    content: { type: String, required: true },
}, { _id: false });

const TakeawaySchema = new mongoose.Schema({
    takeaway: String,
    supporting_arguments: [String],
}, { _id: false });

const ExecutiveSummarySchema = new mongoose.Schema({
    key_takeaways: [TakeawaySchema],
    final_recommendation: String,
}, { _id: false });

const CompanyProfileSchema = new mongoose.Schema({
    company_name: String,
    company_name_presentation: String,
    industry: String,
    website: String,
    headquarters_location: String,
    operating_countries: [String],
}, { _id: false });

const InvestmentCaseSchema = new mongoose.Schema({
    summary: String,
    strengths: [String],
    opportunities: [String],
}, { _id: false });

const MarketDataSchema = new mongoose.Schema({
    year: Number,
    value: Number,
}, { _id: false });

const MarketSchema = new mongoose.Schema({
    title: String,
    market: String,
    country: String,
    unit: String,
    data: [MarketDataSchema],
    source: String,
    source_name: String,
}, { _id: false });

const MarketDevelopmentSchema = new mongoose.Schema({
    title: String,
    markets: [MarketSchema],
}, { _id: false });

const TrendSchema = new mongoose.Schema({
    type: String,
    description: String,
    growth_direction: String,
}, { _id: false });

const MarketTrendsSchema = new mongoose.Schema({
    market: String,
    country: String,
    trends: [TrendSchema],
    source: String,
    source_name: String,
}, { _id: false });

const PillarSchema = new mongoose.Schema({
    name: String,
    products: [String],
    price_strategy: [String],
}, { _id: false });

const ProductPortfolioSchema = new mongoose.Schema({
    title: String,
    value_proposition: String,
    pillars: [PillarSchema],
    source: String,
    source_name: String,
}, { _id: false });

const DriverSchema = new mongoose.Schema({
    type: String,
    description: [String],
    source_url: String,
}, { _id: false });

const KeyDriversSchema = new mongoose.Schema({
    summary: String,
    drivers: [DriverSchema],
}, { _id: false });

const GrowthOpportunitiesSchema = new mongoose.Schema({
    country: String,
    new_organic: Boolean,
    new_acquisition: Boolean,
    existing_organic: Boolean,
    existing_acquisition: Boolean,
    source_url: String,
}, { _id: false });

const MarketEntryCountrySchema = new mongoose.Schema({
    country: String,
    attractiveness: Number,
    ease_of_entry: Number,
    focus: String,
}, { _id: false });

const MarketEntrySchema = new mongoose.Schema({
    title: String,
    evaluated_markets: [MarketEntryCountrySchema],
    future_markets_comment: String,
}, { _id: false });

const BuyoutCDDSchema = new mongoose.Schema({
    id: { type: String, required: true },
    messages: [MessageSchema],
    executive_summary: ExecutiveSummarySchema,
    company_profile: CompanyProfileSchema,
    investment_case: InvestmentCaseSchema,
    market_development: MarketDevelopmentSchema,
    market_trends: MarketTrendsSchema,
    product_portfolio: ProductPortfolioSchema,
    key_drivers: KeyDriversSchema,
    growth_opportunities: GrowthOpportunitiesSchema,
    market_entry: MarketEntrySchema,
});

module.exports = mongoose.model('BuyoutCDD', BuyoutCDDSchema);
