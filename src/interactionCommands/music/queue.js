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
    await i.deferReply();


    const player = this.client.music.poru.players.get(i.guild.id);

    if (!player) {
      i.editReply("No queue");

      return;
    } else {
      i.editReply(player.queue.map(x => `\`${x.info.title}\``)).join('\n');
    }
  }
}

module.exports = Queue;
