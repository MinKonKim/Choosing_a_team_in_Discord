const fs = require("node:fs"); // commands 디렉토리를 읽고 명령 파일을 식별
const path = require("node:path"); // Node의 기본경로 유틸리티 모듈, 파일 및 디렉토리에 액세스하기 위한 경로
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { DISCORD_TOKEN } = require("./config.json");

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Collection클래스는 JavaScript의 기본을 확장합니다. 실행할 명령을 효율적으로 저장 및 검색
client.commands = new Collection();
client.cooldown = new Collection();

const foldersPath = path.join(__dirname, "commands");
// 디렉토리 경로를 읽고 현재 포함된 모든 폴더 이름의 배열을 반환합니다.
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  // 올바른 명령이 식별되면 남은 작업은 명령의 .execute()메소드를 호출하고
  // interarction 변수를 인수로 사용합니다. 문제가 발생할 경우 오류를 포착하여 콘솔에 기록하세요.
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
  console.log(interaction);
});

// 클라이언트가 준비되면 이 코드를 실행합니다(한 번만).
// `client: Client<boolean>`과 `readyClient: Client<true>`의 구별은 TypeScript 개발자에게 중요합니다.
// 일부 속성을 nullable이 아닌 것으로 만듭니다.
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(DISCORD_TOKEN);
