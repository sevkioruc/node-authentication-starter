const mongoose = require('mongoose')
const { MONGODB_CONNECTION_STRING } = require('./config/database')

mongoose.connect(MONGODB_CONNECTION_STRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log('Database connection established.')
	})
	.catch((err) => {
		console.log('Database connection failed.')
	})

module.exports = mongoose.connection
