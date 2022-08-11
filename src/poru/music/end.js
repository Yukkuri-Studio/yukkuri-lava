const Poru = require("../../structures/poru");

class End extends Poru {
  constructor(client) {
    super(client, {
      name: "Poru End Event",
      emiter: "trackEnd",
    });
  }

  async run(player, track, data) {
    if (player.isAutoplay === true) {
      player.setAutoplay(player.isAutoplay, track);
      if (!player.isPlaying && !player.isPaused) return player.play();
    }
  }
}

module.exports = End;