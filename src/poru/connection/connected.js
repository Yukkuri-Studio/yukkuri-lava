const Poru = require('../../structures/poru')

class NodeConnect extends Poru {
  constructor(client) {
    super(client, {
      name: "Poru Connect",
      emiter: "nodeConnect"
    })
  }
  
  async run(node) {
    console.log(`Poru client has been connected to ${node.name}`)
  }
}

module.exports = NodeConnect