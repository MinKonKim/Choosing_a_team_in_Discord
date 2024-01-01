const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans the member provided")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member you'd like to ban")
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
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reason provided.";

    await member
      .ban({
        deleteMessageDays: 1,
        reason: reason,
      })
      .catch(console.error);

    await interaction.reply({
      content: `Banned ${user.tag} successfully`,
    });
  },
};
