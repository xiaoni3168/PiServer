var fs = require('fs');
var colors = require('colors');
var express = require('express');
var app = express();
// req.connection.remoteAddress 访问设备的IP
// req.headers['user-agent']
var resourceServer = 'http://192.168.2.107:1992/'
fs.stat(__dirname + '/log', function(err, stats) {
	if(!stats) {
		fs.mkdirSync(__dirname + '/log');
	}
});

app.get('/home', function(req, res) {
	visitLog(req);
	res.send('Hello world');
});

app.get('/hero', function(req, res) {
	visitLog(req);
	res.send(fresourceServer + 'json/hero.json');
});

var visitLog = function(req) {
	log('[Visit Time]: ' + new Date().format(true));
	log('[Visit URL]: ' + req.url);
	log('[Visitor IP]: ' + req.connection.remoteAddress);
	log('[Visitor Agent]: ' + req.headers['user-agent']);
	log('\n');
}

var log = function(msg) {
	console.log(msg.green);
	fs.appendFileSync(__dirname + '/log/log' + new Date().format() + '.log', msg + '\n');
}

Date.prototype.format = function(flag) {
	var year = this.getFullYear();
	var month = this.getMonth() + 1;
	var day = this.getDate();
	var hour = this.getHours();
	var min = this.getMinutes();
	var sec = this.getSeconds();
	var date = '';
	if(flag) {
		date = year + '-' + month + '-' + day + ' ' + hour + ':' + (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec);
	} else {
		date = year + '-' + month + '-' + day;
	}
	return date;
}
app.listen(31687);