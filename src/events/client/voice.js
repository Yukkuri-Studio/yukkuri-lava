const Event = require("../../structures/event");

class Voice extends Event {
  constructor(client) {
    super(client, {
      name: "Vce State",
      emiter: "voiceStateUpdate",
    });
  }

  async run(oldVc, newVc) {
    const player = this.client.music.poru.get(oldVc.guild.id);
    if (!player) return;

    const voice = this.client.channels.cache.get(player.voiceChannel);
    const voiceSize = voice.members.filter((x) => !x.bot).size;

    if (voiceSize < 1) {
      return player.destroy();
    }
  }
}

module.exports = Voice;