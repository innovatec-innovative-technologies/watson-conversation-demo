// Load environment from .env file
var dotenv = require('dotenv');
const result = dotenv.config({
    silent: true
});

if (result.error) {
    throw result.error
}
console.log(result.parsed);

// Create and start the server
console.log("Creating and starting the server");
var KommuneBotServer = require('./server/dist/server').KommuneBotServer;
var server = new KommuneBotServer();
let clientFolderPath = process.cwd() + "/client";
server.init(clientFolderPath);
server.start();