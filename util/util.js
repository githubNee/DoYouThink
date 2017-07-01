var qiniu = require('./qiniu.js');
var config = require('../config.js');
var request = require('request')

function qiniu_request(url, method, callback) {
	var token = qiniu.generateAccessToken(config.mac, url, "");
	var options = {
		uri: url,
		method: method,
		headers: {
			authorization: token
		}
	}
	request(options, function (error, response, body) {
		callback(body);
	});
}

module.exports = {
	qiniu_request: qiniu_request
}