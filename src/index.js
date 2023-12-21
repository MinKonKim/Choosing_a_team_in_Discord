const fs = require("node:fs"); // commands 디렉토리를 읽고 명령 파일을 식별
const path = require("node:path"); // Node의 기본경로 유틸리티 모듈, 파일 및 디렉토리에 액세스하기 위한 경로
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { token } = require("../config.json");
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Collection클래스는 JavaScript의 기본을 확장합니다. 실행할 명령을 효율적으로 저장 및 검색
client.commands = new Collection();
client.commandArray = [];

const functionFolderPath = path.join(__dirname, "functions");
const functionFolders = fs.readdirSync(functionFolderPath);

for (const folder of functionFolders) {
  const folderPath = path.join(functionFolderPath, folder);
  const functionFiles = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

client.handleEvents();
client.handleCommands();
// Log in to Discord with your client's token
client.login(token);
