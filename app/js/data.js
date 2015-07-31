(function() {
  var config;

  config = require('./config');

  exports.ArticleMsgMap = {
    'V1002_AGH_0': {
      title: '石舍香樟',
      description: '那株久远到无法考证年代的香樟树，那湾清澈可见底的涓涓溪水，那抹夜色中的草长莺飞衍生野趣。石舍香樟 完美生活的见证...',
      picurl: 'http://aghpic.oss-cn-shenzhen.aliyuncs.com/wechatapp/ssxz.jpg',
      url: '#{config.WEB_ENDPOINT}/#/houses'
    },
    'V1002_AGH_1': {
      title: '喜乐窝',
      description: '儿时的情节，十年的酝酿，八年的成长，以及一生的寄托，喜乐窝表达我们对生活与家最本质的追寻。',
      picurl: 'http://aghpic.oss-cn-shenzhen.aliyuncs.com/wechatapp/xile.jpg',
      url: '#{config.WEB_ENDPOINT}/#/housedetail/H001'
    },
    'V1002_AGH_2': {
      title: '向日葵',
      description: '向日葵营地，正如它的花语---勇敢去追求自己想要的幸福。如果...',
      picurl: 'http://aghpic.oss-cn-shenzhen.aliyuncs.com/wechatapp/xrk.jpg',
      url: '#{config.WEB_ENDPOINT}/#/housedetail/H002'
    },
    'V1002_AGH_3': {
      title: '绿茶',
      description: '远离城市浮华，步入大自然的怀抱，在上水之间寻找内心的自我...',
      picurl: 'http://aghpic.oss-cn-shenzhen.aliyuncs.com/wechatapp/greentea.jpg',
      url: '#{config.WEB_ENDPOINT}/#/housedetail/H003'
    },
    'subscribe': {
      title: '欢迎进入漫生活',
      description: '那株久远到无法考证年代的香樟树，那湾清澈可见底的涓涓溪水，那抹夜色中的草长莺飞衍生野趣。点击进入漫生活 ...   客服电话 12345678',
      picurl: 'http://aghpic.oss-cn-shenzhen.aliyuncs.com/wechatapp/DEV/Others/%E7%9F%B3%E8%88%8D%E9%A6%99%E6%A8%9Fwithout%20name.jpg',
      url: '#{config.WEB_ENDPOINT}'
    }
  };

  exports.msgTemple = function(fromId, toId, msg) {
    return "<xml> <ToUserName><![CDATA[" + fromId + "]]></ToUserName> <FromUserName><![CDATA[" + toId + "]]></FromUserName> <CreateTime>12345678</CreateTime> <MsgType><![CDATA[text]]></MsgType> <Content><![CDATA[" + msg + "]]></Content> </xml>";
  };

  exports.msgArticleTemple = function(fromId, toId, msg) {
    return "<xml> <ToUserName><![CDATA[" + fromId + "]]></ToUserName> <FromUserName><![CDATA[" + toId + "]]></FromUserName> <CreateTime>12345678</CreateTime> <MsgType><![CDATA[news]]></MsgType> <ArticleCount>1</ArticleCount> <Articles> <item> <Title><![CDATA[" + msg.title + "]]></Title> <Description><![CDATA[" + msg.description + "]]></Description> <PicUrl><![CDATA[" + msg.picurl + "]]></PicUrl> <Url><![CDATA[" + msg.url + "]]></Url> </item> </Articles> </xml>";
  };

}).call(this);
