const express = require("express");
const helmet = require("helmet");
const { Webhook } = require("@top-gg/sdk");
const { AutoPoster } = require("topgg-autoposter");
const { connect } = require("mongoose");

class Util {
  constructor(client) {
    this.client = client;
  }

  WebHookPoster(active = false) {
    if (!active) return;
    const app = express();
    const webhook = new Webhook(process.env.TOPGG_AUTH_WEBHOOK);
    const post = AutoPoster(process.env.TOPGG_AUTH, this.client);

    post
      .on("posted", () => {
        console.log("[ TOP.GG Auto Post ] Posted stats to Top.gg!");
      })
      .on("error", (err) => {
        console.log(err);
      });

    app.use(helmet()).post(
      "/topwebhook",
      webhook.listener(async (vote) => {
        console.log(vote);
      })
    );
    app.listen(this.client.config.PORT);
  }

  async MongoDB() {
    const res = await connect(
      `${process.env.mongo_host}/${process.env.mongo_db_name}`
    ).catch((er) => er);
    if (res instanceof Error) throw res;
    console.log("Connected to mongodb.");
    return;
  }
}

module.exports = Util;