const { readdirSync } = require("fs");

const ascii = require("ascii-table");

// Create a new Ascii table
let table = new ascii("Comandos");
table.setHeading("Comandos", "Status do carregamento");

module.exports = (client) => {

    //Ler cada comando em outras pastas
    readdirSync("./commands/").forEach(dir => {
        // Filter so we only have .js command files
        
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    
        // Loop over the commands, and add all of them to a collection
        // If there's no name found, prevent it from returning an error,
        // By using a cross in the table we made.
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '😺');
            } else {
                table.addRow(file, `😾  -> Não está funcionando.`);
                continue;
            }
    
        }
    });
    // Log the table
    console.log(table.toString());
}