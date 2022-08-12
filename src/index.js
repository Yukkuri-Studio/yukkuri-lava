const Client = require("./structures/client");

const client = new Client();
client.init();

setTimeout(() => {
	client.timer.checker();
	client.timer.worker();
}, 3e3);