(function() {
  var ArticleMsgMap, msgArticleTemple, msgTemple, perfect, xml2js;

  perfect = perfect || {};

  xml2js = require('xml2js');

  ArticleMsgMap = require('./data').article;

  msgArticleTemple = require('./data').msgArticleTemple;

  msgTemple = require('./data').msgTemple;

  perfect.Message = (function() {
    var EventMsgMap, Message, aghMsg, defaultMsg, errMsg;
    Message = function() {};
    defaultMsg = "功能建设中 ...";
    aghMsg = "请回复数字选取您兴趣的部落:\n[1] 芦茨土屋\n[2] 石舍香樟\n[3] 凤溪玫瑰";
    errMsg = "%^&%^&$^(";
    EventMsgMap = {
      'V1002_AGH': aghMsg
    };
    Message.geMessageByEvent = function(eventKey, fromId, toId) {
      return msgTemple(fromId, toId, EventMsgMap[eventKey] || defaultMsg);
    };
    Message.getMessageByText = function(msgText, fromId, toId, session) {
      var error, msgKey;
      msgKey = "";
      try {
        msgKey = session.status + "_" + msgText;
        console.log("message key:  " + msgKey);
      } catch (_error) {
        error = _error;
        console.log("session is empty, user input without select a menu");
      }
      return msgArticleTemple(fromId, toId, ArticleMsgMap[msgKey] || ArticleMsgMap['Default']);
    };
    Message.defaultMessage = function(fromId, toId) {
      return msgTemple(fromId, toId, errMsg);
    };
    return Message;
  })();

  exports.message = perfect.Message;

}).call(this);
