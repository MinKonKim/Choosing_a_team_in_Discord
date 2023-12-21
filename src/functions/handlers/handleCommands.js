/* eslint-disable no-unused-vars */
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const { clientId, guildId, token } = require(`../../../config.json`);

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolers = fs.readdirSync("./src/commands");
    for (const folder of commandFolers) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command, command.data.toJSON());
        console.log(
          `Command : ${command.data.name} has been passed through th handler`
        );
      }
    }

    const rest = new REST({ version: "9" }).setToken(token);
    try {
      console.log("Started refreshing application (/) commands.");

      await rest.put(
        Routes.applicationGuildCommands(`${clientId},${guildId}`),
        {
          body: client.commandArray,
        }
      );

      console.log("Successfully refreshed application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  };
};
