const router = require('express').Router()
const authContoller = require('../controllers/auth')
const passport = require('passport');

module.exports = app => {
	router.post('/register', authContoller.register)
	router.post('/login', passport.authenticate('local', { session: false }), authContoller.login)
	router.get('/whoami', passport.authenticate('jwt', { session: false }), authContoller.whoami)

	app.use('/v1/auth', router)
}
