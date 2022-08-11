const { Schema, model } = require("mongoose");

const Premium = new Schema({
  userId: { type: String, required: true },
  voteCount: { type: Number, default: 0 },
  premiumStatus: { type: Boolean, default: false },
  premiumStamp: { type: Number },
});

module.exports = model("premium", Premium);