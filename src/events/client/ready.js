const { Events } = require("discord.js");
module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Ready!!! ${client.user.tag} is logged in and online`);
  },
};