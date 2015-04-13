(function() {
  var http, message, qs, server, xml2js;

  http = require('http');

  qs = require('querystring');

  xml2js = require('xml2js');

  message = require('./message').message;

  server = http.createServer(function(req, res) {
    var body;
    if (req.method === 'POST') {
      body = '';
      req.on('data', function(data) {
        body += data;
        if (body.length > 1e6) {
          request.connection.destroy();
        }
      });
      req.on('end', function() {
        var POST, extractedData, fromId, parser, toId, xml;
        POST = qs.parse(body);
        xml = Object.keys(POST)[0];
        extractedData = {};
        parser = new xml2js.Parser;
        parser.parseString(xml, function(err, result) {
          extractedData = result;
        });
        console.dir(extractedData);
        fromId = extractedData.xml.FromUserName[0];
        toId = extractedData.xml.ToUserName[0];
        res.write(message.pong(fromId, toId));
        res.end();
      });
    }
  });

  server.listen(8080);

}).call(this);
