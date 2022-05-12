const utils = require('../utils');

module.exports = client => {

    client.user.setActivity("Create FuyukoUxU", {type: "LISTENING"});

    utils.log(`Logged in as ${client.user.tag} !`);

};