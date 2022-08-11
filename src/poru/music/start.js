const Poru = require("../../structures/poru");
const { EmbedBuilder } = require("discord.js");

class Start extends Poru {
  constructor(client) {
    super(client, {
      name: "Poru Track Start",
      emiter: "trackStart",
    });
  }

  async run(player, track, payload) {
    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle(`Start playing ${track.info.title}`)
      .setURL(track.info.uri)
      .setThumbnail(track.info.image);

    const channel = this.client.channels.cache.get(player.textChannel);
    channel.send({ embeds: [embed] });
  }
}

module.exports = Start;