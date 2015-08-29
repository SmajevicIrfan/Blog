var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var User = new Schema({
	username  : { type: String, required: true, unique: true },
	password  : { type: String, required: true },
	email	  : { type: String, required: true, unique: true },
	avatar	  : { type: String, default: 'default-avatar.jpg' },
	created	  : { type: Date, default: Date.now },
	crewMember: { type: Boolean, default: false }
});

User.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

User.methods.validatePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

var UserModel = mongoose.model('User', User);

module.exports = UserModel;