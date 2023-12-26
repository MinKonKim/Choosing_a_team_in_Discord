module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `잘못된 명령어 입력함.`,
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error("There is no code for this button.");

      try {
        await button.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.isSelectMenu()) {
      const { selectMenu } = interaction;
      const menu = selectMenu.get(customId);
      if (!menu) return new Error("There is no code for this select menu.");

      try {
        await menu.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
