const Command = require("../../structures/command");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

class Shuffle extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("Shuffle music on queue"),
      inVoice: true,
      category: "Music"
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

    if (!player) return i.reply("There is no music playing right now.");

    player.queue.shuffle();

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setDescription("Succesfully shuffle thqueue");

    i.reply({ embeds: [embed] });
  }
}

module.exports = Shuffle;
