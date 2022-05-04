const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	}
})

async function generateHash(password) {
	return bcrypt.hash(password, 12);
}

userSchema.pre('save', function preSave(next) {
	const user = this;
	if (user.isModified('password')) {
		return generateHash(user.password)
			.then((hash) => {
				user.password = hash
				return next()
			})
			.catch((error) => {
				return next(error)
			})
	}
	return next()
})

userSchema.methods.comparePassword = async (candidatePassword) => {
	return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
