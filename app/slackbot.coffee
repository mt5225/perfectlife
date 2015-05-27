perfect = perfect or {}
Slack = require 'slack-client'
slack2wechat = require './slack2wechat'
token = 'xoxb-5042459146-mKyVHVNRYWRl80BxTb3Kqftb'

perfect.Slackbot = do ->
  Slackbot = ->

  Slackbot.bot = {}

  getChannels = (slackobject) ->
    channels = Object.keys(slackobject.channels).map((k) ->
      slackobject.channels[k]
    ).filter((c) ->
      c.is_member
    ).map((c) ->
      c.name
    )

  makeMention = (userId) ->
    '<@' + userId + '>'

  isDirect = (userId, messageText) ->
    userTag = makeMention(userId)
    messageText and messageText.length >= userTag.length and messageText.substr(0, userTag.length) == userTag
  
  Slackbot.init = ->
    slack = new Slack(token, true, true)
    Slackbot.bot = slack

    slack.on 'open', ->
      channels = getChannels(slack)
      groups = Object.keys(slack.groups).map((k) ->
        slack.groups[k]
      ).filter((g) ->
        g.is_open and !g.is_archived
      ).map((g) ->
        g.name
      )
      console.log 'Welcome to Slack. You are ' + slack.self.name + ' of ' + slack.team.name
      if channels.length > 0
        console.log 'You are in: ' + channels.join(', ')
      else
        console.log 'You are not in any channels.'
      if groups.length > 0
        console.log 'As well as: ' + groups.join(', ')
      return

    slack.on 'message', (message) ->
      console.log "message channel = #{message.channel}"
      channel = slack.getChannelGroupOrDMByID(message.channel)
      user = slack.getUserByID(message.user)
      if message.type == 'message' and isDirect(slack.self.id, message.text)
        trimmedMessage = message.text.substr(makeMention(slack.self.id).length).trim()
        trimmedMessage = trimmedMessage.replace(':','').trim().split /\s+/
        console.log trimmedMessage
        openid = trimmedMessage[0]
        msg = trimmedMessage[1]
        slack2wechat.towechat openid, msg, (openid)->
          channel.send "消息已发送到用户 #{openid}"

      return

    slack.login()
  
  Slackbot.sendMessage = (botmsg) ->
    console.log "bot will say: #{botmsg}"
    channel = Slackbot.bot.getChannelByName('general')
    channel.send "==>wechat: #{botmsg}"


  Slackbot

exports.Slackbot = perfect.Slackbot