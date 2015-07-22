perfect = perfect or {}

#session manager class
perfect.SessionManager = do ->
  SessionManager = ->

  sessionList = []

  p = SessionManager.prototype

  #status is menukey, e.g. V1002_AGH
  addNewSession = (userId, status) ->
    console.log "add new session with #{userId} #{status}"
    newSession = {userId: userId, status: status}
    sessionList.push newSession
    newSession

  p.addOrUpdateSession = (userId, status) ->
    for s in sessionList
        if s.userId == userId
          console.log "update status of #{s.userId}  #{userId} to #{status}"
          s.status = status
          return s
    addNewSession(userId, status)

  p.getSessionByUserId = (uid) ->
    for s in sessionList
      return s if uid == s.userId
    return 'NA'

  p.printAllSessions = ->
    console.log "==session list begin, length = #{sessionList.length} ===>"
    for s in sessionList
      console.log s
    console.log "==session list end ===>"

  SessionManager

exports.session_mngt = perfect.SessionManager