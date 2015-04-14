perfect = perfect or {}

xml2js = require('xml2js')
ArticleMsgMap = require('./data').article
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

  #Message if user input is invalid
  errMsg = "%^&%^&$^("

  #Message Map for event
  EventMsgMap = {
    'V1002_AGH': aghMsg
  }

  #response for the menu selection
  Message.geMessageByEvent = (eventKey, fromId, toId) ->
    msgTemple fromId,toId, (EventMsgMap[eventKey] || defaultMsg)

  #response for user keyboard input
  Message.getMessageByText = (msgText, fromId, toId, session) ->
    msgKey = ""
    try
      msgKey = "#{session.status}_#{msgText}"
      console.log "message key:  #{msgKey}"
    catch error
      console.log "session is empty, user input without select a menu"

    msgArticleTemple fromId,toId, (ArticleMsgMap[msgKey] || ArticleMsgMap['Default'])

  Message.defaultMessage = (fromId, toId) ->
    msgTemple fromId, toId, errMsg

  Message

exports.message = perfect.Message
