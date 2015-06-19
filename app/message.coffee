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
  请直接回复数字选取您兴趣的营地:
  [1] 喜乐窝
  [2] 绿茶
  [3] 向日葵
  [0] 关于石舍部落
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
    msgBody = msgTemple fromId,toId, aghMsg   #default message
    try
      msgKey = "#{session.status}_#{msgText}"
      console.log "message key:  #{msgKey}"
      msgBody = msgArticleTemple(fromId,toId, ArticleMsgMap[msgKey])
    catch error
      console.warn "user input free text"
    finally
      return msgBody
      
  Message

exports.message = perfect.Message
