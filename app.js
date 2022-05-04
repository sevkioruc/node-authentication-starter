const express = require('express')

require('./database-connection')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

module.exports = app
