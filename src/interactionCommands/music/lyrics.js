const Command = require("../../structures/command");
const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");
const fetch = require("node-fetch")

class Lyrics extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("lyrics")
        .setDescription("Find music lyrics")
        .addStringOption((opt) => opt
          .setName("song")
          .setDescription("Insert the song name"))
    })
  }

  async run(i) {
    const song = i.options.getString("song")

    if (!song) {
      const player = this.client.music.poru.players.get(i.guild.id)

      if (!player) return await i.reply("No song playing right now")

      if (!player.currentTrack) return await i.reply("No song playing right now")

      return this.lyricsSender(encodeURI(player.currentTrack.info.title), i)
    }

    return this.lyricsSender(song, i)
  }

  async lyricsSender(song, i) {
    try {
      const response = await fetch(`https://api.lxndr.dev/lyrics?song=${song}&from=DiscordRawon`, {
        method: "get"
      })

      const res = await response.json()

      const lyrics = this.chunk(res.lyrics, 2048)

      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle(`${res.song} - ${res.artist}`)
        .setURL(res.url)
        .setThumbnail(res.album_art)

      if (res.lyrics.length > 2048) {
        await i.reply({ content: "_ _" })
        lyrics.forEach(async (x) => {
          embed.setDescription(x)
          i.channel.send({ embeds: [embed] })
        });
        return
      }

      embed.setDescription(res.lyrics)
      await i.reply({ embeds: [embed] })
    } catch (er) {
      await i.reply("No lyrics found.")
    }
  }

  chunk(array, chunkSize) {
    const temp = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      temp.push(array.slice(i, i + chunkSize));
    }
    return temp;
  }
}

module.exports = Lyrics