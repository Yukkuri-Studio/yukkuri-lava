const glob = require('glob')
const path = require('node:path')
const { Poru } = require('poru')

class PoruHandler {
  constructor(client, poru) {
    this.client = client
    this.poru = poru
  }
  
  async getFiles(filePath) {
		return new Promise((resolve, reject) => {
			glob(filePath, (er, files) => {
				if (er) return reject(er);
				resolve(files);
			});
		});
	}
	
  get path() {
		return path.dirname(require.main.filename);
	}

  async loadPoru() {
    const nodes = [{
      name: "main_node",
      host:"node-au.devraiden.tech",
      port: 2000,
      password: "youshallnotpass"
    }]
    this.poru = new Poru(this.client, nodes)
    
    const poru = await this.getFiles(`${this.path}/poru/**/*.js`)
    let i = 0
    
    this.client.poruEvent = {}
    for (const file of poru) {
      delete require.cache[file]
      
      const File = require(file)
      
      const Event = new File(this.client)
      this.client.poruEvent[Event.name] = Event;
      
      this.poru.on(Event.emiter, Event.load.bind(Event))
      i++
    }
    console.log(`${i} Poru events loaded.`)
  }
} 

module.exports = PoruHandler