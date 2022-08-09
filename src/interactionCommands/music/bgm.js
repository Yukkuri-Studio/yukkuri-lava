const Command = require("../../structures/command");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const playlist = require("../../settings/playlist.json")

class Bgm extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
      .setName("bgm")
      .setDescription("Play a bgm playlist")
      .addStringOption((opt) => opt
      .setName("name")
      .setDescription("Select the bgm above")
      .addChoices(
        { name: "NSC", value: "NSC" },
        { name: "LOFI", value: "LOFI" },
        { name: "ANIME", value: "ANIME" },
        { name: "POPPUNK", value: "POPPUNK" },
        { name: "TOPCHARTS", value: "TOPCHARTS" },
      )
      .setRequired(true))
    })
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
      volume: 50
    });
    
    const opt = i.options.getString("name")
    const song = playlist.find(x => x.name === opt)

    if(!song) return i.editReply("I can't find that playlist")
    const resolve = await this.client.music.poru.resolve(song.link);
    const { loadType, tracks, playlistInfo } = resolve;

    try {
      if (loadType === 'PLAYLIST_LOADED') {
				for (const track of resolve.tracks) {
					track.info.requester = i.member;
					player.queue.add(track);
				}

				const embed = new EmbedBuilder()
					.setColor('Red')
					.setDescription(`Added \`${tracks.length}\` tracks from ${playlistInfo.name}`);

				await i.editReply({
					embeds: [embed],
				});

				if (!player.isPlaying && !player.isPaused) return player.play();

				return;
			}
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = Bgm