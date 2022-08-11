const Command = require("../../structures/command");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

class Ping extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Check bot ping"),
      category: "Util",
    });
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

module.exports = Ping;