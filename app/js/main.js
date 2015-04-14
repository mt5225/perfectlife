(function() {
  var http, message, qs, server, session_manager, xml2js;

  http = require('http');

  qs = require('querystring');

  xml2js = require('xml2js');

  message = require('./message').message;

  session_manager = require('./session').session_mngt;

  server = http.createServer(function(req, res) {
    var appId, body, sessionManager;
    sessionManager = new session_manager();
    appId = '';
    if (req.method === 'POST') {
      body = '';
      req.on('data', function(data) {
        body += data;
        if (body.length > 1e6) {
          request.connection.destroy();
        }
      });
      req.on('end', function() {
        var POST, contentToUser, eventKey, extractedData, fromId, messageType, parser, xml;
        POST = qs.parse(body);
        xml = Object.keys(POST)[0];
        extractedData = {};
        parser = new xml2js.Parser;
        parser.parseString(xml, function(err, result) {
          extractedData = result;
        });
        console.dir(extractedData);
        fromId = extractedData.xml.FromUserName[0];
        appId = appId || extractedData.xml.ToUserName[0];
        messageType = extractedData.xml.MsgType[0];
        contentToUser = '';
        if (messageType === 'event') {
          console.log("user click menu, fromId = " + fromId + " appId = " + appId);
          eventKey = extractedData.xml.EventKey[0];
          sessionManager.addOrUpdateSession(fromId, eventKey);
          sessionManager.printAllSessions();
          contentToUser = (message.geMessageByEvent(eventKey))(fromId, appId);
        }
        res.write(contentToUser);
        res.end();
      });
    }
  });

  server.listen(8080);

}).call(this);
