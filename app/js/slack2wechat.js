(function() {
  var accesskey, request;

  accesskey = require('./accesskey').accesskey;

  request = require('request');

  exports.towechat = function(openid, msg, callback) {
    return accesskey.getKey(function(access_key) {
      var options;
      console.log("access_key = " + access_key);
      options = {
        header: {
          'Content-Type': 'application/json'
        },
        url: "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=" + access_key,
        method: 'POST',
        json: {
          "touser": "" + openid,
          "msgtype": "text",
          "text": {
            "content": "" + msg
          }
        }
      };
      return request(options, function(error, response, data) {
        if (!error && response.statusCode === 200) {
          console.log('----info------\n', data);
          return callback(openid);
        }
      });
    });
  };

}).call(this);
