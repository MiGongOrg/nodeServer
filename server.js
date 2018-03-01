var fs   = require('fs');
var url  = require('url'); // url 工具库
var http = require('http');
var querystring = require('querystring'); // 处理 POST 字符串

var startServer = function(router, handle) {
  var requestListener = function(request, response) {
    // 请求 URL 只取 URL pathname 部分
    var pathname = url.parse(request.url).pathname;

    var data = [];
    // 监听请求
    request.on('error', function(err) {
      console.log(err);
    }).on('data', function(chunk) {
      // 处理数据
      data.push(chunk);
    }).on('end', function() {
      // 处理不同请求
      if (request.method === 'POST') {
        // 防止请求数据过多
        if (data.length > 1e6) {
          request.connection.destroy()
        }
        // 处理数据
        data = Buffer.concat(data).toString();
        router(handle, pathname, response, querystring.parse(data));
      } else if (request.method === 'GET') {
        // 取 URL ? 后部分，true 为对象，如果是 false 则是字符串
        var params = url.parse(request.url, true).query
        console.log(params)
        // 路由函数
        router(handle, pathname, response, params);
      }
    });

  };

  // 创建 Server
  var server = http.createServer(requestListener);

  // 监听端口
  server.listen(3000, '127.0.0.1');

  console.log('创建 Web Server 成功');
}

module.exports.startServer = startServer;