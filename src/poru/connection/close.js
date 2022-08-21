const Poru = require("../../structures/poru");

class Close extends Poru {
  constructor(client) {
    super(client, {
      name: "Poru Socket Close",
      emitter: "socketClose"
    })
  }
  
  async run(player, data) {
    if (!player.isPlaying && !player.isPaused) return player.play();
  }
}

module.exports = Close