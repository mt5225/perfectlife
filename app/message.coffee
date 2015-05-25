perfect = perfect or {}

xml2js = require('xml2js')
ArticleMsgMap = require('./data').ArticleMsgMap
msgArticleTemple = require('./data').msgArticleTemple
msgTemple = require('./data').msgTemple

perfect.Message = do ->
  Message = ->


  # V1001_PING : shows under construction
  defaultMsg = """
  功能建设中 ...
  """

  # V1002_AGH: show AGH Menu
  aghMsg = """
  请回复数字选取您兴趣的部落:
  [1] 芦茨土屋
  [2] 石舍香樟
  [3] 凤溪玫瑰
  """

  #Message Map for event
  EventMsgMap = {
    'V1002_AGH': aghMsg
  }

  #response for the menu selection
  Message.geMessageByEvent = (eventKey, fromId, toId) ->
    msgTemple fromId,toId, (EventMsgMap[eventKey] || defaultMsg)

  #response for user keyboard input
  Message.getMessageByText = (msgText, fromId, toId, session) ->
    msgBody = ''
    try
      msgKey = "#{session.status}_#{msgText}"
      console.log "message key:  #{msgKey}"
      msgBody = msgArticleTemple(fromId,toId, ArticleMsgMap[msgKey])
    catch error
      console.log "user input free text"
    finally
      return msgBody

  Message

exports.message = perfect.Message
