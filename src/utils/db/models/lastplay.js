const { Schema, model } = require("mongoose");

const Lastplay = new Schema({
  userId: { type: String, required: true },
  volume: { type: Number, default: 100 },
  lastPlayed: { type: Array, default: [] },
});

module.exports = model("lastplay", Lastplay);