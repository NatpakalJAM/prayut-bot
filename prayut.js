const Discord = require('discord.js');
const botConfig = require('./config/config.json');
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

// botPrayut.on('message', message => {
//     if (message.author.bot == true) return; // ถ้าเป็นbot
//     if (message.author.id !== botConfig.PrayutID) return; // ถ้าไม่ใช่ประยุทธ
//     message.guild.channels.get(botConfig.ChannelID).send(message.content);
// });

botPrayut.on('messageUpdate', (oldMessage, newMessage) => {
    if (newMessage.author.bot == true) return; // ถ้าเป็นbot
    if (newMessage.author.id !== botConfig.PrayutID) return; // ถ้าไม่ใช่ประยุทธ
    newMessage.guild.channels.get(botConfig.ChannelID).send('```ข้อความเก่า: ' + oldMessage.content + '\nข้อความใหม่: ' + newMessage.content + '```');
});

botPrayut.on('messageDelete', message => {
    if (message.author.bot == true) return; // ถ้าเป็นbot
    if (message.author.id !== botConfig.PrayutID) return; // ถ้าไม่ใช่ประยุทธ
    message.guild.channels.get(botConfig.ChannelID).send('```ข้อความที่ลบ: ' + message.content + '```');
});

botPrayut.login(botConfig.TOKEN);