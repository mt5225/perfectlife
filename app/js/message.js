(function() {
  var ArticleMsgMap, msgArticleTemple, msgTemple, perfect, xml2js;

  perfect = perfect || {};

  xml2js = require('xml2js');

  ArticleMsgMap = require('./data').ArticleMsgMap;

  msgArticleTemple = require('./data').msgArticleTemple;

  msgTemple = require('./data').msgTemple;

  perfect.Message = (function() {
    var EventMsgMap, Message, aghMsg, defaultMsg, qaMsg;
    Message = function() {};
    defaultMsg = "功能建设中 ...";
    aghMsg = "请直接回复数字选取您兴趣的营地:\n[1] 喜乐窝\n[2] 向日葵\n[3] 绿茶\n[0] 关于石舍部落";
    qaMsg = "您好，我是漫生活客服\n有什么可以帮您 ?\n[预订营地请点击底部“营地预订”菜单，选购漫生活产品请点击“产品”菜单]";
    EventMsgMap = {
      'V1002_AGH': aghMsg,
      'V1005_QA': qaMsg
    };
    Message.geMessageByEvent = function(status, fromId, toId) {
      var msgBody;
      if (status === 'subscribe') {
        msgBody = msgArticleTemple(fromId, toId, ArticleMsgMap['subscribe']);
      } else {
        msgBody = msgTemple(fromId, toId, EventMsgMap[status] || defaultMsg);
      }
      return msgBody;
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
