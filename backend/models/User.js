const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    portfolio: [
        {
            company: String,
            capital: Number,
            stake: Number
        }
    ],
    company: String,
    position: String,
    industries: [],
    employees: String,
    slogan: String,
    description: String,
    location: String,
    website: String,
    logo: String,
    pitchdeck: String,
    published: {
        type: Boolean,
        default: false
    },
    accountType: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
