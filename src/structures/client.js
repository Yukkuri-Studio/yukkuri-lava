const { Client, IntentsBitField } = require('discord.js')
const Loader = require("../handler/loader") 
const Music = require("../handler/poru")
const { Poru } = require('poru')


class YukkuriClient extends Client {
  constructor() {
  super({ intents: [ 'Guilds', 'GuildMembers', 'GuildVoiceStates' ]})
    
    this.loader = new Loader(this)
    this.music = new Music(this, Poru)
  }
  
  async init() {
    this.loader.loadEvents()
    this.loader.loadCommand()
    this.music.loadPoru()
    this.login(process.env.DISCORD_TOKEN)
  }
}

module.exports = YukkuriClient;