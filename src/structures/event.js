class Event {
  constructor(client, opt) {
    this.client = client;
    this.name = opt.name;
    this.emiter = opt.emiter;
    this.disable = opt.disable || false;
  }

  async load(...args) {
    this.run(...args).catch((er) => console.error(er));
  }

  // eslint-disable-next-line
  async run(...args) {
    throw new Error("Unimplementd Run fucntion");
  }
}

module.exports = Event;