const Command = require("../../structures/command");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

class AutoPlay extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("autoplay")
        .setDescription("Autoplaying music"),
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

    const player = this.client.music.poru.players.get(i.guild.id);

    if (!player) return i.reply("There is no music playing right now.");

    await player.setAutoplay(!player.isAutoplay, player.currentTrack);

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setDescription(
        `Auto Play has been \`${player.isAutoplay ? "Enable" : "Disable"}\``
      );

    i.reply({ embeds: [embed] });
  }
}

module.exports = AutoPlay;