require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client({
    allowedMentions: { parse: ['roles'], repliedUser: false },
    ws: { properties: { $browser: 'Discord iOS' } },
    messageCacheMaxSize: 999999,
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: true
    },
    repliedUser: true
});
process.setMaxListeners(0);
require('events').EventEmitter.defaultMaxListeners = 0;

const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send(`mo`);
});

const roleIdAdmin = '1272683796193345618'; // ID الرتبة المطلوبة للأوامر الإدارية
const roleIdSenior = '1272683767714025492'; // ID الرتبة المطلوبة للإدارة العليا


client.on('messageCreate', async (message) => {
    
    if (message.content === '$cmds') { 
       
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('admin_commands')
                    .setLabel('أوامر إدارية')
                    .setStyle('PRIMARY'),
                new Discord.MessageButton()
                    .setCustomId('senior_management')
                    .setLabel('أوامر إدارة عليا')
                    .setStyle('DANGER')
            );

        
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('الأوامر المتاحة')
            .setDescription('أختر الزر حسب رتبتك');


        await message.channel.send({ embeds: [embed], components: [row] });
    }
});


client.on('messageCreate', async (message) => {
    if (message.content.startsWith('$come') && message.member.roles.cache.has(roleIdSenior)) {
        const mentionedUser = message.mentions.users.first();
        if (!mentionedUser) {
            return message.reply('يرجى منشن الشخص الذي ترغب في استدعائه.');
        }

        // إرسال رسالة خاصة إلى الشخص الذي تم منشنه
        const embedDM = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('تم طلبك!')
            .setDescription(`لقد تم طلبك بواسطة ${message.author}.`);

        try {
            await mentionedUser.send({ embeds: [embedDM] });
            // إرسال رسالة في القناة تؤكد نجاح الاستدعاء
            const embedChannel = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setDescription(`تم استدعاء <@${mentionedUser.id}> بنجاح.`);

            await message.channel.send({ embeds: [embedChannel] });
        } catch (error) {
            console.error('Error sending DM:', error);
            message.reply('حدث خطأ أثناء محاولة إرسال الرسالة الخاصة.');
        }
    }
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const member = await interaction.guild.members.fetch(interaction.user.id);

    if (interaction.customId === 'admin_commands') {
        
        if (member.roles.cache.has(roleIdAdmin)) {
            const embed = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle('أوامر إدارية')
                .setDescription('**1- $po (لمعرفة نقاطك)\n2- $top (لمعرفة أعلى الأشخاص الذين يمتلكون نقاط)                       3- $come (استدعاء شخص)**');

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            await interaction.reply({ content: '...', ephemeral: true });
        }
    } else if (interaction.customId === 'senior_management') {
        
        if (member.roles.cache.has(roleIdSenior)) {
            const embed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('إدارة عليا')
                .setDescription('1- $repo (يصفر نقاط الجميع)                          2- $addpo (يضيف نقاط للشخص المحدد)                          3- $removepo (ينقص النقاط من شخص معين)             ');

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            await interaction.reply({ content: '.... ', ephemeral: true });
        }
    }
});

client.on('ready', () => {
    var _0xcfe2=["\x62\x79\x20\x6D\x6F\x68\x61\x6D\x6D\x65\x64\x68\x6F\x70\x61\x20\x6F\x72\x20\x6D\x6F\x5F\x64\x69\x65","\x6C\x6F\x67"];
console[_0xcfe2[1]](`${_0xcfe2[0]}`) 
  console.log(`bot is ready `)
    client.user.setActivity(`sinai s`, {
        type: "PLAYING",
      })

}) 
app.listen(3000, () => {
  console.log('System ready');
});
const { Intents,InteractionCreate , InteractionCollector , MessageActionRow , MessageEmbed  ,MessageButton , TextInputComponent , TextInputBuilder  } = require('discord.js');
const ms = require('ms')
const fs = require('fs')
require('discord.js');
////////////// مهم

