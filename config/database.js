const dotenv = require('dotenv')
dotenv.config()

module.exports = {
	MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING
}
