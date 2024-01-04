const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Balance = require("../../schemas/balance");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("pay")
    .setDescription("유저가 일정량 지불한다.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user you'd like to view the balance of.")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount you would like to send. ")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const userStoredBalance = await client.fetchBalance({
      userId: interaction.user.id,
      guildId: interaction.guild.id,
    });
    const amount = interaction.options.getNumber("amount");
    const selectedUser = interaction.options.getUser("target");

    if (selectedUser.bot || selectedUser.id == interaction.user.id)
      return await interaction.reply({
        content: `자신이나 봇에게 돈을 보낼 수 없습니다.`,
        ephermeral: true,
      });
    else if (amount < 1.0)
      return await interaction.reply({
        content: `명시된 금액은 1달러 이상이어야 합니다.`,
        ephermeral: true,
      });
    else if (amount > userStoredBalance.amount)
      return await interaction.reply({
        content: `해당 금액을 보낼 만큼 충분한 자금이 없습니다.`,
        ephermeral: true,
      });

    const selectedUserBalance = await client.fetchBalance(
      selectedUser.id,
      interaction.guild.id
    );

    amout = await client.toFixedNumber(amount);

    await Balance.findOneAndUpdate(
      {
        _id: userStoredBalance._id,
      },
      {
        balance: await client.toFixedNumber(userStoredBalance.balance - amount),
      }
    );
    await Balance.findOneAndUpdate(
      {
        _id: selectedUserBalance._id,
      },
      {
        balance: await client.toFixedNumber(
          selectedUserBalance.balance + amount
        ),
      }
    );

    await interaction.reply({
      content: `${amount}$ 가 ${selectedUser}에게 송금됨.`,
      ephermeral: true,
    });
  },
};
