const Command = require("../../../structures/command");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

class DefaultVolume extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("defaultvolume")
        .setDescription("Setting your default volume music")
        .addNumberOption((opt) =>
          opt
            .setName("value")
            .setDescription("Insert the default volume between 1-100")
        ),
    });
  }

  async run(i) {
    let db = await this.client.db.getAndNull("lastplay", {
      userId: i.member.user.id,
    });

    if (!db) {
      db = new this.client.db.models.lastplay({
        userId: i.member.user.id,
      });
      db.save();
    }

    let opt = i.options.getNumber("value");

    if (opt >= 100) opt = 100;
    else if (opt <= 0) opt = 0;

    db.volume = opt;
    db.save();

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setDescription(
        `Successfully setting the default music volume to \`${db.volume}\`%`
      );

    i.reply({ embeds: [embed] });
  }
}

module.exports = DefaultVolume;