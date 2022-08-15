const Command = require("../../../structures/command");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const ms = require("ms");
const bar = require("string-progressbar");

class NowPlay extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("nowplay")
        .setDescription("Showing current playing music"),
      category: "Music",
    });
  }

  async run(i) {
    const player = this.client.music.poru.players.get(i.guild.id);

    if (!player) return i.reply("No music playing ight now.");

    const track = player.currentTrack.info;
    const dur = track.length;
    const pos = player.position;
    const pro = bar.splitBar(dur, pos, 20)[0];
    const durationleft = dur - pos;

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle(track.title)
      .setURL(track.uri)
      .setThumbnail(track.image)
      .setDescription(
        [
          `**Duration**: ${ms(dur)}`,
          `**Artist**: ${track.author}`,
          `**Stream**: ${track.isStream ? "Yes" : "No"}`,
          `**Volume**: ${player.volume}%`,
          `${pro}  ${ms(durationleft, {
            long: true,
          })} left`,
        ].join("\n")
      );

    i.reply({ embeds: [embed] });
  }
}

module.exports = NowPlay;