class Poru {
  constructor(client, poru) {
    this.client = client;
    this.name = poru.name;
    this.emiter = poru.emiter;
  }

  async load(...args) {
    this.run(...args).catch((er) => console.error(er));
  }

  // eslint-disable-next-line
  async run(...args) {
    throw new Error("Unimplementd Run fucntion");
  }
}

module.exports = Poru;