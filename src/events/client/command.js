const Event = require("../../structures/event")
const { InteractionType } = require("discord.js")

class Command extends Event {
  constructor(client) {
    super(client, {
      name: "Command Load",
      emiter: "interactionCreate"
    })
  }
  
  async run(i) {
    if (i.type === InteractionType.ApplicationCommand) {
      if (this.client.interactionCommand[i.commandName]) {
        this.client.interactionCommand[i.commandName].load(i).catch((err) => console.log(err))
      }
    }
  }
}

module.exports = Command