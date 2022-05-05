const router = require('express').Router()
const authContoller = require('../controllers/auth')
const passport = require('passport');

const { validateUsername } = require('../middlewares/usernameValidator')
const { validatePassword } = require('../middlewares/passwordValidator')

module.exports = app => {
	router.post('/register', validateUsername, validatePassword, authContoller.register)
	router.post('/login', passport.authenticate('local', { session: false }), authContoller.login)
	router.get('/whoami', passport.authenticate('jwt', { session: false }), authContoller.whoami)

	app.use('/v1/auth', router)
}
