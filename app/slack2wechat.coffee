accesskey = require('./accesskey').accesskey
request = require 'request'

exports.towechat = (openid, msg, callback) ->

  accesskey.getKey (access_key) ->
    console.log "access_key = #{access_key}"
       
    options = 
      header: 'Content-Type': 'application/json'
      url: "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=#{access_key}"
      method: 'POST'
      json: {
              "touser": "#{openid}",
              "msgtype": "text",
              "text": {
                "content": "#{msg}"
               }       
            }

    request options, (error, response, data) ->
      if !error and response.statusCode == 200
        console.log '----info------\n', data
        callback(openid)