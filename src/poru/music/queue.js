const Poru = require("../../structures/poru");
const { EmbedBuilder } = require("discord.js");

class Queue extends Poru {
  constructor(client) {
    super(client, {
      name: "Poru Queue End",
      emiter: "queueEnd",
    });
  }

  async run(player, track, data) {
    let db = await this.client.db.getAndNull("lastplay", {
      userId: player.previousTrack.info.requester.user.id,
    });

    if (!db) {
      db = new this.client.db.models.lastplay({
        userId: player.previousTrack.info.requester.user.id,
      });
      db.save();
    }

    if (db.userId === player.previousTrack.info.requester.user.id) {
      if (db.lastPlayed.length >= 2) db.lastPlayed.splice(1, 1);
      db.lastPlayed.push({
        title: player.previousTrack.info.title,
        link: player.previousTrack.info.uri,
      });
      db.save();
    }
    if (!player.is247) player.destroy();
  }
}

module.exports = Queue;