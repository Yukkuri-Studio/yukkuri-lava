const Command = require("../../../structures/command");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

class Forever extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("247")
        .setDescription("Set the bot to keep in the voice channel"),
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

    if (!player) {
      i.reply("There is no player connected yet.");
      return;
    }

    if (!player.is247) player.is247 = true;
    else player.is247 = false;

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setDescription(`24/7 has been ${player.is247 ? "Enable" : "Disable"}`);

    i.reply({ embeds: [embed] });
  }
}

module.exports = Forever;