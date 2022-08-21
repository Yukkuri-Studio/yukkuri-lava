const Poru = require("../../structures/poru");

class Update extends Poru {
  constructor(client) {
    super(client, {
      name: "Poru Player Update",
      emitter: "playerUpdate"
    })
  }
  
  async run(player, data) {
    if (!player.isPlaying && !player.isPaused) return player.play();
  }
}

module.exports = Update