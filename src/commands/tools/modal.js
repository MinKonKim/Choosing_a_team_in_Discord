const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("modal")
    .setDescription("Return a modal."),
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId(`fav-color`)
      .setTitle(`당신의 티어를 입력해 주세요!`);

    const textInput = new TextInputBuilder()
      .setCustomId("favColorInput")
      .setLabel(`Why is your favorite color?`)
      .setRequired(true) // 이 부분을 입력해야만 한다.
      .setStyle(TextInputStyle.Short); // 입력 형식

    modal.addComponents(new ActionRowBuilder().addComponents(textInput));

    await interaction.showModal(modal);
  },
};
