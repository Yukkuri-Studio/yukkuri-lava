const Command = require("../../structures/command");
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const ms = require("ms")

class Info extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
      .setName("info")
      .setDescription("Get information about the bot")
      .addStringOption((opt) => opt
      .setName("value")
      .setDescription("Choice between bot or lavalink")
      .addChoices(
          { name: "lavalink", value: "lavalink" },
          { name: "bot", value: "bot" }
      ))
    })
  }
  
  async run(i) {
    const opt = i.options.getString("value");
    
    const nodes = this.client.music.poru.nodes.get("yukkuri")
    const player = this.client.music.poru.players
    
    const inviteButton = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel("Invite Me!")
    .setEmoji("936926209147809802")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=8&scope=bot%20applications.commands`)
    
    const githubSponsor = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel("GitHub Sponsors!")
    .setEmoji("918318537532137532")
    .setURL(`https://github.com/sponsors/ameliakiara`)
    
    const patreonButton = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel("Patreon!")
    .setEmoji("918318805074210836")
    .setURL(`https://patreon.com/ameliakiara`)
    
    const row = new ActionRowBuilder().addComponents([ inviteButton, githubSponsor, patreonButton ]);
    
        const info = new EmbedBuilder()
    .setColor("Red")
    .setTitle(`${this.client.user.username}'s Status`)
    .setThumbnail(this.client.user.avatarURL())
    .setDescription("This discord music bot template has been made by **Yukkuri Studio - Community**. You can use this code by clicking link at bellow of this embed. Give us stars on our GitHub repository to keep us update this bot, or you can donate us from GitHub sponsors or our patreon in this repository or just click bellow.")
    .addFields([
      {
        name: "Client",
        value: [
          `Servers: ${this.client.guilds.cache.size}`,
          `Users: ${this.client.users.cache.size}`,
          `Channels: ${this.client.channels.cache.size}`
        ].join("\n")
      },
      {
        name: "Link",
        value: "[GitHub](https://github.com/Yukkuri-Studio/yukkuri-lava) | [GitHub Sponsors](https://github.com/sponsors/ameliakiara) | [Patreon](https://patreon.com/ameliakiara)"
      }
    ])
    
    const lavalink = new EmbedBuilder()
    .setColor("Red")
    .setThumbnail("https://camo.githubusercontent.com/09f6c6bdca8f8a56a48adf0fff0874786b464f17195a5fda752cedfe35dfe9da/68747470733a2f2f692e696d6775722e636f6d2f4f4737546e65382e706e67")
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
            `\u200b Allocated: ${this.formatByteSize(nodes.stats.memory.allocated)}`,
            "**CPU**",
            `\u200b Cores: ${nodes.stats.cpu.cores}`,
            `\u200b Load: ${this.formatByteSize(nodes.stats.cpu.lavalinkLoad.toFixed(0))}`,
            `\u200b Uptime: ${ms(nodes.stats.uptime)}`
        ].join("\n")
      }
    ]);
    
    if (!opt) {
        i.reply({ embeds: [info, lavalink], components: [row] })
        return;    
    }
    
    switch (opt) {
        case "bot": {
            i.reply({ embeds: [info], components: [row] });
            break;
        }
        
        case "lavalink": {
            i.reply({ embeds: [lavalink], components: [row] });
            break;
        }
    }
    
  }
  
  formatByteSize(bytes) {
        if(bytes < 1024) return bytes + " bytes";
        else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KiB";
        else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MiB";
        else return(bytes / 1073741824).toFixed(3) + " GiB";
    };
}

module.exports = Info