const Poru = require('../../structures/poru')
const { EmbedBuilder } = require('discord.js')
const ms = require('ms')

class Start extends Poru {
  constructor(client) {
    super(client, {
      name: "Poru Track Start",
      emiter: "trackStart"
    })
  }
  
  async run(player, track, payload) {
    
    const embed = new EmbedBuilder()
    .setColor('Red')
    .setTitle(`Startplaying ${track.info.title}`)
    .addFields([
      {
        name: "Artist:",
        value: track.info.author,
        inline: true
      },
      {
        name: "Source:",
        value: track.info.sourceName,
        inline: true
      },
      {
        name: "Link:",
        value: `[Click Here](${track.info.uri})`,
        inline: true
      },
      {
        name: "Duration:",
        value: `${ms(track.info.length)}`,
        inline: true
      }
    ])
    .setImage(track.info.image)
    

    const channel = this.client.channels.cache.get(player.textChannel)
    
    channel.send({ embeds: [embed] })
  }
}

module.exports = Start