const { OpusEncoder } = require('@discordjs/opus');
const encoder = new OpusEncoder(48000, 2);
const ytdl = require('ytdl-core');
const keepAlive = require('./server');
require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const queue = new Map();
keepAlive();

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  // let channel = bot.channels.get('732808185311789152');
  // // Or via name (less persistent)
  // channel = bot.channels.find('name', 'General');

  // channel.join()
  // .then(connection => console.log('Connected'))
  // .catch(console.error);
});

// bot.on('message', async message => {
//   if (message.author.bot) return;
//   if (!message.content.startsWith('!')) return;
//   const serverQueue = queue.get(message.guild.id);
//   if (message.content.startsWith(`${prefix}play`)) {
//     execute(message, serverQueue);
//     return;
// } else if (message.content.startsWith(`!skip`)) {
//     skip(message, serverQueue);
//     return;
// } else if (message.content.startsWith(`!stop`)) {
//     stop(message, serverQueue);
//     return;
// } else {
//     message.channel.send("You need to enter a valid command!");
// }
// })

// process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

// bot.on('message', async message => {
// 	// Join the same voice channel of the author of the message
// 	if (message.member.voice.channel) {
// 		const connection = await message.member.voice.channel.join();
// 	}
// });

bot.on('message', async message => {



  if (message.content === '!play') {
    const streamOptions = { seek: 0, volume: 1 };
  if (message.channel.type !== 'text') return;
  const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}
    let url = "https://www.youtube.com/watch?v=cFJ5qCmvPkY";

message.member.voiceChannel.join()
.then(connection => {
    console.log('joined channel');

    let stream = ytdl(url, { filter: 'audioonly' });
  stream.on('error', console.error);
  let dispatcher = connection.playStream(stream)
    // Handle error without crashing the app.
    .catch(console.error);
})
.catch(console.error);

		// voiceChannel.join().then(connection => {
		// 	console.log("joined channel");
    //         const stream = ytdl('https://www.youtube.com/watch?v=gOMhN-hfMtY', { filter : 'audioonly' });
    //         const dispatcher = connection.playStream(stream, streamOptions);
    //         dispatcher.on("end", end => {
    //             console.log("left channel");
    //             voiceChannel.leave();
    //         });
		// });
  }
})



// 	}
//   }
//   if (!message.guild) return;
//   if (message.content.startsWith('!kick')) {
//     const user = message.mentions.users.first();
//     if (user) {
//       const member = message.guild.member(user);
//       if (member) {
//         member
//           .kick('Optional reason that will display in the audit logs')
//           .then(() => {
//             message.reply(`Successfully kicked ${user.tag}`);
//           })
//           .catch(err => {
//             message.reply('I was unable to kick the member');
//             console.error(err);
//           });
//       } else {
//         message.reply("That user isn't in this guild!");
//       }
//     } else {
//       message.reply("You didn't mention the user to kick!");
//     }
//   }
//   else if (message.content === '!user-info') {
// 	message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
//   }
//   if (message.content.startsWith('!ping')) {
//     message.reply(" pong!");
//   }
// });
bot.login(TOKEN);