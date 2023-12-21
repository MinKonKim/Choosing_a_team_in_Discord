const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Return my Ping"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const newMessage = `API Latency : ${client.ws.ping}\n Client Ping:${
      message.createdTimestap - interaction.createdTimestap
    }`;
    await interaction.editReply({
      content: newMessage,
    });
  },
};
