(function() {
  var complete, http, message, msgTemple, qs, server, session_manager, slackbot, tuling, xml2js;

  http = require('http');

  qs = require('querystring');

  xml2js = require('xml2js');

  msgTemple = require('./data').msgTemple;

  message = require('./message').message;

  session_manager = require('./session').session_mngt;

  slackbot = require('./slackbot').Slackbot;

  tuling = require('./tuling');

  complete = function(res, contentToUser) {
    console.log("===> answer in wechat <===");
    console.log(contentToUser);
    res.write(contentToUser);
    return res.end();
  };

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
      return req.on('end', function() {
        var POST, contentToUser, error, eventKey, extractedData, fromId, messageType, parser, textContent, userSession, xml;
        POST = qs.parse(body);
        console.log("==>raw data <==");
        xml = Object.keys(POST)[0];
        console.log(xml);
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
          console.log(error);
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
            return complete(res, contentToUser);
          case 'text':
            textContent = extractedData.xml.Content[0];
            userSession = sessionManager.getSessionByUserId(fromId);
            if (userSession !== 'NA' && userSession.status === 'V1002_AGH') {
              contentToUser = message.getMessageByText(textContent, fromId, appId, userSession);
              return complete(res, contentToUser);
            } else {
              return tuling.answer(textContent, function(answer) {
                console.log(answer);
                contentToUser = msgTemple(fromId, appId, answer);
                complete(res, contentToUser);
                return slackbot.sendMessage("用户 [" + fromId + "] 说: \n \"" + textContent + "\" \n [自动回复]: \n \"" + answer + "\" ");
              });
            }
        }
      });
    }
  });

  server.listen(8080);

  slackbot.init();

}).call(this);
