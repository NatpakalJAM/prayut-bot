const Discord = require('discord.js');
const botConfig = require('./config.json');
const botPrayut = new Discord.Client();

botPrayut.on('ready', () => {
    botPrayut.user.setStatus('online');
    botPrayut.user.setPresence({
        game: {
            name: botConfig.NAME,
            type: 'Watching'
        }
    });

});

botPrayut.on('message', message => {
    if (message.author.bot == true) return; // ถ้าเป็นbot
    var messageRecsive = message.content;
    var messageReply = '';
    if (messageRecsive.match(/^!say /)) {
        message.delete();
        messageReply = messageRecsive.replace('!say ', '');
        message.channel.send(messageReply);
    }
});

botPrayut.on('messageUpdate', (oldMessage, newMessage) => {
    if (newMessage.author.bot == true) return; // ถ้าเป็นbot
    if (newMessage.author.id !== botConfig.PrayutID) return; // ถ้าไม่ใช่ประยุทธ
    avatar = 'https://cdn.discordapp.com/avatars/' + newMessage.author.id + '/' + newMessage.author.avatar + '.jpg'
    newMessage.guild.channels.get(botConfig.ChannelID).send({
        embed: {
            author: {
                name: newMessage.author.username,
                icon_url: avatar,
            },
            color: 0x1D8A2C,
            title: botConfig.NAME + ' แก้ไข message!!',
            fields: [{
                    name: 'message เก่า',
                    value: oldMessage.content
                },
                {
                    name: 'message ที่แก้ไข',
                    value: newMessage.content
                }
            ],
            timestamp: newMessage.mentions._client.readyAt,
            footer: {
                text: 'by ' + botPrayut.user.username
            }
        }
    });
});

botPrayut.on('messageDelete', message => {
    if (message.author.bot == true) return; // ถ้าเป็นbot
    if (message.author.id !== botConfig.PrayutID) return; // ถ้าไม่ใช่ประยุทธ
    msg = message.content;
    avatar = 'https://cdn.discordapp.com/avatars/' + message.author.id + '/' + message.author.avatar + '.jpg'
    attachment = (message.attachments).array();
    if (msg != '' && attachment.length <= 0) {
        message.guild.channels.get(botConfig.ChannelID).send({
            embed: {
                author: {
                    name: message.author.username,
                    icon_url: avatar,
                },
                color: 0xCE1D00,
                title: botConfig.NAME + ' ลบ message!!',
                fields: [{
                    name: 'message ที่ลบ',
                    value: msg,
                    inline: true
                }],
                timestamp: message.mentions._client.readyAt,
                footer: {
                    text: 'by ' + botPrayut.user.username
                }
            }
        });
    } else if (attachment.length > 0) {
        fileName = attachment[0].filename;
        attachment = attachment[0].proxyURL;
        fields = [];
        if (msg != '') {
            fields.push({
                name: 'message และ image ที่ลบ',
                value: msg,
                inline: true
            });
        } else if (msg == '') {
            fields.push({
                name: 'image ที่ลบ',
                value: fileName
            });
        }
        message.guild.channels.get(botConfig.ChannelID).send({
            embed: {
                author: {
                    name: message.author.username,
                    icon_url: avatar,
                },
                color: 0xCE1D00,
                title: botConfig.NAME + ' ลบ message!!',
                fields: fields,
                image: {
                    url: attachment,
                },
                timestamp: message.mentions._client.readyAt,
                footer: {
                    text: 'by ' + botPrayut.user.username
                }
            }
        });
    }
});

botPrayut.login(botConfig.TOKEN);