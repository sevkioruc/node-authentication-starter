const router = require('express').Router()
const authContoller = require('../controllers/auth')

module.exports = app => {
	router.post('/register', authContoller.register)
	router.post('/login', authContoller.login)

	app.use('/v1/auth', router)
}
