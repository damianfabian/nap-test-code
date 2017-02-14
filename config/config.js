var path = require('path');
var rootPath = path.normalize(__dirname + '/../');
var ENV = process.env.NODE_ENV || 'development'
var IP = process.env.NODE_IP || 'localhost'
var PORT = process.env.NODE_PORT || 3000
var API_URL = 'http://' + IP + (PORT ? ":" + PORT : null)

module.exports = {
    DEVELOPMENT: "development",
    PRODUCTION: "production",
	ROOT: rootPath,
    ENV: ENV,
	PORT: PORT,
    IP: IP,
    API_URL
};