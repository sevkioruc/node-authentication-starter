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

userSchema.pre('save', function (next) {
	var user = this;
	if (user.isModified('password')) {
		bcrypt.genSalt(12, function (err, salt) {
			if (err) {
				return next(err)
			}
			bcrypt.hash(user.password, salt, null, function (err, hash) {
				if (err) {
					return next(err)
				}
				user.password = hash
				next()
			})
		})
	} else {
		return next()
	}
})

userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
