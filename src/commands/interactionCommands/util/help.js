const Command = require("../../../structures/command");
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

class Help extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Showing command list."),
      category: "Util",
    });
  }

  async run(i) {
    let category = new Set([
      ...Object.values(this.client.interactionCommand).map((x) => x.category),
    ]);

    const inviteButton = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel("Invite Me!")
      .setEmoji("936926209147809802")
      .setURL(
        `https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=8&scope=bot%20applications.commands`
      );

    const githubSponsor = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel("GitHub Sponsors!")
      .setEmoji("918318537532137532")
      .setURL(`https://github.com/sponsors/ameliakiara`);

    const patreonButton = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel("Patreon!")
      .setEmoji("918318805074210836")
      .setURL(`https://patreon.com/ameliakiara`);

    const vote = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel("Vote Me!")
      .setEmoji("778416296630157333")
      .setURL(`https://top.gg/bot/477762276389027840/vote`);

    const row = new ActionRowBuilder().addComponents([
      inviteButton,
      githubSponsor,
      patreonButton,
      vote,
    ]);

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle(`${this.client.user.username}'s Help info`)
      .setThumbnail(this.client.user.displayAvatarURL())
      .setFooter({
        text: `© 2022-2023 | Yukkuri Studio`,
        iconURL:
          "https://images-ext-1.discordapp.net/external/6-DUGdTG7Tvuzl1IgYIGI5X7dwMKPntbhUoejnWp2yE/%3Fsize%3D4096/https/cdn.discordapp.com/icons/993681829796266018/5d931a06b7380a0eaea1474fe6663700.png",
      });
    for (const c of category) {
      let cmd = Object.values(this.client.interactionCommand);
      cmd = cmd.filter((x) => x.category === c);
      embed.addFields([
        {
          name: c,
          value: cmd.map((x) => x.component.name).join(", "),
        },
      ]);
    }

    i.reply({ embeds: [embed], components: [row] });
  }
}

module.exports = Help;