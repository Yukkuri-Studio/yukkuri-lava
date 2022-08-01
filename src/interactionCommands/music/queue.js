const Command = require("../../structures/command");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const ms = require("ms");

class Queue extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Show music list"),
    });
  }

  async run(i) {
    const player = this.client.music.poru.players.get(i.guild.id);

    if (!player)
      return await i
        .reply("Queue is empty")
        .then(() => setTimeout(() => i.deleteReply(), 5000));

    const queue =
      player.queue.length > 9 ? player.queue.slice(0, 9) : player.queue;

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("Now Playing")
      .setThumbnail(player.currentTrack.info.image)
      .setDescription(
        `[${player.currentTrack.info.title}](${
          player.currentTrack.info.uri
        }) [${ms(player.currentTrack.info.length)}]`
      )
      .setFooter({ text: `Queue length: ${player.queue.length} tracks` });

    if (queue.length)
      embed.addFields([
        {
          name: "Up Next",
          value: queue
            .map(
              (track, index) =>
                `**${index + 1}.** [${track.info.title}](${track.info.uri})`
            )
            .join("\n"),
        },
      ]);

    i.reply({ embeds: [embed] });
  }
}

module.exports = Queue;
