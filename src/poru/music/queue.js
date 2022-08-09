const Poru = require('../../structures/poru')
const { EmbedBuilder } = require('discord.js')

class Queue extends Poru {
    constructor(client) {
        super(client, {
            name: "Poru Queue End",
            emiter: "queueEnd"
        })
    }
    
    async run(player, track, data) {
        const embed = new EmbedBuilder()
        
        const channel = this.client.channels.cache.get(player.textChannel)
        const voice = this.client.channels.cache.get(player.voiceChannel);
        const voiceSize = voice.members.filter((x) => !x.user.bot).size;
        console.log(voiceSize);
        const leaving = setInterval(() => {
                if (voiceSize <= 1) {
                embed.setColor("Red")
                embed.setDescription("There is no one here, leaving voice channel.")
                player.destroy();
                channel.send({ embeds: [embed] }); 
                return clearInterval(leaving);
                }    
            }, 2e3)
    }
}

module.exports = Queue;