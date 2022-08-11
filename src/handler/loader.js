const glob = require("glob");
const path = require("node:path");
const { Poru } = require("poru");

class Loader {
  constructor(client) {
    this.client = client;
  }

  get path() {
    return path.dirname(require.main.filename);
  }

  async loadEvents() {
    const events = await this.getFiles(`${this.path}/events/**/*.js`);
    let i = 0;

    this.client.events = {};
    delete require.cache[`${this.path}/structures/event.js`];
    for (const filePath of events) {
      delete require.cache[filePath];

      const File = require(filePath);

      const Event = new File(this.client);
      if (Event.disable) continue;
      this.client.events[Event.name] = Event;

      this.client.on(Event.emiter, Event.load.bind(Event));
      i++;
    }

    console.log(`${i} Events loaded.`);
  }

  async loadCommand() {
    const interactionCommands = await this.getFiles(
      `${this.path}/interactionCommands/**/*.js`
    );
    let i = 0;
    const data = [];

    this.client.interactionCommand = {};
    for (const filePath of interactionCommands) {
      delete require.cache[filePath];

      const File = require(filePath);

      const Event = new File(this.client);
      if (Event.disable) continue;
      this.client.interactionCommand[Event.component.name] = Event;
      data.push(Event.component);
      i++;
    }

    console.log(`${i} Interaction commands loaded.`);
    this.client.once("ready", async () => {
      if (this.client.config.NODE === "delete-production") {
        await this.client.application.commands.set([]);
        console.log("Deleting slash command production has been registered.");
        return;
      }

      if (this.client.config.NODE === "delete-development") {
        await this.client.application.commands.set(
          [],
          this.client.config.GUILD_DEV
        );
        console.log("Deleting slash command development has been registered.");
        return;
      }

      if (this.client.config.NODE === "production") {
        await this.client.application.commands.set(data);
        console.log("Slash command production has been registered.");
        return;
      }

      if (this.client.config.NODE === "development") {
        await this.client.application.commands.set(
          data,
          this.client.config.GUILD_DEV
        );
        console.log("Slash command development has been registered.");
      }
    });
  }

  async getFiles(filePath) {
    return new Promise((resolve, reject) => {
      glob(filePath, (er, files) => {
        if (er) return reject(er);
        resolve(files);
      });
    });
  }
}

module.exports = Loader;