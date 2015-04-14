(function() {
  var perfect;

  perfect = perfect || {};

  perfect.SessionManager = (function() {
    var SessionManager, addNewSession, p, sessionList;
    SessionManager = function() {};
    sessionList = [];
    p = SessionManager.prototype;
    addNewSession = function(userId, status) {
      var newSession;
      console.log("add new session with " + userId + " " + status);
      newSession = {
        userId: userId,
        status: status
      };
      sessionList.push(newSession);
      return newSession;
    };
    p.addOrUpdateSession = function(userId, status) {
      var i, len, s;
      for (i = 0, len = sessionList.length; i < len; i++) {
        s = sessionList[i];
        if (s.userId === userId) {
          console.log("update status of " + s.userId + "  " + userId + " to " + status);
          s.status = status;
          return s;
        }
      }
      return addNewSession(userId, status);
    };
    p.getSessionByUserId = function(uid) {
      var i, len, s;
      for (i = 0, len = sessionList.length; i < len; i++) {
        s = sessionList[i];
        if (uid === s.userId) {
          return s;
        }
      }
    };
    p.printAllSessions = function() {
      var i, len, s;
      console.log("==session list begin, length = " + sessionList.length + " ===>");
      for (i = 0, len = sessionList.length; i < len; i++) {
        s = sessionList[i];
        console.log(s);
      }
      return console.log("==session list end ===>");
    };
    return SessionManager;
  })();

  exports.session_mngt = perfect.SessionManager;

}).call(this);
