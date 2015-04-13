http = require('http')
qs = require('querystring')
xml2js = require('xml2js')
server = http.createServer((req, res) ->
  if req.method == 'POST'
    body = ''
    req.on 'data', (data) ->
      body += data
      if body.length > 1e6
        request.connection.destroy()
      return
    req.on 'end', ->
      POST = qs.parse(body)
      xml = Object.keys(POST)[0]
      extractedData = {}
      parser = new (xml2js.Parser)
      parser.parseString xml, (err, result) ->
        console.dir result
        extractedData = result
        return

      console.dir extractedData
      res.write '<xml><ToUserName><![CDATA[' + extractedData.xml.FromUserName[0] + ']]></ToUserName><FromUserName><![CDATA[' + extractedData.xml.ToUserName[0] + ']]></FromUserName><CreateTime>12345678</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[Pong]]></Content></xml>'
      res.end()
      return
  return
)
server.listen 80