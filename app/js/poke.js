(function() {
  var http, qs, server, xml2js;

  http = require('http');

  qs = require('querystring');

  xml2js = require('xml2js');

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
        var POST, extractedData, parser, xml;
        POST = qs.parse(body);
        xml = Object.keys(POST)[0];
        extractedData = {};
        parser = new xml2js.Parser;
        parser.parseString(xml, function(err, result) {
          extractedData = result;
        });
        console.dir(extractedData);
        res.write('<xml><ToUserName><![CDATA[' + extractedData.xml.FromUserName[0] + ']]></ToUserName><FromUserName><![CDATA[' + extractedData.xml.ToUserName[0] + ']]></FromUserName><CreateTime>12345678</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[Pong]]></Content></xml>');
        res.end();
      });
    }
  });

  server.listen(80);

}).call(this);
