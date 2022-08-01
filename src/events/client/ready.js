const Event = require("../../structures/event")

class Ready extends Event {
  constructor(client) {
    super(client, {
      name: "Ready Event",
      emiter: "ready"
    })
  }
  
  async run() {
    console.log(`${this.client.user.tag} is online!`)
    this.client.music.poru.init(this.client)
  }
}

module.exports = Ready