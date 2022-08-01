const Command = require('../../structures/command')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

class Stop extends Command {
  constructor(client) {
    super(client, {
       component: new SlashCommandBuilder()
       .setName("stop")
       .setDescription("Stopthe music and clearing the queue")
    })
  }
  
  async run(i) {
    await i.deferReply()
    const memberVoice = i.member.voice.channelId
    
    if (this.inVoice && !memberVoice) {
      await i.editReply("You must be in voice channel before running this command.")
      return
    }
    
    const player = this.client.music.poru.players.get(i.guild.id)
    
  if (!player) return i.editReply("There is no music play on this server.")
  
  player.stop()
    
    const embed = new EmbedBuilder()
    .setColor('Red')
    .setDescription('Clearing queue and stoping music')
    
    i.editReply({ embeds: [embed] })
  }
}

module.exports = Stop