var fs = require('fs');

// 首页
function home(response) {
  response.writeHead(200, {
    // 写入头信息，响应类型
    'Content-Type': 'text/html'
  });
  // 使用管道流 处理 html 文件
  fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(response);
}

// API
function api_records(response, params) {
  response.writeHead(200, {
    // 写入头信息，响应类型
    'Content-Type': 'application/json'
  });

  // 写入 json string 相当于 response.write(JSON.stringify(params));
  response.end(JSON.stringify(params));
}

module.exports = {
  home: home,
  api_records: api_records
};