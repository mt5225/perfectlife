(function() {
  var fs, https, perfect;

  perfect = perfect || {};

  https = require('https');

  fs = require("fs");

  perfect.AccessKey = (function() {
    var APPID, APPSecret, AccessKey, createTimestamp, renewKey;
    AccessKey = function() {};
    APPID = 'wxe2bdce057501817d';
    APPSecret = 'c907a867dc3deebff5c0b2c392c77b90';
    createTimestamp = function() {
      return parseInt((new Date).getTime() / 1000) + '';
    };
    renewKey = function(callback) {
      var options, req;
      options = {
        host: 'api.weixin.qq.com',
        port: 443,
        path: "/cgi-bin/token?grant_type=client_credential&appid=" + APPID + "&secret=" + APPSecret,
        method: 'GET',
        headers: {
          accept: '*/*'
        }
      };
      req = https.request(options, function(res) {
        return res.on('data', function(d) {
          var accesskey, data, key;
          console.log("===> DATA <=== ");
          data = JSON.parse(d);
          console.log(data);
          key = data['access_token'];
          console.log("AccessKey: " + key);
          callback(key);
          accesskey = {
            key: key,
            timestamp: createTimestamp()
          };
          return fs.writeFile('accesskey.json', JSON.stringify(accesskey), function(error) {
            if (error) {
              return console.error("Error writing file", error);
            }
          });
        });
      });
      req.end();
      return req.on('error', function(e) {
        console.log("===> ERROR <=== ");
        console.error(e);
      });
    };
    AccessKey.getKey = function(callback) {
      return fs.readFile('accesskey.json', function(err, data) {
        var contents, key, timegap;
        contents = JSON.parse(data);
        console.log("cached key= " + contents['key']);
        key = contents['key'];
        timegap = parseInt((new Date).getTime() / 1000) - parseInt(contents['timestamp']);
        if (timegap < 7200) {
          console.log("within 2hour, read access key from local cache");
          return callback(key);
        } else {
          console.log("generate an new ticket");
          return renewKey(callback);
        }
      });
    };
    return AccessKey;
  })();

  exports.accesskey = perfect.AccessKey;

}).call(this);
