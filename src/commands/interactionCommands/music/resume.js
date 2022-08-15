const Command = require("../../../structures/command");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

class Resume extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resume the current music."),
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

    if (!player) return i.reply("There is no music playing right now");

    if (!player.isPaused) {
      i.reply("The music is already resumed.");
      return;
    }

    player.pause(!player.isPaused);

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setDescription(`Music has been \`Resume\``);

    i.reply({ embeds: [embed] });
  }
}

module.exports = Resume;