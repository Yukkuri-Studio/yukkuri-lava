const Client = require("./structures/client");

const client = new Client();
client.init();

setTimeout(() => {
  client.timer.checker();
  console.log("BullMQ Checker activate.")
}, 3e3);

setTimeout(() => {
  client.timer.checker();
  console.log("BullMQ Worker activate.")
}, 4e3);