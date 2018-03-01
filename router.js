var fs = require('fs');

function router(handle, pathname, response, params) {
  // 判断是否有该路由
  if (typeof handle[pathname] === 'function') {
    // 执行该函数
    handle[pathname](response, params);
  } else {
    // 如果找不到该路由
    response.writeHead(404, {
      // 写入头信息，响应类型
      'Content-Type': 'text/html'
    });
    // 使用管道流 处理 html 文件
    fs.createReadStream(__dirname + '/404.html', 'utf8').pipe(response);
  }
}

module.exports.router = router;