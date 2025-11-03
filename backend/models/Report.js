const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new mongoose.Schema({
    deal: {
        type: Schema.Types.ObjectId,
        ref: "Deal",
        required: true
    },
    company_overview: {
        type: Object,
        required: false
    },
    financials: {
        type: Object,
        required: false
    },
    market_size: {
        type: Object,
        required: false
    },
    market_growth: {
        type: Object,
        required: false
    },
    competitor_landscape: {
        type: Object,
        required: false
    },
    risks: {
        type: Object,
        required: false
    },
    management_team: {
        type: Object,
        required: false
    },
    executive_summary: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Report", reportSchema);