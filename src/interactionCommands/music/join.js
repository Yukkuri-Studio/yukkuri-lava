const Command = require('../../structures/command')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

class Join extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
      .setName("join")
      .setDescription("Invite me to join to your voice channel."),
      inVoice: true
    })
  }
  
  async run(i) {
   const memberVoice = i.member.voice.channelId
    if (this.inVoice && !memberVoice) {
     i.reply({ ephemeral: true, content: 'You must be in voice channel before running this command.'})
    }
    
    this.client.music.poru.createConnection({
      guildId: i.guild.id,
      voiceChannel: memberVoice,
      textChannel: i.channel.id,
      deaf: true
    })
    
    const embed = new EmbedBuilder()
    .setColor("Red")
    .setDescription("Successfully join your voice channel.")
    
    i.reply({ ephemeral: true, embeds: [embed] })
    return
  }
}

module.exports = Join