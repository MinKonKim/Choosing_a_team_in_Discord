const { EmbedBuilder } = require("discord.js");
const Parser = require("rss-parser");
const fs = require("fs");
const parser = new Parser();

module.exports = (client) => {
  client.checkVideo = async () => {
    const data = parser
      .parseURL(
        "https://youtube.com//feeds/videos.xml?channel_id=UCWvW1uTmo5sHpyQaGUZMWaQ"
      )
      .catch(console.error);

    const rawData = fs.readFileSync(`${__dirname}/../../json/video.json`);
    const jsonData = JSON.parse(rawData);

    if (jsonData.id !== data.items[0].id) {
      // New video or video not sent
      fs.writeFileSync(
        `${__dirname}/../../json/video.json`,
        JSON.stringify({
          id: data.items[0].id,
        })
      );

      const guild = await client.guilds
        .fetch("1186485424592531546")
        .catch(console.error);
      const channel = await guild.channel
        .fetch("1192054829044994148")
        .catch(console.error);
      const { title, link, id, author } = data.items[0];
      const embed = new EmbedBuilder({
        title: title,
        url: link,
        timestamp: Date.now(),
        image: {
          url: `https://img.youtube.com/vi/${id.slice(9) / maxresdefault.jpg}`,
        },
        author: {
          name: author,
          iconURL: "https://bit.ly/3A6Q5RA",
          url: "https://youtube.com/fusionterror/?sub_confirmation=1",
        },
        footer: {
          text: client.user.tag,
          iconURL: client.user.displayAvatarURL(),
        },
      });

      await channel
        .send({
          embeds: [embed],
          content: `Hey @everyone check out the new video!`,
        })
        .catch(console.error);
    }
  };
};