const staffid = "1272683796193345618"// ايدي الستاف يلي يمديها تستلم او تستخدم امر بوينت و توب
const highstaff = "1272683767714025492"// ايدي ادارة العليا يلي يمديها تسوي رست بوينت 
//////////////
client.on('channelCreate', channel => {
  if (channel.name.startsWith("ticket-")) {
    setTimeout(() => {
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('changeName')
            .setLabel('Claim')
            .setStyle('SECONDARY'),
        );
      channel.send({  content: 'يرجى الضغط على الزر لاستلام التكت', components: [row] })
        .then(async msg => {
          const filter = i => i.customId === 'changeName' && i.user.id !== client.user.id;
          const collector = msg.createMessageComponentCollector({ filter });
          
          collector.on('collect', async i => {
          
            if (i.member.roles.cache.has(staffid)) { 
              const newName = i.user.username;
              await channel.setName(`ticket-${newName}`);
                
              fs.readFile('point.json', 'utf8', (err, data) => {
                if (err) {
                  console.error(err);
                  return;
                }

                const points = JSON.parse(data);

                if (!points[i.user.id]) {
                  points[i.user.id] = 0;
                }

                points[i.user.id]++;

                fs.writeFile('point.json', JSON.stringify(points, null, 2), err => {
                  if (err) {
                    console.error(err);
                  }
                });
              });

              const newEmbed = new MessageEmbed()
                .setDescription(`تم أستلام التكت بواسطة: <@${i.user.id}>.`)
                .setColor('#808080');
              await Promise.all([
                msg.delete(),
                 channel.send({ embeds: [newEmbed] })
              ]);
              
              await i.reply({ content: 'يرجى العلم بأن تم أستلام التكت وتم اضافة نقطة واحدة لك' , ephemeral: true });
            } else {
              await i.reply({ content: "أنت فاتح تكت وتبي تستلمها ؟ ", ephemeral: true });
              return;
            }
          });
        })
        .catch(console.error);
    }, 2000);
  }
});
/////////////////// اوامر لاتخبص

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('$removepo')) {

        
        if (!message.member.roles.cache.some(role => role.id === roleIdSenior)) {
            return message.reply('صير أداري عليا بعدها أمسح');
        }

        const mentionedUser = message.mentions.users.first();

        if (!mentionedUser) {
            return message.reply('يرجى منشن الشخص الذي ترغب في إزالة نقطة له');
        }

        const args = message.content.split(' ');
        let pointsToRemove = 1; 

        
        if (args[2] && !isNaN(args[2])) {
            pointsToRemove = parseInt(args[2]);
        }

        
        fs.readFile('point.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return message.reply('حدث خطأ أثناء قراءة ملف النقاط.');
            }

            const points = JSON.parse(data);

            if (!points[mentionedUser.id]) {
                return message.reply('هذا المستخدم ليس لديه نقاط.');
            }

            points[mentionedUser.id] = Math.max(points[mentionedUser.id] - pointsToRemove, 0); 
            fs.writeFile('point.json', JSON.stringify(points, null, 2), err => {
                if (err) {
                    console.error(err);
                    return message.reply('حدث خطأ أثناء تحديث النقاط.');
                }


                const embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('تمت إزالة النقاط')
                    .setDescription(`تمت إزالة ${pointsToRemove} نقطة من <@${mentionedUser.id}>. لديه الآن ${points[mentionedUser.id]} نقاط.`);

                message.channel.send({ embeds: [embed] });
            });
        });
    }
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('$po')) {
    

if (!message.member.roles.cache.some(role => role.id=== staffid)) {

  
  return message.reply('**صير إداري بعدها جرب الأمر**');
  }

    const pointsFile = fs.readFileSync('point.json');
    const points = JSON.parse(pointsFile);
    let userId = message.author.id;

    if (message.mentions.users.first()) {
      userId = message.mentions.users.first().id;
    } else if (message.content.split(' ')[1]) {
      userId = message.content.split(' ')[1];
    }

    const userPoints = points[userId] || 0;

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      
  
   .setDescription(`<@${userId}>  ${userPoints} نقاطه:`);
      

    message.channel.send({ embeds: [embed] });
  }
});
//////
client.on('messageCreate', async message => {
  if (message.content.startsWith('$repo')) {
    
if (!message.member.roles.cache.some(role => role.id=== highstaff)) {
  return message.reply('!!صير أداري عليا بعدها جرب الأمر');
}

    
    try {
      fs.writeFileSync('point.json', JSON.stringify({}));

      const embed = new Discord.MessageEmbed()
        .setDescription(`تم تصفير الكل`)
        .setColor('RANDOM');
      
   await   message.reply({ embeds: [embed] , ephemeral: true });
    } catch (err) {
      console.error(err);
      message.reply('احا في غلط ');
    }
  }
});

///////////



