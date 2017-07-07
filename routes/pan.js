var express = require('express');
var router = express.Router();
var config = require('../config.js')
var util = require('../util/util.js')

router.route('/public')
.get((req, res, next) => {
	var url = 'http://rsf.qbox.me/list?bucket=' + config.bucket.public;
	util.qiniu_request(url, "POST", function(body) {
		var ret = JSON.parse(body);
		for (var index = 0; index < ret['items'].length; index++ ) {
			ret['items'][index]['link'] = config.domain.public + '/' + ret['items'][index]['key'];

			var fsize = ret['items'][index]['fsize'];
			if (fsize < 1024)
				ret['items'][index]['fsize'] = fsize.toFixed(2).toString() + 'B';
			else if (fsize < 1024 * 1024)
				ret['items'][index]['fsize'] = (fsize / 1024).toFixed(2).toString() + 'KB';
			else
				ret['items'][index]['fsize'] = (fsize / 1024 / 1024).toFixed(2).toString() + 'MB';
		}
		res.send(ret);
	});
});

router.route('/private')
.get((req, res, next) => {
	var token = req.headers.authorization;
	if (token === undefined || token !== util.getToken()) {
		res.sendStatus(401);
	} else {
		var url = 'http://rsf.qbox.me/list?bucket=' + config.bucket.private;
			util.qiniu_request(url, "POST", function(body) {
				var ret = JSON.parse(body);
				for (var index = 0; index < ret['items'].length; index++ ) {
					ret['items'][index]['link'] = config.domain.private + '/' + ret['items'][index]['key'];

					var fsize = ret['items'][index]['fsize'];
					if (fsize < 1024)
						ret['items'][index]['fsize'] = fsize.toFixed(2).toString() + 'B';
					else if (fsize < 1024 * 1024)
						ret['items'][index]['fsize'] = (fsize / 1024).toFixed(2).toString() + 'KB';
					else
						ret['items'][index]['fsize'] = (fsize / 1024 / 1024).toFixed(2).toString() + 'MB';
				}
				res.send(ret);
			});
	}
});

module.exports = router;