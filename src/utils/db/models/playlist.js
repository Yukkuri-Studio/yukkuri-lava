const { Schema, model } = require("mongoose");

const Playlist = new Schema({
    userId: { type: String, required: true },
    playlist: { type: Array, default: [] }
});

module.exports = model("playlist", Playlist);