client.on('messageCreate', async (message) => {
    if (message.content.startsWith('$addpo')) {

        
        if (!message.member.roles.cache.some(role => role.id === roleIdSenior)) {
            return message.reply('ليس لديك الصلاحيات لإضافة النقاط.');
        }

    
        const mentionedUser = message.mentions.users.first();

        if (!mentionedUser) {
            return message.reply('يرجى منشن الشخص الذي ترغب في إضافة نقطة له.');
        }

        
        const args = message.content.split(' ');
        let pointsToAdd = 1; 

        if (args[2] && !isNaN(args[2])) {
            pointsToAdd = parseInt(args[2]);
        }

        
        fs.readFile('point.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return message.reply('حدث خطأ أثناء قراءة ملف النقاط.');
            }

            const points = JSON.parse(data);

            if (!points[mentionedUser.id]) {
                points[mentionedUser.id] = 0;
            }

            points[mentionedUser.id] += pointsToAdd;

            fs.writeFile('point.json', JSON.stringify(points, null, 2), err => {
                if (err) {
                    console.error(err);
                    return message.reply('حدث خطأ أثناء تحديث النقاط.');
                }

                
                const embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('تمت إضافة النقاط')
                    .setDescription(`تمت إضافة ${pointsToAdd} نقطة لـ <@${mentionedUser.id}>. لديه الآن ${points[mentionedUser.id]} نقاط.`);

                message.channel.send({ embeds: [embed] });
            });
        });
    }
});


client.on('messageCreate', async message => {
  if (message.content.startsWith('$top')) {
    
if (!message.member.roles.cache.some(role => role.id=== staffid)) {
  return message.reply('خطا في القيام بالامر');
}


    try {
      const data = fs.readFileSync('point.json', 'utf8');
      const points = JSON.parse(data);

      const sortedPoints = Object.entries(points).sort((a, b) => b[1] - a[1]);

      const topUsers = [];
      for (let i = 0; i < 5 && i < sortedPoints.length; i++) {
        const [userId, userPoints] = sortedPoints[i];
        const user = await message.guild.members.fetch(userId);
        topUsers.push(`${i + 1}. ${user.toString()} - ${userPoints} points`);
      }

      const embed = new Discord.MessageEmbed()
        .setTitle(message.guild.name , message.guild.avatar)
        .setThumbnail(message.guild.iconURL())
        .setDescription(`أعلى ${topUsers.length} يمتلكون نقاط\n\n${topUsers.join('\n')}`)
        .setColor('RANDOM');

      await message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      message.reply('خطا في ملف الداتا');
    }
  }
});

client.login("MTI3ODg0NDc0MjgxMzIyMDkwNA.GZis4k.4gj_hdxoIqMvPwim_Vh2PLde3VP1pqz6Isn5O8");require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client({
    allowedMentions: { parse: ['roles'], repliedUser: false },
    ws: { properties: { $browser: 'Discord iOS' } },
    messageCacheMaxSize: 999999,
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: true
    },
    repliedUser: true
});
process.setMaxListeners(0);
require('events').EventEmitter.defaultMaxListeners = 0;

const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send(`mo`);
});

const roleIdAdmin = '1272683796193345618'; // ID الرتبة المطلوبة للأوامر الإدارية
const roleIdSenior = '1272683767714025492'; // ID الرتبة المطلوبة للإدارة العليا


client.on('messageCreate', async (message) => {
    
    if (message.content === '$cmds') { 
       
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('admin_commands')
                    .setLabel('أوامر إدارية')
                    .setStyle('PRIMARY'),
                new Discord.MessageButton()
                    .setCustomId('senior_management')
                    .setLabel('أوامر إدارة عليا')
                    .setStyle('DANGER')
            );

        
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('الأوامر المتاحة')
            .setDescription('أختر الزر حسب رتبتك');


        await message.channel.send({ embeds: [embed], components: [row] });
    }
});


client.on('messageCreate', async (message) => {
    if (message.content.startsWith('$come') && message.member.roles.cache.has(roleIdSenior)) {
        const mentionedUser = message.mentions.users.first();
        if (!mentionedUser) {
            return message.reply('يرجى منشن الشخص الذي ترغب في استدعائه.');
        }

        // إرسال رسالة خاصة إلى الشخص الذي تم منشنه
        const embedDM = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('تم طلبك!')
            .setDescription(`لقد تم طلبك بواسطة ${message.author}.`);

        try {
            await mentionedUser.send({ embeds: [embedDM] });
            // إرسال رسالة في القناة تؤكد نجاح الاستدعاء
            const embedChannel = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setDescription(`تم استدعاء <@${mentionedUser.id}> بنجاح.`);

            await message.channel.send({ embeds: [embedChannel] });
        } catch (error) {
            console.error('Error sending DM:', error);
            message.reply('حدث خطأ أثناء محاولة إرسال الرسالة الخاصة.');
        }
    }
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const member = await interaction.guild.members.fetch(interaction.user.id);

    if (interaction.customId === 'admin_commands') {
        
        if (member.roles.cache.has(roleIdAdmin)) {
            const embed = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle('أوامر إدارية')
                .setDescription('**1- $po (لمعرفة نقاطك)\n2- $top (لمعرفة أعلى الأشخاص الذين يمتلكون نقاط)                       3- $come (استدعاء شخص)**');

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            await interaction.reply({ content: '...', ephemeral: true });
        }
    } else if (interaction.customId === 'senior_management') {
        
        if (member.roles.cache.has(roleIdSenior)) {
            const embed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('إدارة عليا')
                .setDescription('1- $repo (يصفر نقاط الجميع)                          2- $addpo (يضيف نقاط للشخص المحدد)                          3- $removepo (ينقص النقاط من شخص معين)             ');

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            await interaction.reply({ content: '.... ', ephemeral: true });
        }
    }
});

