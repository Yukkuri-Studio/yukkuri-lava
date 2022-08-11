const Command = require("../../structures/command");
const {
  SlashCommandBuilder,
  EmbedBuilder,
  SelectMenuBuilder,
  ActionRowBuilder,
} = require("discord.js");
const { Client } = require("youtubei");

class Search extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("search")
        .setDescription("Search a song a cross the world")
        .addStringOption((opt) =>
          opt
            .setName("song")
            .setDescription("Insert a song title")
            .setRequired(true)
        ),
      inVoice: true,
      category: "Music",
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

    const song = i.options.getString("song");
    const player = this.client.music.poru.createConnection({
      guildId: i.guild.id,
      voiceChannel: memberVoice,
      textChannel: i.channel.id,
      deaf: true,
      volume: 50,
    });

    const youtube = new Client();
    const video = await youtube.search(song, { type: "video" });
    const list = video.items
      .slice(0, 10)
      .map((x, index) => `${++index} - ${x.title}`);
    const listchunk = video.items.slice(0, 10).map((x) => {
      return { label: x.title, value: x.id };
    });

    const menu = new SelectMenuBuilder()
      .setCustomId("search-list")
      .addOptions(listchunk);

    const row = new ActionRowBuilder().addComponents([menu]);

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("Select wich song you want to play")
      .setDescription(list.join("\n"));

    let msg = await i.channel.send({ embeds: [embed], components: [row] });
    i.deleteReply().catch((er) => er);
    return this.awaitInteraction(msg, i.member, player);
  }

  async awaitInteraction(msg, member, player) {
    const i = await msg.channel.awaitMessageComponent({
      filter: (i) => i.member.user.id === member.id,
      max: 1,
      errors: ["time"],
    });

    msg.delete().catch((er) => er);
    const val = i.values[0];

    const resolve = await this.client.music.poru.resolve(
      `https://youtube.com/watch?v=${val}`
    );

    const { loadType, tracks } = resolve;
    try {
      if (loadType === "SEARCH_RESULT" || loadType === "TRACK_LOADED") {
        const track = tracks.shift();
        track.info.requester = i.member;

        player.queue.add(track);

        const embed = new EmbedBuilder()
          .setColor("Red")
          .setDescription(`Added [${track.info.title}](${track.info.uri})`);

        await i.reply({
          embeds: [embed],
        });
        if (!player.isPlaying && !player.isPaused) return player.play();

        return;
      }
    } catch (e) {
      console.log(e);
      i.reply("No result found.");
    }
  }
}

module.exports = Search;