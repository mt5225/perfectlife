http = require 'http'
querystring = require("querystring");

APIKEY = "4af88f9ffc0ec636538bad5668d5e700"

exports.answer = (question, callback) ->
    query = querystring.stringify {
        key: APIKEY
        info: question
    }

    options =
      host: "www.tuling123.com"
      path: "/openapi/api?#{query}"
      method: 'GET'
      headers: 
        accept: '*/*'
        "Cache-Control": "no-cache"

    
    req = http.request options, (res) ->
      body = ''
      res.on 'data', (d) ->
        body = body + d

      res.on 'end', (d) ->
        data = JSON.parse body
        callback data.text

    req.end()
    req.on 'error', (e) ->
        console.error e
        return

#http://www.tuling123.com/openapi/api?key=4af88f9ffc0ec636538bad5668d5e700&info=你好
