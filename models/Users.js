var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema();

UserSchema.methods.generateJWT = function (myUser) {

	// set expiration to 1 day
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 1);

	return jwt.sign({
		success: true,
		userId: myUser.userId,
		username: myUser.username,
		isAdmin: myUser.isAdmin,
		company: myUser.company,
		title: myUser.title,
		email: myUser.email,
		exp: parseInt(exp.getTime() / 1000),
	}, process.env.SCOTT_ELECTRIC_SECRET);
};

mongoose.model('User', UserSchema);