perfect = perfect or {}

xml2js = require('xml2js')

perfect.Message = do ->
  Message = ->

  Message.pong = (fromId, toId) ->
    '<xml><ToUserName><![CDATA[' + fromId + ']]></ToUserName><FromUserName><![CDATA[' + toId + ']]></FromUserName><CreateTime>12345678</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[hi there, what can i do for you?]]></Content></xml>'

  Message

exports.message = perfect.Message
