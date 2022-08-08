const Command = require("../../structures/command");
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder } = require("discord.js");

class Invite extends Command {
    constructor(client) {
        super(client, {
            component: new SlashCommandBuilder()
            .setName("invite")
            .setDescription("Invite me to your server")
        })
    }
    
    async run(i) {
        const inviteButton = new ButtonBuilder()
        .setStyle("LINK")
        .setLabel("Invite Me!")
        .setEmoji("")
    }
}

module.exports = Invite;