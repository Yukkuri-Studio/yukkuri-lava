const { Client, IntentsBitField } = require("discord.js");
const Loader = require("../handler/loader");
const Music = require("../handler/poru");
const Util = require("../utils/loader");
const Database = require("../utils/db");
const { Poru } = require("poru");
const config = require("../settings/config.json");

class YukkuriClient extends Client {
  constructor() {
    super({ intents: ["Guilds", "GuildMembers", "GuildVoiceStates"] });

    this.loader = new Loader(this);
    this.music = new Music(this, Poru);
    this.util = new Util(this);
    this.db = new Database(this);
    this.config = config;
  }

  async init() {
    await this.loader.loadEvents();
    await this.loader.loadCommand();
    await this.music.loadPoru();
    await this.util.WebHookPoster(this.config.POSTER_ACTIVE);
    await this.util.MongoDB();
    this.login(process.env.DISCORD_TOKEN);
  }
}

module.exports = YukkuriClient;