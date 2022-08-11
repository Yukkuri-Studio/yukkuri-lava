const { Schema, model } = require("mongoose");

const Premium = new Schema({
  userId: { type: String, required: true },
  voteCount: { type: Number, default: 0 },
  premiumStatus: { type: Boolean, default: false },
  premiumStamp: { type: Number, default: 0 },
  premiumExp: { type: Number, default: Date.now() }
});

module.exports = model("premium", Premium);