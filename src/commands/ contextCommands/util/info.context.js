const Command = require("../../../structures/command");
const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  version,
} = require("discord.js");

class InfoContext extends Command {
    constructor(client) {
        super(client, {
            component: new ContextMenuCommandBuilder()
            .setName("info")
            .setType(ApplicationCommandType.Message)
        })
    }
    
    async run(i) {
            const nodes = this.client.music.poru.nodes.get("yukkuri");
    const player = this.client.music.poru.players;

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
      vote
    ]);

    const cpu = await si.cpu();
    const mem = await si.mem();

    let users = 0;
    this.client.guilds.cache.forEach((g) => (users += g.memberCount));
    const info = new EmbedBuilder()
      .setColor("Red")
      .setTitle(`${this.client.user.username}'s Status`)
      .setThumbnail(this.client.user.avatarURL())
      .setDescription(
        "This discord music bot template has been made by **Yukkuri Studio - Community**. You can use this code by clicking link at bellow of this embed. Give us stars on our GitHub repository to keep us update this bot, or you can donate us from GitHub sponsors or our patreon in this repository or just click bellow."
      )
      .addFields([
        {
          name: "Client",
          value: [
            `\u200b Servers: ${this.client.guilds.cache.size}`,
            `\u200b Users: ${users}`,
            `\u200b Channels: ${this.client.channels.cache.size}`,
            `\u200b Discord.JS: ${version}`,
            `\u200b Uptime: ${moment(this.client.ws.uptime).format(
              "D [days], H [hrs], m [mins], s [secs]"
            )}`,
          ].join("\n"),
        },
        {
          name: "System",
          value: [
            "**CPU**",
            `\u200b Model: ${os.cpus()[0].model}`,
            `\u200b Cores: ${cpu.cores}`,
            `\u200b Speed: ${os.cpus()[0].speed} Mhz`,
            "**MEMORY**",
            `\u200b Total: ${this.formatByteSize(mem.total)}`,
            `\u200b Active: ${this.formatByteSize(mem.active)}`,
            `\u200b Free: ${this.formatByteSize(mem.free)}`,
            `\u200b Used: ${this.formatByteSize(mem.used)}`,
            `\u200b Available: ${this.formatByteSize(mem.available)}`,
          ].join("\n"),
        },
        {
          name: "Link",
          value:
            "[GitHub](https://github.com/Yukkuri-Studio/yukkuri-lava) | [GitHub Sponsors](https://github.com/sponsors/ameliakiara) | [Patreon](https://patreon.com/ameliakiara)",
        },
      ]);

    const lavalink = new EmbedBuilder()
      .setColor("Red")
      .setThumbnail(
        "https://camo.githubusercontent.com/09f6c6bdca8f8a56a48adf0fff0874786b464f17195a5fda752cedfe35dfe9da/68747470733a2f2f692e696d6775722e636f6d2f4f4737546e65382e706e67"
      )
      .setTitle("Lavalink")
      .addFields([
        {
          name: "Status",
          value: [
            "**Players**",
            `\u200b Playing on: ${player.size} servers`,
            "**Memory**",
            `\u200b Used: ${this.formatByteSize(nodes.stats.memory.used)}`,
            `\u200b Free: ${this.formatByteSize(nodes.stats.memory.free)}`,
            `\u200b Allocated: ${this.formatByteSize(
              nodes.stats.memory.allocated
            )}`,
            "**CPU**",
            `\u200b Cores: ${nodes.stats.cpu.cores}`,
            `\u200b Load: ${this.formatByteSize(
              nodes.stats.cpu.lavalinkLoad.toFixed(0)
            )}`,
            `\u200b Uptime: ${ms(nodes.stats.uptime)}`,
          ].join("\n"),
        },
      ]);
      
      i.reply({ embebs: [embed], ephemeral: true })
    }
}

module.exports = InfoContext;