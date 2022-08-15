const Command = require("../../../structures/command");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

class Loop extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("Looping Queue or Track")
        .addSubcommand((sub) =>
          sub.setName("track").setDescription("Looping current track.")
        )
        .addSubcommand((sub) =>
          sub.setName("queue").setDescription("Looping the entier queue.")
        ),
      inVoice: true,
      category: "Music",
    });
  }

  async run(i) {
    const memberVoice = i.member.voice.channelId;

    if (this.inVoice && !memberVoice) {
      i.editReply({
        content: "You must be in voice channel before running this command.",
      });
    }

    const sub = i.options.getSubcommand();

    const player = this.client.music.poru.players.get(i.guild.id);

    if (!player) return i.editReply("There is no music play on this server.");

    switch (sub) {
      case "track": {
        if (!player.trackRepeat) player.TrackRepeat(!player.trackRepeat);
        else player.DisableRepeat();

        const embed = new EmbedBuilder()
          .setColor("Red")
          .setDescription(
            `Track repeat has been ${player.trackRepeat ? "Enable" : "Disable"}`
          );

        i.reply({ embeds: [embed] });
        break;
      }

      case "queue": {
        if (!player.queueRepeat) player.QueueRepeat(!player.queueRepeat);
        else player.DisableRepeat();

        const embed = new EmbedBuilder()
          .setColor("Red")
          .setDescription(
            `Track repeat has been ${player.queueRepeat ? "Enable" : "Disable"}`
          );

        i.reply({ embeds: [embed] });
        break;
      }
    }
  }
}

module.exports = Loop;