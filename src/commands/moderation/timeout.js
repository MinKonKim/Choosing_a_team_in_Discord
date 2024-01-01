const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout the member provided")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member you'd like to timeout")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("The amount of minutes to timeout a member for. ")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Ther reason for kicking the member provided.")
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("target");
    let reason =
      interaction.options.getString("reason") || "No reason provided";
    let time = interaction.options.getInteger("time");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reason provided.";
    if (!time) time = null;
    await member
      .timeout(time == null ? null : time * 60 * 1000, reason)
      .catch(console.error);

    await interaction.reply({
      content: `Kicked ${user.tag} successfully!`,
    });
  },
};
