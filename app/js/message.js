(function() {
  var ArticleMsgMap, msgArticleTemple, msgTemple, perfect, xml2js;

  perfect = perfect || {};

  xml2js = require('xml2js');

  ArticleMsgMap = require('./data').ArticleMsgMap;

  msgArticleTemple = require('./data').msgArticleTemple;

  msgTemple = require('./data').msgTemple;

  perfect.Message = (function() {
    var EventMsgMap, Message, aghMsg, defaultMsg;
    Message = function() {};
    defaultMsg = "功能建设中 ...";
    aghMsg = "请回复数字选取您兴趣的部落:\n[1] 芦茨土屋\n[2] 石舍香樟\n[3] 凤溪玫瑰";
    EventMsgMap = {
      'V1002_AGH': aghMsg
    };
    Message.geMessageByEvent = function(eventKey, fromId, toId) {
      return msgTemple(fromId, toId, EventMsgMap[eventKey] || defaultMsg);
    };
    Message.getMessageByText = function(msgText, fromId, toId, session) {
      var error, msgBody, msgKey;
      msgBody = msgTemple(fromId, toId, aghMsg);
      try {
        msgKey = session.status + "_" + msgText;
        console.log("message key:  " + msgKey);
        return msgBody = msgArticleTemple(fromId, toId, ArticleMsgMap[msgKey]);
      } catch (_error) {
        error = _error;
        return console.warn("user input free text");
      } finally {
        return msgBody;
      }
    };
    return Message;
  })();

  exports.message = perfect.Message;

}).call(this);
