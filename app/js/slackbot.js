(function() {
  var Slack, perfect, slack2wechat, token;

  perfect = perfect || {};

  Slack = require('slack-client');

  slack2wechat = require('./slack2wechat');

  token = 'xoxb-5042459146-mKyVHVNRYWRl80BxTb3Kqftb';

  perfect.Slackbot = (function() {
    var Slackbot, getChannels, isDirect, makeMention;
    Slackbot = function() {};
    Slackbot.bot = {};
    getChannels = function(slackobject) {
      var channels;
      return channels = Object.keys(slackobject.channels).map(function(k) {
        return slackobject.channels[k];
      }).filter(function(c) {
        return c.is_member;
      }).map(function(c) {
        return c.name;
      });
    };
    makeMention = function(userId) {
      return '<@' + userId + '>';
    };
    isDirect = function(userId, messageText) {
      var userTag;
      userTag = makeMention(userId);
      return messageText && messageText.length >= userTag.length && messageText.substr(0, userTag.length) === userTag;
    };
    Slackbot.init = function() {
      var slack;
      slack = new Slack(token, true, true);
      Slackbot.bot = slack;
      slack.on('open', function() {
        var channels, groups;
        channels = getChannels(slack);
        groups = Object.keys(slack.groups).map(function(k) {
          return slack.groups[k];
        }).filter(function(g) {
          return g.is_open && !g.is_archived;
        }).map(function(g) {
          return g.name;
        });
        console.log('Welcome to Slack. You are ' + slack.self.name + ' of ' + slack.team.name);
        if (channels.length > 0) {
          console.log('You are in: ' + channels.join(', '));
        } else {
          console.log('You are not in any channels.');
        }
        if (groups.length > 0) {
          console.log('As well as: ' + groups.join(', '));
        }
      });
      slack.on('message', function(message) {
        var channel, msg, openid, trimmedMessage, user;
        console.log("message channel = " + message.channel);
        channel = slack.getChannelGroupOrDMByID(message.channel);
        user = slack.getUserByID(message.user);
        if (message.type === 'message' && isDirect(slack.self.id, message.text)) {
          trimmedMessage = message.text.substr(makeMention(slack.self.id).length).trim();
          trimmedMessage = trimmedMessage.replace(':', '').trim().split(/\s+/);
          console.log(trimmedMessage);
          openid = trimmedMessage[0];
          msg = trimmedMessage[1];
          slack2wechat.towechat(openid, msg, function(openid) {
            return channel.send("消息已发送到用户 " + openid);
          });
        }
      });
      return slack.login();
    };
    Slackbot.sendMessage = function(botmsg) {
      var channel;
      console.log("bot will say: " + botmsg);
      channel = Slackbot.bot.getChannelByName('general');
      return channel.send("==>wechat: " + botmsg);
    };
    return Slackbot;
  })();

  exports.Slackbot = perfect.Slackbot;

}).call(this);
