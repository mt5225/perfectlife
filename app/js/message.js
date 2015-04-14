(function() {
  var perfect, xml2js;

  perfect = perfect || {};

  xml2js = require('xml2js');

  perfect.Message = (function() {
    var Message, agh, pong;
    Message = function() {};
    pong = function(fromId, toId) {
      return '<xml><ToUserName><![CDATA[' + fromId + ']]></ToUserName><FromUserName><![CDATA[' + toId + ']]></FromUserName><CreateTime>12345678</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[hi there, what can i do for you?]]></Content></xml>';
    };
    agh = function(fromId, toId) {
      return '<xml><ToUserName><![CDATA[' + fromId + ']]></ToUserName><FromUserName><![CDATA[' + toId + ']]></FromUserName><CreateTime>12345678</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[' + 'Please Choose: \n [1] Tube001 \n [2] Tube002 \n [3] Tube003' + ']]></Content></xml>';
    };
    Message.geMessageByEvent = function(eventKey) {
      switch (eventKey) {
        case 'V1001_PING':
          return pong;
        case 'V1002_AGH':
          return agh;
      }
    };
    return Message;
  })();

  exports.message = perfect.Message;

}).call(this);
