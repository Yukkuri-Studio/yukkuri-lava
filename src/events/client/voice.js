const Event = require("../../structures/event")

class Voice extends Event {
  constructor(client) {
    super(client, {
      name: "Vce State",
      emiter: "voiceStateUpdate"
    })
  }
  
  async run(oldVc, newVc) {
    const player = this.client.music.poru.get(oldVc.guild.id)
    if (!player) return
    
    if (!newVc.guild.members.me.voice.channel) {
    player.destroy();
   }
  }
}

module.exports = Voice