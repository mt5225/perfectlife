(function() {
  var perfect, xml2js;

  perfect = perfect || {};

  xml2js = require('xml2js');

  perfect.Message = (function() {
    var Message;
    Message = function() {};
    Message.pong = function(fromId, toId) {
      return '<xml><ToUserName><![CDATA[' + fromId + ']]></ToUserName><FromUserName><![CDATA[' + toId + ']]></FromUserName><CreateTime>12345678</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[hi there, what can i do for you?]]></Content></xml>';
    };
    return Message;
  })();

  exports.message = perfect.Message;

}).call(this);
