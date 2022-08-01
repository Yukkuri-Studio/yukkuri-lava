const Command = require('../../structures/command')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

class Help extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
      .setName("help")
      .setDescription("Showing command list.")
    })
  }
  
  async run(i) {
    let cmd = new Set([ 
    ...Object.values(this.client.interactionCommand).map((x) => `\`/${x.component.name}\` **${x.component.description}**`)
    ])
    cmd = [...cmd].join("\n")
    
    const embed = new EmbedBuilder()
    .setColor("Red")
    .setTitle(`${this.client.user.username}'s Help info`)
    .setThumbnail(this.client.user.displayAvatarURL())
    .setDescription(cmd)
    
    i.reply({ embeds: [embed] })
  }
}

module.exports = Help