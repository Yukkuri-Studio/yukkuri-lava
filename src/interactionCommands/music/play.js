const Command = require("../../structures/command");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

class Play extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play music from everywhare")
        .addStringOption((opt) =>
          opt
            .setName("track")
            .setDescription("Insert <title | link | playlist> to play music")
            .setRequired(true)
        ),
      inVoice: true,
    });
  }

  async run(i) {
    await i.deferReply();
    const memberVoice = i.member.voice.channelId;

    if (this.inVoice && !memberVoice) {
      await i.editReply(
        "You must be in voice channel before running this command."
      );
      return;
    }

    const player = this.client.music.poru.createConnection({
      guildId: i.guild.id,
      voiceChannel: memberVoice,
      textChannel: i.channel.id,
      deaf: true,
    });

    const resolve = await this.client.music.poru.resolve(
      i.options.getString("track")
    );

    const { loadType, tracks, playlistInfo } = resolve;

    try {
      switch (loadType) {
        case "PLAYLIST_LOADED": {
          for (const track of resolve.tracks) {
            track.info.requester = i.member;
            player.queue.add(track);
          }

          const embed = new EmbedBuilder()
            .setColor("White")
            .setDescription(
              `Added \`${tracks.length}\` tracks from ${playlistInfo.name}`
            );

          await i.editReply({
            embeds: [embed],
          });
          if (!player.isPlaying && !player.isPaused) return player.play();
          break;
        }

        case "SEARCH_RESULT" || "TRACK_LOADED": {
          const track = tracks.shift();
          track.info.requester = i.member;

          player.queue.add(track);

          const embed = new EmbedBuilder()
            .setColor("White")
            .setDescription(`Added [${track.info.title}](${track.info.uri})`);

          await i.editReply({
            embeds: [embed],
          });
          if (!player.isPlaying && !player.isPaused) return player.play();
          break;
        }
      }
    } catch (er) {
      i.editReply({ content: "No result found." });
    }
  }
}

module.exports = Play;
