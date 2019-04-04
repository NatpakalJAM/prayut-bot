# prayut-bot
> Before perfect Prayut สำหรับแกล้ง ประยุทธ

<a target="_blank" href="http://nodejs.org/download/" title="Node version"><img src="https://img.shields.io/badge/node.js-%3E=_6.0-green.svg"></a>

## setup

1. ลง [Node.js](https://nodejs.org/download/) ก่อนนะจ๊ะ เดี๋ยวrunไม่ได้

2. โหลดเป็นzip ไปแตกไฟล์

3. cmd เข้าไปที่project

4. ลง package

```
$ npm install
```

5. แก้ config นิดหน่อยที่ไฟล์ `config.json`

```
"TOKEN": "bot_token",
"PrayutID": "ไอดีประยูทธ",
"ChannelID": "channel_ที่ต้องการให้บอทเขียน",
"NAME": "ชื่อที่watching"
```

## start bot

```
$ node prayut.js
```
