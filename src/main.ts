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
var KommuneBotServer = require('./server/server').KommuneBotServer;
var server = new KommuneBotServer();
server.createServer(__dirname + "/client");
server.start();