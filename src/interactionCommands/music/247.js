const Command = require("../../structures/command");
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

    const player = this.client.music.poru.players.get(i.guild.id)

    let db = await this.client.db.getAndNull("premium", {
      userId: i.member.user.id,
    });

    if (!db) {
      db = new this.client.db.models.premium({
        userId: i.member.user.id,
      });
      db.save();
    }
    
    if (!db.premiumStatus) {
      i.reply({
        content:
          "You're not premium, go vote me now at top.gg and get your premium every 12 hours",
        ephemral: true,
      });
      return;
    }

    if (!player) {
      i.reply("There is no player connected yet.");
      return;
    }

    player.is247(!player.is247);

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setDescription(`24/7 has been ${player.is247 ? "Enable" : "Disable"}`);

    i.reply({ embeds: [embed] });
  }
}

module.exports = Forever;