const Command = require('../../structures/command')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

class Volume extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
      .setName("volume")
      .setDescription("Settings music volume")
      .addNumberOption((opt) => opt
      .setName("value")
      .setDescription("Set music volume between 0-100")
      .setRequired(true)),
      inVoice: true
    })
  }
  
  async run(i) {
    const memberVoice = i.member.voice.channelId
    
    if (this.inVoice && !memberVoice) {
      await i.editReply("You must be in voice channel before running this command.")
      return
    }
    
    const player = this.client.music.poru.players.get(i.guild.id)
    
    if (!player) return i.reply({ephemeral: true, content: "You must be in voice channel before running this command" })
    
    let vol = i.options.getNumber("value")
    
    if (vol > 100) vol = 100;
    else if (vol < 0) vol = 0
    
    player.setVolume(vol)
    
    const embed = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`Volume set to \`${vol}\`%`)
    
    i.reply({ embeds: [embed] })
  }
}

module.exports = Volume