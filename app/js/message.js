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
    aghMsg = "请直接回复数字选取您兴趣的营地:\n[1] 喜乐窝\n[2] 绿茶\n[3] 向日葵\n[0] 关于石舍部落";
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
