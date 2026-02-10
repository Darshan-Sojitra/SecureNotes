const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            maxlength: 500
        },

        password: {
            type: String,
            required: true
        },

        aiSummary: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true // adds createdAt & updatedAt automatically
    }
);

module.exports = mongoose.model("Note", noteSchema);
