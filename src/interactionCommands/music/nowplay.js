const Command = require("../../structures/command");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const ms = require("ms");

class NowPlay extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
      .setName("nowplay")
      .setDescription("Showing current playing music")
    })
  }
  
  async run(i) {
    const player = this.client.music.poru.players.get(i.guild.id)
    
    if (!player) return i.reply("No music playing ight now.")
    
    const embed = new EmbedBuilder()
    .setColor("Red")
    .setTitle(`Now Playing ${player.currentTrack.info.title}`)
    .addFields([
      {
        name: "Author",
        value: player.currentTrack.info.author,
        inline: true
      },
      {
        name: "Source",
        value: player.currentTrack.info.sourceName,
        inline: true
      },
      {
        name: "Duration",
        value: `${ms(player.currentTrack.info.length)}`
      },
      {
        name: "Stream",
        value: player.currentTrack.isStream ? "Yes" : "No"
      }
    ])
    .setImage(player.currentTrack.info.image)
    
    i.reply({ embeds: [embed] })
  }
} 

module.exports = NowPlay