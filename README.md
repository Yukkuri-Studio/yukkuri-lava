# 🎏 Yukkuri Music
A stable lavalink discord music base on [poru] client

# 🚧 Status
Yukkuri lava still on development mode that has many bug we need to solve,
if you want to contribute with yukkuri lava, you can fork this repo.

# 🎗 Commands
| Name      | Parameter | Details |
| ----------- | ----------- | ----------- |
| /play | track | Insert (title, link, playlist) |
| /skip | | Skipping current play song |
| /stop | | Clearing queue and stopping song |
| /pause | | Run to times to pause or resume |
| /queue | | Show songs list |
| /volume | value | insert the volume from 1-100 |
| /shuffle | | Randomzy a songs in the queue |
| /remove | number | Insert songs number to remove the song from queue | 
| /leave | | Leaving a queue |
| /join | | Create a connection in your voice channel |
| /filter | name | Giving effect to the song such bassboost, nightcore |
| /lyrics | song | Search song lyrics |
| /nowplay | | Show details current song play |
| /autoplay | | Autoplaying song from previous song |
| /help | | Show command list |
| /info | | Show bot info |
| /invite | | Invite me to your server |

# ⚙ Self hosting instruction
- Download [GIT] from here, and then download LTS [NodeJS] from here (must be version 16.x)
- Download [Azul - Zulu] java from here, then download the [Lavalink] server from here.
- After you download all those requipment clone this repository with this command.
```shell
git clone https://github.com/Yukkuri-Studio/yukkuri-lava
```
- Create a new directory for your lavalink server and put the [Lavalink] server there.
- Create a new file with name [application.yml] and set the password, keep the `ip` to the default setting.
- Run your [Lavalink] server by doin this command.
```java
java -jar Lavalink.jar`
```
- Great your [Lavalink] serve is running now. Now next step.
- After cloning this repository go to `src/settings`.
- Create a new file with name `config.json` inside of `src/settings` file.
- Copy all lines on `config.json.example` to `config.json` file.
- Fill up all those requipment, example bellow:
```json
{
  "LAVA_HOST": "lavalink host | locahost",
  "LAVA_PASS": "lavalink password | youshallnotpass | or your password"
  "LAVA_PORT": 2333 | your custom port,
  "NODE": "production for public bot use, development for testing use",
  "GUILD_DEV": ["if you use NODE development, fill this with your guild id"]
}
```
- Then create new file outsite of `src` file with name `.env`, example bellow:
```shell

DISCORD_TOKEN=your bot token
```
- All those requipment is fill it up, then open your termial or command prompt.
- Type `npm install --save` to install the `dependencise`, it'll take a while if you have poor connection 🗿
- Then type `npm start` and your bot is ready to go!

# 📝 Importants Notes
If you want to make this template to public bot, don't delete any message from `info` command, or we'll take your bot down.

And also, if you want to make this bot to public uses, and you has been fill the config NODE with `development`,
you must delete the command first at the `development` stage by changing it `delete-development`, restart the bot and wait until all slash commmand is deleted and then change it to `production` and walla you done!

# 🎇 Supports
Supports us by giving start on this repository or by donating us via GitHub Sponsors or Patreon
- [GitHub Sponsors]
- [Patreon]

[Azul - Zulu]: <https://www.azul.com/downloads/>
[GIT]: <https://git-scm.com/>
[NodeJS]: <https://nodejs.org>
[Lavalink]: <https://github.com/freyacodes/Lavalink/releases/tag/3.4>
[application.yml]: <https://github.com/freyacodes/Lavalink/blob/master/LavalinkServer/application.yml.example>
[GitHub Sponsors]: <https://github.com/sponsors/ameliakiara>
[Patreon]: <https://patreon.com/ameliakiara>
[poru]: <https://npmjs.com/package/poru>