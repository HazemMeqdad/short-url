const mongoose = require("mongoose");

const shortSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url: { type: String, required: true },
    code: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    created: { type: Date, default: Date.now },
    lastClicked: { type: Date, default: Date.now },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

module.exports = mongoose.model("Short", shortSchema);
