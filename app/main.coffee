http = require 'http'
qs = require 'querystring'
xml2js = require 'xml2js'
message = require('./message').message

server = http.createServer (req, res) ->
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
      xml = Object.keys(POST)[0]
      #holding request message
      extractedData = {}
      parser = new (xml2js.Parser)
      parser.parseString xml, (err, result) ->
        extractedData = result
        return

      console.dir extractedData
      fromId = extractedData.xml.FromUserName[0]
      toId = extractedData.xml.ToUserName[0]
      res.write message.pong fromId, toId
      res.end()
      return
  return

server.listen 8080