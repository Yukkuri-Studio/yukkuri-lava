const Poru = require("../../structures/poru");

class Dc extends Poru {
  constructor(client) {
    super(client, {
      name: "Poru Dc",
      emitter: "nodeClose"
    })
  }
  
  async run(node) {
    setTimeout(() => {
      node.reconnect()
    }, 500)
  }
}

module.exports = Dc