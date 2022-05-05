const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.register = async (req, res) => {
	try {
		const existingUsername = await User.findOne({ username: req.body.username })
		if (existingUsername) {
			return res.status(400).send({ msg: 'username must be unique' })
		}

		const user = new User({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email
		})

		await user.save()
		res.status(201).send({ msg: 'user was created successfully' })
	} catch {
		res.status(500).send({ msg: 'some error occured while user creating' })
	}
}

exports.login = async (req, res, next) => {
	try {
		const token = jwt.sign(
			{
				userId: req.user.id
			},
			config.JWT_SECRET,
			{ expiresIn: '24h' }
		)
		return res.json({ jwt: token })
	} catch (err) {
		return next(err)
	}
}

exports.whoami = (req, res, next) => {
	return res.json({ username: req.user.username })
}
