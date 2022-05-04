const User = require('../models/user')

exports.register = async (req, res) => {
	try {
		const existingUsername = await User.findOne({ username: req.body.username })
		if (existingUsername) {
			return res.status(400).send({ msg: 'username must be unique' })
		}

		const user = new User({
			username: req.body.username,
			password: req.body.password
		})

		await user.save()
		res.status(201).send({ msg: 'user was created successfully' })
	} catch {
		res.status(500).send({ msg: 'some error occured while user creating' })
	}
}

exports.login = async (req, res) => {
}
