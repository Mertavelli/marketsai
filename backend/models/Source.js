const mongoose = require("mongoose");
const { Schema } = mongoose;

const sourceSchema = new mongoose.Schema({
    dealId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Source", sourceSchema);
