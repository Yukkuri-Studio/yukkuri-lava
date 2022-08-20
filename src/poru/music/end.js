const Poru = require("../../structures/poru");

class End extends Poru {
  constructor(client) {
    super(client, {
      name: "Poru End Event",
      emiter: "trackEnd",
    });
  }

  async run(player, track, data) {
    const db = this.client.db.getAndNull("lastplay", {
      userId: player.previousTrack.requster.user.id,
    });

    if (!db) {
      db = new this.client.db.models.lastplay({
        userId: player.previousTrack.requster.user.id,
      });
      db.save();
    }

    if (db.userId === player.previousTrack.requster.user.id) {
      if (db.lastPlayed > 1) db.lastPlayed.splice(1, 1);
      db.lastPlayed.push({
        title: player.previousTrack.info.title,
        link: player.previousTrack.info.uri,
      });
      this.client.db.updateOne(
        "lastplay",
        { userId: db.userId },
        { $set: { lastPlayed: db.lastplayed } }
      );
    }
    if (player.isAutoplay === true) {
      player.setAutoplay(player.isAutoplay, track);
      if (!player.isPlaying && !player.isPaused) return player.play();
    }
  }
}

module.exports = End;