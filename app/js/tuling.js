(function() {
  var APIKEY, http, querystring;

  http = require('http');

  querystring = require("querystring");

  APIKEY = "4af88f9ffc0ec636538bad5668d5e700";

  exports.answer = function(question, callback) {
    var options, query, req;
    query = querystring.stringify({
      key: APIKEY,
      info: question
    });
    options = {
      host: "www.tuling123.com",
      path: "/openapi/api?" + query,
      method: 'GET',
      headers: {
        accept: '*/*',
        "Cache-Control": "no-cache"
      }
    };
    req = http.request(options, function(res) {
      var body;
      body = '';
      res.on('data', function(d) {
        return body = body + d;
      });
      return res.on('end', function(d) {
        var data;
        data = JSON.parse(body);
        return callback(data.text);
      });
    });
    req.end();
    return req.on('error', function(e) {
      console.error(e);
    });
  };

}).call(this);
