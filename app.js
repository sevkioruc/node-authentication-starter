const express = require('express')

require('./database-connection')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
require('./routes/auth')(app)

module.exports = app
