const Command = require("../../../structures/command");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

class Pause extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pause or Resume the current music."),
      inVoice: true,
      category: "Music",
    });
  }

  async run(i) {
    const memberVoice = i.member.voice.channelId;

    if (this.inVoice && !memberVoice) {
      await i.reply(
        "You must be in voice channel before running this command."
      );
      return;
    }

    const player = this.client.music.poru.players.get(i.guild.id);

    if (!player) return i.reply("There is no music l playing right now");

    player.pause(!player.isPaused);

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setDescription(`Music has been ${player.isPaused ? "Pause" : "Resume"}`);

    i.reply({ embeds: [embed] });
  }
}

module.exports = Pause;