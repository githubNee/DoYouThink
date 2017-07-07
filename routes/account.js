var express = require('express');
var router = express.Router();
var config = require('../config.js');
var token_helper = require('../util/util.js');

router.route('/login')
.post((req, res, next) => {
	if (req.body['password'] === undefined) {
		res.sendStatus(400);
	} else {
			password = req.body['password'];
		if (password === config.admin.password) {
			var token = token_helper.getToken();
			res.send(token);
		} else {
			res.sendStatus(401);
		}
	}
});

module.exports = router;