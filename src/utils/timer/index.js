const { Queue, QueueScheduler, QueueEvents, Worker } = require('bullmq');

class BullMQ {
  constructor(client) {
    this.client = client
  }
  
    async scheduler() {
		const scheduler = new QueueScheduler('PremiumTimer', { connection: this.client.redis });
		const events = new QueueEvents('PremiumTimer', { connection: this.client.redis });


		await scheduler.waitUntilReady();
		await events.waitUntilReady();
	}
	
	async checker() {
		await this.scheduler();
		const queue = new Queue('PremiumTimer', { connection: this.client.redis });
		queue.obliterate();

		const db = await this.client.db.models.premium.find()
		
		if(!db.length) return
		
		for (const pr of db) {
		  if(!pr) continue
			const ended = pr.premiumStamp + db.premiumExp - Date.now();

			if (ended < 0) {
				await queue.add(pr.userId, { pr }, {  delay: ended });
				continue;
			}
			await queue.add(pr.userId, { pr }, { delay: ended });
		}
	}
	
	async add(job, pr) {
		await this.scheduler();
		const queue = new Queue('PremiumTimer', { connection: this.client.redis });

		queue.add(job, { pr }, { delay: pr.premiumStamp });
	}
	
	worker() {
		const process = async (job) => {
			const pr = job.data.pr;
			this.premiumUpdate(pr);
		};

		// eslint-disable-next-line no-new
		new Worker('PremiumTimer', process, { connection: this.client.redis });
	}
	
	premiumUpdate(db) {
	  return this.client.db.updateOne("premium", { userId: db.userId }, { $set: { premiumStatus: false } })
	}
}

module.exports = BullMQ