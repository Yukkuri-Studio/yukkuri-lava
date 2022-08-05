const Command = require("../../structures/command");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const ms = require("ms")

class Info extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
      .setName("info")
      .setDescription("Get information about the bot")
    })
  }
  
  async run(i) {
    const player = this.client.music.poru.nodes.get("yukkuri")
    
    const embed = new EmbedBuilder()
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
        name: "Lavalink",
       value: [
          "**Memory**",
          `\u200b Used: ${this.formatByteSize(player.stats.memory.used)}`,
          `\u200b Free: ${this.formatByteSize(player.stats.memory.free)}`,
          `\u200b Allocated: ${this.formatByteSize(player.stats.memory.allocated)}`,
          "**CPU**",
          `\u200b Cores: ${player.stats.cpu.cores}`,
          `\u200b Load: ${this.formatByteSize(player.stats.cpu.lavalinkLoad)}`,
          `\u200b Uptime: ${ms(player.stats.uptime)}`
        ].join("\n")
      },
      {
        name: "Link",
        value: "[GitHub](https://github.com/Yukkuri-Studio/yukkuri-lava) | [GitHub Sponsors](https://github.com/sponsors/ameliakiara) | [Patreon](https://patreon.com/ameliakiara)"
      }
    ])
    i.reply({ embeds: [embed] })
  }
  
  formatByteSize(bytes) {
        if(bytes < 1024) return bytes + " bytes";
        else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KiB";
        else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MiB";
        else return(bytes / 1073741824).toFixed(3) + " GiB";
    };
}

module.exports = Info