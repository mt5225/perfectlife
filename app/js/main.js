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
        var POST, contentToUser, error, eventKey, extractedData, fromId, messageType, parser, textContent, userSession, xml;
        POST = qs.parse(body);
        console.log(POST);
        xml = Object.keys(POST)[0];
        extractedData = {};
        parser = new xml2js.Parser;
        parser.parseString(xml, function(err, result) {
          extractedData = result;
        });
        try {
          fromId = extractedData.xml.FromUserName[0];
          appId = appId || extractedData.xml.ToUserName[0];
          messageType = extractedData.xml.MsgType[0];
        } catch (_error) {
          error = _error;
          res.end();
          return;
        }
        contentToUser = '';
        switch (messageType) {
          case 'event':
            console.log("user click menu, fromId = " + fromId + " appId = " + appId);
            eventKey = extractedData.xml.EventKey[0];
            sessionManager.addOrUpdateSession(fromId, eventKey);
            sessionManager.printAllSessions();
            contentToUser = message.geMessageByEvent(eventKey, fromId, appId);
            break;
          case 'text':
            textContent = extractedData.xml.Content[0] || 'N/A';
            userSession = sessionManager.getSessionByUserId(fromId || {});
            contentToUser = message.getMessageByText(textContent, fromId, appId, userSession);
            break;
          default:
            contentToUser = message.defaultMessage(fromId, appId);
        }
        console.log(contentToUser);
        res.write(contentToUser);
        res.end();
      });
    }
  });

  server.listen(8080);

}).call(this);
