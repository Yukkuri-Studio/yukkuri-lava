
const Command = require('../../structures/command')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

class Leave extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
      .setName("leave")
      .setDescription("Stop and clearing music and leave") 
    })
  }
  
  async run(i) {
    await i.deferReply()
    const memberVoice = i.member.voice.channelId
    if (this.inVoice && !memberVoice) {
     i.editReply({ content: 'You must be in voice channel before running this command.'})
    }
    
    
    const player = this.client.music.poru.players.get(i.guild.id)
    
  if (!player) return i.editReply("There is no music play on this server.")
  
  player.destroy()
  
  const embed = new EmbedBuilder()
  .setColor("Red")
  .setDescription("Leaving voice channel.")
  
  i.editReply({ embeds: [embed] })
  }
}

module.exports = Leave