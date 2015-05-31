(function() {
  var http, server, url;

  http = require('http');

  url = require('url');

  server = http.createServer(function(req, res) {
    var queryObject;
    if (req.method === 'GET') {
      queryObject = url.parse(req.url, true).query;
      console.log(queryObject);
    }
  });

  server.listen(80);

}).call(this);
