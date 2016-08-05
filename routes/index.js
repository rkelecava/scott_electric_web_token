var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');


router.get('/tokenDecrypt', function(req, res, next) {
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token = req.headers.authorization.split(' ')[1];
    } else {
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
    }


	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, process.env.SCOTT_ELECTRIC_SECRET, function(err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
      		} else {
      			// if everything is good, save to request for use in other routes
      			return res.json(decoded);
      		}
    	});

	} else {
		// if there is no token
    	// return an error
    	return res.status(403).send({
    		success: false,
    		message: 'No token provided.'
    	});
	}
});


router.get('/token', function(req, res, next) {
	var user = new User();

	var userId = req.query.userId || req.body.userId;
	var username = req.query.username || req.body.username;
	var isAdmin = req.query.isAdmin || req.body.isAdmin;
	var company = req.query.company || req.body.company;
	var title = req.query.title || req.body.title;
	var email = req.query.email || req.body.email;

	var myUser = {
		userId: userId,
		username: username,
		isAdmin: isAdmin,
		company: company,
		title: title,
		email: email
	};

	return res.json({token: user.generateJWT(myUser)});
});



module.exports = router;
