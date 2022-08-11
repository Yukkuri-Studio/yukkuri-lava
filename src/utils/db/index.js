const models = require("./models");

class Database {
  constructor() {
    this.models = models;
  }

  async get(model, filter = {}) {
    if (!this.models[model]) throw new Error(`${model} Model not found`);

    const data = await this.models[model].findOne(filter).catch((er) => er);
    if (data instanceof Error) throw data;

    return data;
  }

  async getAll(model, filter = {}) {
    if (!this.models[model]) throw new Error(`${model} Model not found`);

    let data = await this.models[model].find(filter).catch((er) => er);
    if (data instanceof Error) throw data;

    if (!data) data = new this.models[model]();
    return data;
  }

  async deleteOne(model, filter) {
    if (!this.models[model]) throw new Error(`${model} Model not found`);
    if (!filter) throw new Error("PLease provide a filter");

    const res = await this.models[model].deleteOne(filter).catch((er) => er);
    if (res instanceof Error) throw res;

    return true;
  }

  async getCreate(model, filter = {}) {
    if (!this.models[model]) throw new Error(`${model} Model not found`);

    let data = await this.models[model].findOne(filter);
    if (!data) {
      data = new this.models[model](filter);
    }
    return data;
  }

  async getAndNull(model, filter = {}) {
    if (!this.models[model]) throw new Error(`${model} Model not found`);

    const data = await this.models[model].findOne(filter).catch((er) => er);
    if (data instanceof Error) throw data;

    return data;
  }

  async updateOne(model, filter = {}, update = {}) {
    if (!this.models[model]) throw new Error(`${model} Model not found`);
    const data = await this.models[model]
      .updateOne(filter, update)
      .catch((er) => er);
    if (data instanceof Error) throw data;

    return data;
  }
}

module.exports = Database;