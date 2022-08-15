const Command = require("../../../structures/command");
const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  EmbedBuilder
} = require("discord.js");

class PingContext extends Command {
  constructor(client) {
    super(client, {
      component: new ContextMenuCommandBuilder()
      .setName("ping")
      .setType(ApplicationCommandType.Message)
    })
  }
  
  async run(i) {
    const ws = Date.now() - i.createdTimestamp;
    const embed = new EmbedBuilder()
      .setColor("Red")
      .setDescription(
        [
          `**API Latency**: ${Math.round(this.client.ws.ping)}ms`,
          `**Latency**: ${ws}ms`,
        ].join("\n")
      );

    i.reply({ embeds: [embed] });
  }
}

module.exports = PingContext