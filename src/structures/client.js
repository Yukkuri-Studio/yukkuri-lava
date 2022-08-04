const { Client, IntentsBitField } = require('discord.js')
const Loader = require("../handler/loader") 
const Music = require("../handler/poru")
const { Poru } = require('poru')
const config = require("../settings/config.json")


class YukkuriClient extends Client {
  constructor() {
  super({ intents: [ 'Guilds', 'GuildMembers', 'GuildVoiceStates' ]})
    
    this.loader = new Loader(this)
    this.music = new Music(this, Poru)
    this.config = config
  }
  
  async init() {
    this.loader.loadEvents()
    this.loader.loadCommand()
    this.music.loadPoru()
    this.login(process.env.DISCORD_TOKEN)
  }
}

module.exports = YukkuriClient;