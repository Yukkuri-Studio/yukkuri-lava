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
    if (!player.is247) player.destroy();
  }
}

module.exports = Queue;