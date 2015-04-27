(function() {
  var ArticleMsgMap, msgArticleTemple, msgTemple;

  ArticleMsgMap = {
    'V1002_AGH_1': {
      title: '芦茨土屋',
      description: '自然、回归、原生态，则是芦茨土屋坚守不变的色彩 ... 依自然而建，无论原木的外表，还是屋内的树木，家园的每一处都保持了自然有机的风格, 每一处陈设，每一处设计，每一个遐想，每一个憧憬，主角可以是你，配角也可以是你',
      picurl: 'http://119.29.114.143:9000/images/lztw.jpg',
      url: 'http://119.29.114.143:9000'
    },
    'V1002_AGH_2': {
      title: '石舍香樟',
      description: '那株久远到无法考证年代的香樟树，那湾清澈可见底的涓涓溪水，那抹夜色中的草长莺飞衍生野趣...... 石舍香樟 完美生活的见证。',
      picurl: 'http://119.29.114.143:9000/images/ssxz.jpg',
      url: 'http://119.29.114.143:9000'
    },
    'V1002_AGH_3': {
      title: '凤溪玫瑰',
      description: '凤溪玫瑰不仅是一种深度旅游休闲的慢生活度假产品，更是一种差异化乡村多种生活形态的互动体验。',
      picurl: 'http://119.29.114.143:9000/images/fxmg.jpg',
      url: 'http://119.29.114.143:9000'
    },
    'Default': {
      title: 'valid input is 1,2 or 3',
      description: 'please try again'
    }
  };

  msgTemple = function(fromId, toId, msg) {
    return "<xml> <ToUserName><![CDATA[" + fromId + "]]></ToUserName> <FromUserName><![CDATA[" + toId + "]]></FromUserName> <CreateTime>12345678</CreateTime> <MsgType><![CDATA[text]]></MsgType> <Content><![CDATA[" + msg + "]]></Content> </xml>";
  };

  msgArticleTemple = function(fromId, toId, msg) {
    return "<xml> <ToUserName><![CDATA[" + fromId + "]]></ToUserName> <FromUserName><![CDATA[" + toId + "]]></FromUserName> <CreateTime>12345678</CreateTime> <MsgType><![CDATA[news]]></MsgType> <ArticleCount>1</ArticleCount> <Articles> <item> <Title><![CDATA[" + msg.title + "]]></Title> <Description><![CDATA[" + msg.description + "]]></Description> <PicUrl><![CDATA[" + msg.picurl + "]]></PicUrl> <Url><![CDATA[" + msg.url + "]]></Url> </item> </Articles> </xml>";
  };

  exports.article = ArticleMsgMap;

  exports.msgTemple = msgTemple;

  exports.msgArticleTemple = msgArticleTemple;

}).call(this);