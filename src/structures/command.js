class SlashCommand {
  constructor(client, opt) {
    this.client = client
    this.component = opt.component;
    this.inVoice = opt.inVoice || false
  }
  
  async load(i) {
		const res = await this.run(i).catch((er) => er);

		if (res instanceof Error) return console.log(i, res)
		}

  async run(i) {
      throw new Error("There is some error while executing this command")
  }
}

module.exports = SlashCommand
