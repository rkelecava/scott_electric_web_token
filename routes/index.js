var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/token', function(req, res, next) {
	var user = new User();

	return res.json({token: user.generateJWT()});
});

module.exports = router;
