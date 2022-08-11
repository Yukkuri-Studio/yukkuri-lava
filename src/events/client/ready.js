const Event = require("../../structures/event");
const { ActivityType } = require("discord.js");

class Ready extends Event {
  constructor(client) {
    super(client, {
      name: "Ready Event",
      emiter: "ready",
    });
  }

  async run() {
    console.log(`${this.client.user.tag} is online!`);
    this.client.music.poru.init(this.client);
    this.client.user.setActivity("High Quality Music", {
      type: ActivityType.Playing,
    });
  }
}

module.exports = Ready;