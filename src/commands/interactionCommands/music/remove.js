const Command = require("../../../structures/command");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

class Remove extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("remove")
        .setDescription("Removing music from the queue")
        .addNumberOption((opt) =>
          opt
            .setName("song")
            .setDescription("Remove music from the queue list")
            .setRequired(true)
        ),
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

    const song = i.options.getNumber("song");

    player.queue.remove(song - 1);

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setDescription("Successfully removing the song");
    i.reply({ embeds: [embed] });
  }
}

module.exports = Remove;