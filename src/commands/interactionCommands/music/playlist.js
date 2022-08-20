const Command = require("../../../structures/command");
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

class Playlist extends Command {
  constructor(client) {
    super(client, {
      component: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("Set your own playlist up to 3 link inside")
        .addSubcommand((sub) =>
          sub
            .setName("add")
            .setDescription("Add your custom playlist up to link.")
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
                .setName("name")
                .setDescription("Choice your playlist and play it")
                .setRequired(true)
            )
        )
        .addSubcommand((sub) =>
          sub
            .setName("remove")
            .setDescription("Remove playlist")
            .addStringOption((opt) =>
              opt
                .setName("name")
                .setDescription("Insert the playlist name")
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
        if (db.playlist.length > 2) {
          i.reply({
            content:
              "You has been reached limit playlist, the limit playlist is 3 per users, remove it if you want to add different playlist.",
            ephemeral: true,
          });
          break;
        }

        const playlistName = new TextInputBuilder()
          .setCustomId(`${i.member.user.id}-playlist-name`)
          .setLabel("Insert The Playlist Name")
          .setStyle(TextInputStyle.Short);

        const playlistLink = new TextInputBuilder()
          .setCustomId(`${i.member.user.id}-playlist-link`)
          .setLabel("Insert your playlist link")
          .setStyle(TextInputStyle.Paragraph);

        const pn = new ActionRowBuilder().addComponents(playlistName);
        const pl = new ActionRowBuilder().addComponents(playlistLink);
        const modal = new ModalBuilder()
          .setTitle("Custom Playlist")
          .setCustomId(`${i.member.user.id}-modal-playlist`)
          .addComponents(pn, pl);

        await i.showModal(modal);
        this.modalSubmit(db);
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
        const name = i.options.getString("name");
        const choice = db.playlist.find((x) => x.names === name);

        if (!choice) {
          i.reply({ content: "I Can't find that playlist", ephemeral: true });
          return;
        }

        this.loadPlay(i, choice.link);
        break;
      }

      case "remove": {
        const name = i.options.getString("name");
        const playlistFind = db.playlist.find((x) => x.names === name);

        if (!playlistFind) {
          i.reply({
            content: "I can't find the playlist name.",
            ephemeral: true,
          });
          return;
        }

        const playlistIndex = db.playlist.findIndex(
          (x) => x.names === playlistFind.names
        );

        const embed = new EmbedBuilder()
          .setColor("Red")
          .setDescription(`Successfully delete **${name}** playlist.`);

        i.reply({ embeds: [embed], epmeheral: true });

        db.playlist.splice(playlistIndex, 1);
        this.client.db.updateOne(
          "playlist",
          { userId: db.userId },
          { $set: { playlist: db.playlist } }
        );
        break;
      }
    }
  }

  async modalSubmit(db) {
    this.client.once("interactionCreate", async (i) => {
      const name = i.fields.getTextInputValue(
        `${i.member.user.id}-playlist-name`
      );
      const links = i.fields.getTextInputValue(
        `${i.member.user.id}-playlist-link`
      );

      const embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(
          [
            `Successfully added your custom playlist`,
            `\u200b Name: ${name}`,
            `\u200b Link: ${links}`,
          ].join("\n")
        );

      i.reply({ ephemeral: true, embeds: [embed] });

      db.playlist.push({ names: name, link: links });

      this.client.db.updateOne(
        "playlist",
        { userId: db.userId },
        { $set: { playlist: db.playlist } }
      );
    });
  }

  async loadPlay(i, link) {
    const memberVoice = i.member.voice.channelId;

    if (!memberVoice) {
      await i.reply(
        "You must be in voice channel before running this command."
      );
      return;
    }

    let db = await this.client.db.getAndNull("lastplay", {
      userId: i.member.user.id,
    });

    if (!db) {
      db = new this.client.db.models.lastplay({
        userId: i.member.user.id,
      });
      db.save();
    }

    const player = this.client.music.poru.createConnection({
      guildId: i.guild.id,
      voiceChannel: memberVoice,
      textChannel: i.channel.id,
      deaf: true,
    });
    player.setVolume(db.volume);

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