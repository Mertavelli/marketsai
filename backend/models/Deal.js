const mongoose = require("mongoose");
const { Schema } = mongoose;

const memberSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "editor", "viewer"],
        default: "viewer"
    }
}, { _id: false }); // keine eigene _id für jedes Mitglied

const dealSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: false,
            trim: true
        },
        imageKey: {
            type: Number,
            min: 1,
            max: 10,
            required: false
        },
        created_by: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        members: [memberSchema]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Deal", dealSchema);
