var express = require('express');
var router = express.Router();
var config = require('../config.js')
var util = require('../util/util.js')

router.route('/public')
.get((req, res, next) => {
	var url = 'http://rsf.qbox.me/list?bucket=' + config.bucket.public;
	util.qiniu_request(url, "POST", function(body) {
		var ret = JSON.parse(body);
		for (var index = 0; index < ret['items'].length; index++ )
			ret['items'][index]['link'] = config.domain.public + '/' + ret['items'][index]['key'];
		res.send(ret);
	});
});

router.route('/private')
.get((req, res, next) => {
	var url = 'http://rsf.qbox.me/list?bucket=' + config.bucket.private;
	util.qiniu_request(url, "POST", function(body) {
		res.send(body);
	});
});

module.exports = router;