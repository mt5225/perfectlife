perfect = perfect or {}

xml2js = require('xml2js')

perfect.Message = do ->
  Message = ->

  # V1001_PING : simple pong back
  pong = (fromId, toId) ->
    '<xml><ToUserName><![CDATA[' + fromId + ']]></ToUserName><FromUserName><![CDATA[' + toId + ']]></FromUserName><CreateTime>12345678</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[hi there, what can i do for you?]]></Content></xml>'

  #V1002_AGH: AGH联盟
  agh = (fromId, toId) ->
    '<xml><ToUserName><![CDATA[' +
    fromId +
    ']]></ToUserName><FromUserName><![CDATA[' +
    toId +
    ']]></FromUserName><CreateTime>12345678</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[' +
    'Please Choose: \n [1] Tube001 \n [2] Tube002 \n [3] Tube003' +
    ']]></Content></xml>'

  Message.geMessageByEvent = (eventKey) ->
    switch eventKey
      when 'V1001_PING' then pong
      when 'V1002_AGH' then agh

  Message

exports.message = perfect.Message
