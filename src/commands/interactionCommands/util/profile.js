const Command = require("../../../structures/command");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const moment = require("moment");

class Profile extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("Show your profile"),
      category: "Util",
    });
  }

  async run(i) {
    const db = await this.client.db.getAndNull("premium", {
      userId: i.member.user.id,
    });

    const lastplay = await this.client.db.getAndNull("lastplay", {
      userId: i.member.user.id,
    });

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle(`${i.member.user.tag}'s Profile`)
      .setThumbnail(i.member.user.displayAvatarURL({ dynamic: true }));

    if (!db)
      return i.reply(
        "You have no profile, vote me first to register your profile."
      );

    const last = db.premiumExp + db.premiumStamp;
    const ended = last - Date.now();
    let time = moment(ended).format("HH:MM:SS");
    if (ended < 0) time = "Emded";

    embed.addFields([
      {
        name: "<a:dia:1010581270906032219> Premium",
        value: [`Premium Stamp: ${time}`].join("\n"),
      },
      {
        name: "<:upv:1010581589786361986> Vote",
        value: [
          `Vote Count: ${db.voteCount}`,
          `Last Vote: <t:${(last / 1000).toFixed(0)}:R>`,
        ].join("\n"),
      },
      {
        name: "<a:headphone:1010593622799949824> Last Play Song",
        value: lastplay.lastPlayed
          .map((x) => `[${x.title}](${x.link})`)
          .join("\n"),
      },
      {
        name: "<a:dancemusic:1010596974405369858> Music Settings",
        value: [`Default Volume: ${lastplay.volume}`].join("\n"),
      },
    ]);

    i.reply({ embeds: [embed] });
  }
}

module.exports = Profile;