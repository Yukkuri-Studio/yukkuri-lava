const Command = require("../../structures/command");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

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

    if (!player) {
      await i.deferReply();

      i.editReply("No queue");
      return;
    }

    console.log(player.queue);
    i.reply("Queue");
  }
}

module.exports = Queue;
