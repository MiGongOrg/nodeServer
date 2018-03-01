var server = require('./server');
var router = require('./router');
var handler = require('./handler');

var handle = {};

handle['/'] = handler.home;
handle['/api'] = handler.api_records;

// 创建 Web Sever
server.startServer(router.router, handle);