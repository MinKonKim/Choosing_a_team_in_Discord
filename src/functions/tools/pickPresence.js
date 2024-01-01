const { ActivityType } = require("discord.js");
module.exports = (client) => {
  client.pickPresence = async (options) => {
    const options = [
      {
        type: ActivityType.Watching,
        text: "over Fusion Empire",
        status: "online",
      },
      {
        type: ActivityType.Listening,
        text: "for commands",
        status: "idle",
      },
      {
        type: ActivityType.Playing,
        text: "with Discord.js",
        status: "dnd",
      },
    ];
    const option = Math.floor(Math.random() * options.length);

    await client.user
      .setPresence({
        activities: [
          {
            name: options[option].text,
            type: options[option].type,
          },
        ],
        status: options[option].status,
      })
      .catch(console.error);
  };
};
