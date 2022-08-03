const Command = require("../../structures/command");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

class Skip extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skip the current song"),
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

    if (!player) return i.reply("There is no music play on this server.");

    player.stop();

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setDescription("Skipping current song");

    i.reply({ embeds: [embed] });
  }
}

module.exports = Skip;
