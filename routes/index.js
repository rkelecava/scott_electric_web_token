var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');


router.get('/tokenDecrypt', function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

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

	return res.json({token: user.generateJWT(req.query.userId, req.query.username)});
});



module.exports = router;
