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
  [2] 向日葵
  [3] 绿茶
  [0] 关于石舍部落
  """

  qaMsg = """
  您好，我是漫生活客服
  有什么可以帮您 ?
  [预订营地请点击底部“营地预订”菜单，选购漫生活产品请点击“产品”菜单]
  """

  #Message Map for event
  EventMsgMap = {
    'V1002_AGH': aghMsg
    'V1005_QA': qaMsg
  }

  #response for the menu selection
  Message.geMessageByEvent = (status, fromId, toId) ->
    if status is 'subscribe'
      msgBody = msgArticleTemple fromId, toId, ArticleMsgMap['subscribe']
    else 
      msgBody = msgTemple fromId,toId, (EventMsgMap[status] || defaultMsg)
    msgBody

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
