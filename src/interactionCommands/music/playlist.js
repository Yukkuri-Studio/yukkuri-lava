const Command = require("../../structures/command");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

class Playlist extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("Set your own playlist up to 3 link inside")
        .addSubcommand((sub) =>
          sub
            .setName("add")
            .setDescription("Add your playlist")
            .addStringOption((opt) =>
              opt
                .setName("link")
                .setDescription(
                  "isert the playlist link here, make sure your link is public."
                )
                .setRequired(true)
            )
            .addStringOption((opt) =>
              opt
                .setName("name")
                .setDescription("Give your playlist name")
                .setRequired(true)
            )
        )
        .addSubcommand((sub) =>
          sub
            .setName("list")
            .setDescription("Show your playlist list that you has been made.")
        )
        .addSubcommand((sub) =>
          sub
            .setName("load")
            .setDescription("Load yout playlist and play it")
            .addStringOption((opt) =>
              opt
                .setName("names")
                .setDescription("Choice your playlist and play it")
                .setRequired(true)
            )
        ),
      category: "Music",
    });
  }

  async run(i) {
    const sub = i.options.getSubcommand();
    let db = await this.client.db.getAndNull("playlist", {
      userId: i.member.user.id,
    });

    if (!db) {
      db = new this.client.db.models.playlist({
        userId: i.member.user.id,
      });
      db.save();
    }

    switch (sub) {
      case "add": {
        const opt = i.options.getString("link");
        const name = i.options.getString("name");

        if (db.playlist.length > 2) {
          i.reply({
            content:
              "You has been reached limit playlist, the limit playlist is 3 per users, remove it if you want to add different playlist.",
            ephemeral: true,
          });
          break;
        }

        const embed = new EmbedBuilder()
          .setColor("Red")
          .setTitle("Added playlist")
          .setDescription([
            `**Playlist Name**: ${name}`,
            `**Playlist Link**: ${opt}`,
          ]);

        i.reply({
          embeds: [embed],
          ephemeral: true,
        });

        db.playlist.push({ names: name, link: opt });
        this.client.db.updateOne(
          "playlist",
          { userId: i.member.user.id },
          { $set: { playlist: db.playlist } }
        );
        break;
      }

      case "list": {
        if (!db.playlist.length) {
          i.reply({ content: "You have no playlist yet.", ephemeral: true });
          break;
        }

        const list = db.playlist.map(
          (x, index) => `\`${++index}\` - ${x.names} | ${x.link}`
        );

        const embed = new EmbedBuilder()
          .setColor("Red")
          .setTitle(`${i.member.user.username}'s Playlist`)
          .setThumbnail(i.member.user.displayAvatarURL({ dynamic: true }))
          .setDescription(list.join("\n"));

        i.reply({ embeds: [embed] });
        break;
      }

      case "load": {
        const name = i.options.getString("names");
        const choice = db.playlist.find((x) => x.names === name);

        if (!choice) {
          i.reply({ content: "I Can't find that playlist", ephemeral: true });
          return;
        }

        this.loadPlay(i, choice.link);
        break;
      }
    }
  }

  async loadPlay(i, link) {
    const memberVoice = i.member.voice.channelId;

    if (!memberVoice) {
      await i.reply(
        "You must be in voice channel before running this command."
      );
      return;
    }

    const player = this.client.music.poru.createConnection({
      guildId: i.guild.id,
      voiceChannel: memberVoice,
      textChannel: i.channel.id,
      deaf: true,
      volume: 50,
    });

    const resolve = await this.client.music.poru.resolve(link);

    const { loadType, tracks, playlistInfo } = resolve;

    try {
      if (loadType === "PLAYLIST_LOADED") {
        for (const track of resolve.tracks) {
          track.info.requester = i.member;
          player.queue.add(track);
        }

        const embed = new EmbedBuilder()
          .setColor("Red")
          .setDescription(
            `Added \`${tracks.length}\` tracks from ${playlistInfo.name}`
          );

        await i.reply({
          embeds: [embed],
        });

        if (!player.isPlaying && !player.isPaused) return player.play();

        return;
      }

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
    } catch (er) {
      console.log(er);
      i.reply({ content: "No result found." });
    }
  }
}

module.exports = Playlist;