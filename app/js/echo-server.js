var http = require('http')
var server = http.createServer(function (req, res) {
  var msg = require('url').parse(req.url, true)
  console.log(msg);
  console.log(msg['query']['echostr']);
  str = msg['query']['echostr'];
  res.setHeader('echostr', str);
  res.write(str);
  res.end();
});
server.listen(80);
