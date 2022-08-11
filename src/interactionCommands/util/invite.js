const Command = require("../../structures/command");
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

class Invite extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Invite me to your server"),
      category: "Util",
    });
  }

  async run(i) {
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

    const row = new ActionRowBuilder().addComponents([
      inviteButton,
      githubSponsor,
      patreonButton,
    ]);

    const embed = new EmbedBuilder()
      .setThumbnail(this.client.user.avatarURL())
      .setColor("Red")
      .setDescription(
        [
          "Hi! Im your discord music bot with a lot of features can you used.",
          "My creator [**Yukkuri - Studio**](https://github.com/Yukkuri-Studio) is working hard behind this all.",
          "\u200b",
          "If you want to invite me to your own server or your friends server, you can click the button bellow to invite me.",
          "Also you can support me by giving us a starts on [**My Repository**](https://github.com/Yukkuri-Studio/yukkuri-lava) or by donating us by clicking the button bellow.",
        ].join("\n")
      )
      .setFooter({
        text: "© Yukkuri - Studio",
        iconURL:
          "https://images-ext-1.discordapp.net/external/6-DUGdTG7Tvuzl1IgYIGI5X7dwMKPntbhUoejnWp2yE/%3Fsize%3D4096/https/cdn.discordapp.com/icons/993681829796266018/5d931a06b7380a0eaea1474fe6663700.png",
      });

    i.reply({ embeds: [embed], components: [row] });
  }
}

module.exports = Invite;