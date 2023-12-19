const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pang")
    .setDescription("Bot will give you money"),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
