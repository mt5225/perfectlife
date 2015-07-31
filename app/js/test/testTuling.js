(function() {
  var tuling;

  tuling = require('../tuling');

  tuling.answer("预定", function(msg) {
    return console.log(msg);
  });

}).call(this);
