const Poru = require("../../structures/poru");
const { EmbedBuilder } = require("discord.js");

class End extends Poru {
  constructor(client) {
    super(client, {
      name: "Poru Queue End",
      emiter: "queueEnd",
    });
  }

  async run(player, track, data) {
    const embed = new EmbedBuilder()
      .setColor("Red")
      .setDescription("The queue has been ended");

    const channel = this.client.channels.cache.get(player.textChannel);

    channel.send({ embeds: [embed] });
  }
}

module.exports = End;
