###
reg in wechat
  {
    signature: 'e605a3509b191c11e567fadd11d9ce3f224da0c0',
    echostr: '6916063543425693630',
    timestamp: '1433051788',
    nonce: '1289909455' 
  }
###

http = require 'http'
url = require 'url'

server = http.createServer (req, res) ->
  if req.method == 'GET'
    queryObject = url.parse(req.url,true).query
    console.log queryObject
    res.write queryObject['echostr']
    res.end()

  return

server.listen 80