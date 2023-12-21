module.exports = {
  name: "interactionCreate",
  once: true,
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
          content: `잘못된 명령어 입니다.`,
          ephemeral: true,
        });
      }
    }
  },
};
