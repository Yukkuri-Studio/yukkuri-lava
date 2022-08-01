const Poru = require('../../structures/poru')

class Error extends Poru {
  constructor(client) {
    super(client, {
      name: "Poru Error",
      emiter: "nodeError"
    })
  }
  
  async run() {
    console.log("Error while connecting to lavalink server.")
  }
}

module.exports = Error