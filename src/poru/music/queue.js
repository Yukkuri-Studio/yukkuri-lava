const Poru = require('../../structures/poru')
const { EmbedBuilder } = require('discord.js')

class Queue extends Poru {
    constructor(client) {
        super(client, {
            name: "Poru Queue End",
            emiter: "queueEnd"
        })
    }
    
    async run(palyer, track, data) {
        const embed = new EmbedBuilder()
        
        const channel = this.client.channels.cache.get(player.textChannel)
        const voice = this.client.channels.cache.get(player.voiceChannel);
        const voiceSize = voice.members.map((x) => !x.bot).size;
        
        
        setTimeout(() => {
            if (voiceSize < 0) {
            embed.setColor("Red")
            embed.setDescription("There is no one here, leaving voice channel.")
            player.destroy();
            return channel.send({ embeds: [embed] });   
            }    
        }, 5e3)
    }
}

module.exports = Queue;