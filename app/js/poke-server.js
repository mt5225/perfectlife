var http = require('http')
var qs = require('querystring');
var xml2js = require('xml2js');

var server = http.createServer(function (req, res) {

  if(req.method == 'POST') {
  	var body = '';
    req.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                request.connection.destroy();
        });

    req.on('end', function () {
            var POST = qs.parse(body);
            xml = Object.keys(POST)[0];
            var extractedData = {};
			var parser = new xml2js.Parser();
            pong_msg = parser.parseString(xml, function (err, result) {
            	console.dir(result);
            	extractedData = result;
			});
			console.dir(extractedData);
			res.write("<xml><ToUserName><![CDATA[" + extractedData.xml.FromUserName[0]  +"]]></ToUserName><FromUserName><![CDATA[" + extractedData.xml.ToUserName[0] + "]]></FromUserName><CreateTime>12345678</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[Pong]]></Content></xml>");
  			res.end();
        });
  }
});

server.listen(80);

