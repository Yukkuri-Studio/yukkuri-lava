const express = require("express");
const helmet = require("helmet");
const { Webhook } = require("@top-gg/sdk");
const { AutoPoster } = require("topgg-autoposter");
const { connect } = require("mongoose");
const ms = require("ms")

class Util {
  constructor(client) {
    this.client = client;
  }

  async WebHookPoster(active = false) {
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
        let db = await this.client.db.getAndNull("premium", { userId: vote.user })
        
        if(!db) {
          db = new this.client.db.models.premium({
            userId: vote.user
          })
          db.save()
        }
        
        db.premiumStatus = true
        db.premiumStamp = ms("12h")
        db.premiumExp = Date.now()
        db.voteCount += 1
        
        this.client.db.updateOne("premium", { userId: vote.user }, { $set: { premiumStatus: db.premiumStatus, premiumStamp: db.premiumStamp, premiumExp: db.premiumExp, voteCount: db.voteCount }})
        this.client.timer.add(vote.user, db);
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