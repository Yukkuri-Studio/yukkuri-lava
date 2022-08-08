const Command = require("../../structures/command");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const filterList = [
  "8d",
  "bassboost",
  "karaoke",
  "timescale",
  "tremelo",
  "vibrato",
  "rotation",
  "distortion",
  "channelmix",
  "lowpass",
  "nightcore",
  "vaporwave",
  "clear",
];

const filter = []

for (const fil of filterList) {
    filter.push({
        name: fil,
        value: fil
    })
}

class Filter extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("filter")
        .setDescription("Settings current music filter")
        .addStringOption((opt) =>
          opt
            .setName("name")
            .setDescription(
              "Choice from menu the menu above to add filter to current music"
            )
            .setRequired(true)
            .addChoices(
              filter
            )
        ),
      inVoice: true,
    });
  }

  async run(i) {
    const memberVoice = i.member.voice.channelId;

    if (this.inVoice && !memberVoice) {
      i.editReply({
        content: "You must be in voice channel before running this command.",
      });
    }

    const player = this.client.music.poru.players.get(i.guild.id);

    if (!player) return i.reply("There is no music playing right now.");

    const filter = i.options.getString("name");

    if (!filterList.includes(filter))
      return i.reply("Please choice the correct filter from menu above.");

    const embed = new EmbedBuilder().setColor("Red");

    switch (filter) {
      case "8d": {
        player.filters.set8D(true);

        embed.setDescription("8D filter has been applied");
        i.reply({ embeds: [embed] });
        break;
      }

      case "bassboost": {
        player.filters.setBassboost(true);

        embed.setDescription("Bassboost filter has been applied");
        i.reply({ embeds: [embed] });
        break;
      }

      case "karaoke": {
        player.filters.setKaraoke(true);

        embed.setDescription("Karaoke filter has been applied");
        i.reply({ embeds: [embed] });
        break;
      }

      case "timescale": {
        player.filters.setTimescale(true);

        embed.setDescription("Timescale fitler has been applied");
        i.reply({ embeds: [embed] });
        break;
      }

      case "tremelo": {
        player.filters.setTremelo(true);

        embed.setDescription("Tremelo filter has been applied");
        i.reply({ embeds: [embed] });
        break;
      }

      case "vibrato": {
        player.filters.setVibrato(true);

        embed.setDescription("Vibrato filter has been applied");
        i.reply({ embeds: [embed] });
        break;
      }

      case "rotation": {
        player.filters.setRotation(true);

        embed.setDescription("Rotation filter has been applied");
        i.reply({ embeds: [embed] });
        break;
      }

      case "distortion": {
        player.filters.setDistortion(true);

        embed.setDescription("Distrotion filter has been applied");
        i.reply({ embeds: [embed] });
        break;
      }

      case "channelmix": {
        player.filters.setChannelMix(true);

        embed.setDescription("Channel Mix filter has been applied");
        i.reply({ embeds: [embed] });
        break;
      }

      case "lowpass": {
        player.filters.LowPass(true);

        embed.setDescription("Low Pass filter has been applied");
        i.reply({ embeds: [embed] });
        break;
      }

      case "nightcore": {
        player.filters.setNightcore(true);

        embed.setDescription("Nightcore filter has been applied");
        i.reply({ embeds: [embed] });
        break;
      }

      case "vaporwave": {
        player.filters.setVaporwave(true);

        embed.setDescription("Vaporwave filter has been applied");
        i.reply({ embeds: [embed] });
        break;
      }

      case "clear": {
        player.filters.clearFilters();

















        console.log("Cleared")

        embed.setDescription("Filters has been cleared");
        i.reply({ embeds: [embed] });
        break;
      }
    }
  }
}

module.exports = Filter;
