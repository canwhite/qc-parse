(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;

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
  };

  var stringify = function stringify(obj) {
    return JSON.stringify(obj);
  };

  var parse = function parse(string) {
    return JSON.parse(string);
  };

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

  var _default = {
    parse_search: parse_search,
    deep_clone: deep_clone,
    stringify: stringify,
    parse: parse
  };
  _exports["default"] = _default;
});