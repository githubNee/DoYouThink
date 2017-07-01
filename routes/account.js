var express = require('express');
var router = express.Router();
var config = require('../config.js');

router.route('/login')
.post((req, res, next) => {
	if (req.body['password'] === undefined) {
		res.sendStatus(400);
	} else {
			password = req.body['password'];
		if (password === config.admin.password) {
			res.sendStatus(200);
		} else {
			res.sendStatus(401);
		}
	}
});

module.exports = router;