http = require 'http'
url = require 'url'

server = http.createServer (req, res) ->
  if req.method == 'GET'
    queryObject = url.parse(req.url,true).query
    console.log queryObject


  return

server.listen 80