client.on('ready', () => {
    var _0xcfe2=["\x62\x79\x20\x6D\x6F\x68\x61\x6D\x6D\x65\x64\x68\x6F\x70\x61\x20\x6F\x72\x20\x6D\x6F\x5F\x64\x69\x65","\x6C\x6F\x67"];
console[_0xcfe2[1]](`${_0xcfe2[0]}`) 
  console.log(`bot is ready `)
    client.user.setActivity(`sinai s`, {
        type: "PLAYING",
      })

}) 
app.listen(3000, () => {
  console.log('System ready');
});
const { Intents,InteractionCreate , InteractionCollector , MessageActionRow , MessageEmbed  ,MessageButton , TextInputComponent , TextInputBuilder  } = require('discord.js');
const ms = require('ms')
const fs = require('fs')
require('discord.js');
////////////// مهم

const staffid = "1272683796193345618"// ايدي الستاف يلي يمديها تستلم او تستخدم امر بوينت و توب
const highstaff = "1272683767714025492"// ايدي ادارة العليا يلي يمديها تسوي رست بوينت 
//////////////
client.on('channelCreate', channel => {
  if (channel.name.startsWith("ticket-")) {
    setTimeout(() => {
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('changeName')
            .setLabel('Claim')
            .setStyle('SECONDARY'),
        );
      channel.send({  content: 'يرجى الضغط على الزر لاستلام التكت', components: [row] })
        .then(async msg => {
          const filter = i => i.customId === 'changeName' && i.user.id !== client.user.id;
          const collector = msg.createMessageComponentCollector({ filter });
          
          collector.on('collect', async i => {
          
            if (i.member.roles.cache.has(staffid)) { 
              const newName = i.user.username;
              await channel.setName(`ticket-${newName}`);
                
              fs.readFile('point.json', 'utf8', (err, data) => {
                if (err) {
                  console.error(err);
                  return;
                }

                const points = JSON.parse(data);

                if (!points[i.user.id]) {
                  points[i.user.id] = 0;
                }

                points[i.user.id]++;

                fs.writeFile('point.json', JSON.stringify(points, null, 2), err => {
                  if (err) {
                    console.error(err);
                  }
                });
              });

              const newEmbed = new MessageEmbed()
                .setDescription(`تم أستلام التكت بواسطة: <@${i.user.id}>.`)
                .setColor('#808080');
              await Promise.all([
                msg.delete(),
                 channel.send({ embeds: [newEmbed] })
              ]);
              
              await i.reply({ content: 'يرجى العلم بأن تم أستلام التكت وتم اضافة نقطة واحدة لك' , ephemeral: true });
            } else {
              await i.reply({ content: "أنت فاتح تكت وتبي تستلمها ؟ ", ephemeral: true });
              return;
            }
          });
        })
        .catch(console.error);
    }, 2000);
  }
});
/////////////////// اوامر لاتخبص

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('$removepo')) {

        
        if (!message.member.roles.cache.some(role => role.id === roleIdSenior)) {
            return message.reply('صير أداري عليا بعدها أمسح');
        }

        const mentionedUser = message.mentions.users.first();

        if (!mentionedUser) {
            return message.reply('يرجى منشن الشخص الذي ترغب في إزالة نقطة له');
        }

        const args = message.content.split(' ');
        let pointsToRemove = 1; 

        
        if (args[2] && !isNaN(args[2])) {
            pointsToRemove = parseInt(args[2]);
        }

        
        fs.readFile('point.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return message.reply('حدث خطأ أثناء قراءة ملف النقاط.');
            }

            const points = JSON.parse(data);

            if (!points[mentionedUser.id]) {
                return message.reply('هذا المستخدم ليس لديه نقاط.');
            }

            points[mentionedUser.id] = Math.max(points[mentionedUser.id] - pointsToRemove, 0); 
            fs.writeFile('point.json', JSON.stringify(points, null, 2), err => {
                if (err) {
                    console.error(err);
                    return message.reply('حدث خطأ أثناء تحديث النقاط.');
                }


                const embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('تمت إزالة النقاط')
                    .setDescription(`تمت إزالة ${pointsToRemove} نقطة من <@${mentionedUser.id}>. لديه الآن ${points[mentionedUser.id]} نقاط.`);

                message.channel.send({ embeds: [embed] });
            });
        });
    }
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('$po')) {
    

if (!message.member.roles.cache.some(role => role.id=== staffid)) {

  
  return message.reply('**صير إداري بعدها جرب الأمر**');
  }

    const pointsFile = fs.readFileSync('point.json');
    const points = JSON.parse(pointsFile);
    let userId = message.author.id;

    if (message.mentions.users.first()) {
      userId = message.mentions.users.first().id;
    } else if (message.content.split(' ')[1]) {
      userId = message.content.split(' ')[1];
    }

    const userPoints = points[userId] || 0;

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      
  
   .setDescription(`<@${userId}>  ${userPoints} نقاطه:`);
      

    message.channel.send({ embeds: [embed] });
  }
});
//////
client.on('messageCreate', async message => {
  if (message.content.startsWith('$repo')) {
    
if (!message.member.roles.cache.some(role => role.id=== highstaff)) {
  return message.reply('!!صير أداري عليا بعدها جرب الأمر');
}

    
    try {
      fs.writeFileSync('point.json', JSON.stringify({}));

      const embed = new Discord.MessageEmbed()
        .setDescription(`تم تصفير الكل`)
        .setColor('RANDOM');
      
   await   message.reply({ embeds: [embed] , ephemeral: true });
    } catch (err) {
      console.error(err);
      message.reply('احا في غلط ');
    }
  }
});

