http = require 'http'
qs = require 'querystring'
xml2js = require 'xml2js'
message = require('./message').message
session_manager = require('./session').session_mngt

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
      console.log POST
      xml = Object.keys(POST)[0]
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
        res.end()
        return

      contentToUser = ''
      switch messageType
        when 'event'
          console.log "user click menu, fromId = #{fromId} appId = #{appId}"
          eventKey = extractedData.xml.EventKey[0]
          sessionManager.addOrUpdateSession fromId, eventKey
          sessionManager.printAllSessions()
          contentToUser = message.geMessageByEvent eventKey, fromId, appId
        when 'text'
          textContent = extractedData.xml.Content[0] || 'N/A'
          userSession = sessionManager.getSessionByUserId fromId || {}
          contentToUser = message.getMessageByText textContent, fromId, appId, userSession
        else
          contentToUser = message.defaultMessage fromId, appId
      res.write contentToUser
      res.end()
      return
  return

server.listen 8080