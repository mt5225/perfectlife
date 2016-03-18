http = require 'http'
qs = require 'querystring'
xml2js = require 'xml2js'
msgTemple = require('./data').msgTemple
message = require('./message').message
session_manager = require('./session').session_mngt
slackbot = require('./slackbot').Slackbot
tuling  = require './tuling'

complete = (res, contentToUser)->
  console.log "===> answer in wechat <==="
  console.log contentToUser
  res.write contentToUser
  res.end()

server = http.createServer (req, res) ->
  sessionManager = new session_manager()
  appId = ''

  if req.method == 'POST'
    body = ''
#    if data is too much, drop it.
    req.on 'data', (data) ->
      body += data
      if body.length > 1e6
        request.connection.destroy()
      return

#    done getting data
    req.on 'end', ->
      POST = qs.parse(body)
      console.log "==>raw data <=="
      xml = Object.keys(POST)[0]
      console.log xml
      #holding request message
      extractedData = {}
      parser = new (xml2js.Parser)
      parser.parseString xml, (err, result) ->
        extractedData = result
        return

      #get the event details
      try
        fromId = extractedData.xml.FromUserName[0]
        appId = appId || extractedData.xml.ToUserName[0]
        messageType = extractedData.xml.MsgType[0]
      catch error 
        console.log error
        res.end()
        return

      contentToUser = ''
      switch messageType
        when 'event'  #uer click menu
          console.log "user click menu, fromId = #{fromId} appId = #{appId}"
          try
            eventKey = extractedData.xml.EventKey[0]
            eventStr = extractedData.xml.Event[0]
            status = 'NA'
            if eventKey?.length
              status = eventKey
            else
              status = eventStr
            console.log status
            sessionManager.addOrUpdateSession fromId, status
            sessionManager.printAllSessions()
            contentToUser = message.geMessageByEvent status, fromId, appId
            complete(res, contentToUser)
          catch error
            console.log error
            res.end()
            return
        when 'text'  #user input some text
          try
            textContent = extractedData.xml.Content[0]
          catch error
            console.log error
            res.end()
            return
          userSession = sessionManager.getSessionByUserId fromId         
          if userSession isnt 'NA' and userSession.status is 'V1002_AGH' #user seesion exist and talk to 'choose tribe' menu
            contentToUser = message.getMessageByText textContent, fromId, appId, userSession
            complete(res, contentToUser)         
          else #user input free text, sync to slack
            tuling.answer textContent, (answer) ->
              console.log answer
              contentToUser = msgTemple(fromId, appId, answer)
              complete(res, contentToUser)
              #slackbot.sendMessage """用户 [#{fromId}] 说: \n "#{textContent}" \n [自动回复]: \n "#{answer}" """       
server.listen 80
#slackbot.init()
