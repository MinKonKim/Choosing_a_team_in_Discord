const { readdirSync } = requir("fs");

module.exports = (client) => {
  client.handleComponents = async () => {
    const componentFolders = readdirSync(`./src/components`);
    for (const folder of componentFolders) {
      const componentFiles = readdirSync(`./src/components/${folder}`).filter(
        (file) => file.endsWith(".js")
      );

      switch (folder) {
        case "buttons":
          for (const file of componentFiles) {
            const button = require(`../../components/button/${folder}/${file}`);
          }

          break;

        default:
          break;
      }
    }
  };
};
