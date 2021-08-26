/*****************************************************************
                  解析工具的一些累积  (qc)       
*****************************************************************/
var parse_search = function parse_search() {
  var queryString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.search;
  var kv;
  var result = {};
  var bool = {
    "true": true,
    "false": false
  };
  var searchStr = queryString.indexOf('?') === 0 ? queryString.substr(1) : queryString;
  searchStr = searchStr ? searchStr.split('&') : '';

  for (var i = 0; i < searchStr.length; i++) {
    kv = searchStr[i].split('=');
    kv[1] =
    /* decodeURIComponent(kv[1]) */
    kv[1];
    kv[1] = bool[kv[1]] == undefined ? kv[1] : bool[kv[1]];
    result[kv[0]] = kv[1];
  }

  return result;
}; //序列化


var stringify = function stringify(obj) {
  return JSON.stringify(obj);
}; //反序列化


var parse = function parse(string) {
  return JSON.parse(string);
}; //深拷贝


function deep_clone(data) {
  var type = judgeType(data);
  var obj;

  if (type === "array") {
    obj = [];
  } else if (type == "object") {
    obj = {};
  } else {
    return data;
  }

  if (type == "array") {
    for (var i = 0; i < data.length; i++) {
      obj.push(deep_clone(data[i]));
    }
  } else if (type == "object") {
    for (var key in data) {
      obj[key] = deep_clone(data[key]);
    }
  }

  return obj;
} //获取os信息


function get_os() {
  var os = navigator.platform;
  var userAgent = navigator.userAgent;
  var info = "";
  var tempArray = "";

  if (os.indexOf("Win") > -1) {
    info += "Win";
  } else if (os.indexOf("Mac") > -1) {
    info += "Mac";
  } else if (os.indexOf("X11") > -1) {
    info += "Unix";
  } else if (os.indexOf("Linux") > -1) {
    info += "Linux";
  } else {
    var isAndroid = userAgent.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端

    var isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    if (isAndroid) {
      info += "Android";
    } else if (isiOS) {
      info += "iOS";
    } else {
      info += "Other";
    }
  } //以下为浏览器信息


  info += "/";

  if (/[Ff]irefox(\/\d+\.\d+)/.test(userAgent)) {
    tempArray = /([Ff]irefox)\/(\d+\.\d+)/.exec(userAgent);
    info += tempArray[1] + tempArray[2];
  } else if (/MSIE \d+\.\d+/.test(userAgent)) {
    tempArray = /MS(IE) (\d+\.\d+)/.exec(userAgent);
    info += tempArray[1] + tempArray[2];
  } else if (/[Cc]hrome\/\d+/.test(userAgent)) {
    tempArray = /([Cc]hrome)\/(\d+)/.exec(userAgent);
    info += tempArray[1] + tempArray[2];
  } else if (/[Vv]ersion\/\d+\.\d+\.\d+(\.\d)* *[Ss]afari/.test(userAgent)) {
    tempArray = /[Vv]ersion\/(\d+\.\d+\.\d+)(\.\d)* *([Ss]afari)/.exec(userAgent);
    info += tempArray[3] + tempArray[1];
  } else if (/[Oo]pera.+[Vv]ersion\/\d+\.\d+/.test(userAgent)) {
    tempArray = /([Oo]pera).+[Vv]ersion\/(\d+)\.\d+/.exec(userAgent);
    info += tempArray[1] + tempArray[2];
  } else {
    info += "unknown";
  }

  return info;
}

function judgeType(obj) {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}
/*--------------------------------------------
富文本工具
addTinyImg:添加图片
addTinyVideo:添加视频
---------------------------------------------*/
//https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg!0x0.webp


function addTinyImg(url) {
  var img = "\n    <p>\n    <img style=\"width:100%;\n      height:auto\"\n      src='".concat(url, "'\n      alt=\"\"\n      /> \n    </p>\n    </body>\n    ");
  return img;
} //https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4


function addTinyVideo(url) {
  var video = "<p>\n        <video style=\"width:100%;\n        height:auto\"\n        src=\"".concat(url, "\" \n        controls=\"controls\"\n        width=\"100%\" \n        height=\"auto\"> \n        </video>\n    </p>\n    </body>\n    ");
  return video;
}

export default {
  parse_search: parse_search,
  deep_clone: deep_clone,
  stringify: stringify,
  parse: parse,
  get_os: get_os,
  addTinyImg: addTinyImg,
  addTinyVideo: addTinyVideo
};