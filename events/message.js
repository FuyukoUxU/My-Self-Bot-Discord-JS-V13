const prefix = global.config.prefix; 
const allowedIds = require('../allowed.json')
const strings = require('../strings.json')
const utils = require('../utils')
module.exports = (client, message) => {
    if (message.content.indexOf(prefix) == 0) {
        if (message.author.id == client.user.id) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const cmd = client.commands.get(command);
        if (!cmd) return;
        if (!global.config.allowed.includes(message.author.id) && global.config.allowed.length > 0) {message.channel.send(strings.permissionDenied); utils.log(`${message.author.tag} đang cố gắng chạy lệnh '${message.content}' nhưng không được chấp nhận`); return; }
        cmd.run(client, message, args);
        return
    }
};