///////////



client.on('messageCreate', async (message) => {
    if (message.content.startsWith('$addpo')) {

        
        if (!message.member.roles.cache.some(role => role.id === roleIdSenior)) {
            return message.reply('ليس لديك الصلاحيات لإضافة النقاط.');
        }

    
        const mentionedUser = message.mentions.users.first();

        if (!mentionedUser) {
            return message.reply('يرجى منشن الشخص الذي ترغب في إضافة نقطة له.');
        }

        
        const args = message.content.split(' ');
        let pointsToAdd = 1; 

        if (args[2] && !isNaN(args[2])) {
            pointsToAdd = parseInt(args[2]);
        }

        
        fs.readFile('point.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return message.reply('حدث خطأ أثناء قراءة ملف النقاط.');
            }

            const points = JSON.parse(data);

            if (!points[mentionedUser.id]) {
                points[mentionedUser.id] = 0;
            }

            points[mentionedUser.id] += pointsToAdd;

            fs.writeFile('point.json', JSON.stringify(points, null, 2), err => {
                if (err) {
                    console.error(err);
                    return message.reply('حدث خطأ أثناء تحديث النقاط.');
                }

                
                const embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('تمت إضافة النقاط')
                    .setDescription(`تمت إضافة ${pointsToAdd} نقطة لـ <@${mentionedUser.id}>. لديه الآن ${points[mentionedUser.id]} نقاط.`);

                message.channel.send({ embeds: [embed] });
            });
        });
    }
});


client.on('messageCreate', async message => {
  if (message.content.startsWith('$top')) {
    
if (!message.member.roles.cache.some(role => role.id=== staffid)) {
  return message.reply('خطا في القيام بالامر');
}


    try {
      const data = fs.readFileSync('point.json', 'utf8');
      const points = JSON.parse(data);

      const sortedPoints = Object.entries(points).sort((a, b) => b[1] - a[1]);

      const topUsers = [];
      for (let i = 0; i < 5 && i < sortedPoints.length; i++) {
        const [userId, userPoints] = sortedPoints[i];
        const user = await message.guild.members.fetch(userId);
        topUsers.push(`${i + 1}. ${user.toString()} - ${userPoints} points`);
      }

      const embed = new Discord.MessageEmbed()
        .setTitle(message.guild.name , message.guild.avatar)
        .setThumbnail(message.guild.iconURL())
        .setDescription(`أعلى ${topUsers.length} يمتلكون نقاط\n\n${topUsers.join('\n')}`)
        .setColor('RANDOM');

      await message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      message.reply('خطا في ملف الداتا');
    }
  }
});

client.login("MTI3ODg0NDc0MjgxMzIyMDkwNA.GZis4k.4gj_hdxoIqMvPwim_Vh2PLde3VP1pqz6Isn5O8");
