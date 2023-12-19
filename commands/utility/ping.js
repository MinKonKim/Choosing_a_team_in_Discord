const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Bot will give you money"),
  async execute(interaction) {
    await interaction.reply({ content: "Secret Pong!", ephemeral: true });
  },
};
