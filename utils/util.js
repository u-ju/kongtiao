const app = getApp()
var apiurl = require('api.js');
var build = 99999999
// var build = 20190404
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
  -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
  -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
//util.js
function now_time() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var getMilliseconds = date.getMilliseconds();
  return '' + year + "-" + month + "-" + day + "-" + hour + "-" + minute
}
function imageUtil(e) {
  var imageSize = {};
  console.log(e)
  var originalWidth = e.detail.width;//图片原始宽
  var originalHeight = e.detail.height;//图片原始高
  var originalScale = originalHeight / originalWidth;//图片高宽比
  //获取屏幕宽高
  wx.getSystemInfo({
    success: function (res) {
      var windowWidth = res.windowWidth;
      var windowHeight = res.windowHeight;
      var windowscale = windowHeight / windowWidth;//屏幕高宽比
      if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比
        //图片缩放后的宽为屏幕宽
        imageSize.imageWidth = windowWidth;
        imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
      } else {//图片高宽比大于屏幕高宽比
        //图片缩放后的高为屏幕高
        imageSize.imageHeight = windowHeight;
        imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
      }

    }
  })
  return imageSize;
}

function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  // 这里秒钟也取整
  var second = parseInt(time)

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

/**
 * 注册JS方法
 * @type {{formatTime: formatTime, crtTimeFtt: crtTimeFtt, alert: alert, loginOpenId: loginOpenId, dialog: dialog, loading: loading, postJSON: postJSON, getJSON: getJSON, replaceStr: (function(*): string)}}
 */
module.exports = {
  now_time: now_time,
  formatTime: formatTime,
  crtTimeFtt: crtTimeFtt,
  ok_dialog: ok_dialog,
  loginOpenId: loginOpenId,
  info_dialog: info_dialog,
  loading: loading,
  postJSON: postJSON,
  getJSON: getJSON,
  replaceStr: replaceStr,
  getToken: getToken,
  unique: unique,
  isValidURL: isValidURL,
  deplay_redirect: deplay_redirect,
  deplay_navigateTo: deplay_navigateTo,
  alert: alert,
  imageUtil: imageUtil,
  hideLoading: hideLoading,
  upload_file_server: upload_file_server,
  base64encode: base64encode,
  utf16to8: utf16to8,
  utf8to16: utf8to16,
  distance: distance,
  scan: scan,
  getSync: getSync,
  putSync: putSync,
  navigateBack: navigateBack,
  build: build
}

/**
 * 替换字符串
 * @param str
 * @returns {string}
 */
function replaceStr(str) {
  return str.trim().replace(/[,]/g, " ");
}

//上传方法
function upload_file_server(url, that, upload_picture_list, j, arr, storge) {
  //上传返回值
  var _this = this;
  console.log(upload_picture_list[j])
  const upload_task = wx.uploadFile({
    // 模拟https
    url: url, //需要用HTTPS，同时在微信公众平台后台添加服务器地址  
    filePath: upload_picture_list[j]['path'], //上传的文件本地地址    
    name: 'file',
    formData: {
      "image": upload_picture_list[j]['path_base'],
      'source': 'base64'
    },
    header: {
      "content-type": 'application/x-www-form-urlencoded',
      'token': _this.getToken(),
      'channel': 'let',
      'build': build
    },
    //附近数据，这里为路径     
    success: function (res) {
      console.log(res)
      var data = JSON.parse(res.data);
      // //字符串转化为JSON  

      if (data.status == 200) {
        var filename = data.result.image_url //存储地址 显示
        upload_picture_list[j]['path_server'] = filename

      } else {
        upload_picture_list[j]['path_server'] = filename
      }

      if (arr == 'upload_picture_list1') {
        that.setData({
          upload_picture_list1: upload_picture_list
        });
      } else if (arr == 'upload_picture_list2') {
        that.setData({
          upload_picture_list2: upload_picture_list
        });
      } else {
        if (storge == 1) {
          wx.setStorageSync('upload_picture_list', upload_picture_list)
        }
        that.setData({
          upload_picture_list: upload_picture_list
        });
      }

      wx.setStorageSync('imgs', upload_picture_list);
    }
  })
  // 上传 进度方法

  upload_task.onProgressUpdate((res) => {
    upload_picture_list[j]['upload_percent'] = res.progress
    if (arr == 'upload_picture_list1') {
      that.setData({
        upload_picture_list1: upload_picture_list
      });
    } else if (arr == 'upload_picture_list2') {
      that.setData({
        upload_picture_list2: upload_picture_list
      });
    } else {
      that.setData({
        upload_picture_list: upload_picture_list
      });
    }


  });
}

// 隐藏信息框
function hideLoading(time = 1000) {
  setTimeout(function () {
    wx.hideLoading()
  }, time)
}
/**
 * 删除重复的数组元素，只保留一个重复的元素
 * @param array
 * @returns {Array}
 */
function unique(array) {
  var temp = []; //一个新的临时数组
  for (var i = 0; i < array.length; i++) {
    if (temp.indexOf(array[i]) == -1) {
      temp.push(array[i]);
    }
  }
  return temp;
}


/**
 * 获取登录用户ID
 * @returns {*}
 */
function getToken(valuetstu = '', form, cb, mothed) {
  var that = this;
  var token = wx.getStorageSync('token') || "";

  if (token && valuetstu != 801) {
    return token;
  }
  if (valuetstu == 801) {
    wx.reLaunch({
      url: '../index/index',
    })
    return false
  }
  wx.login({
    success: function (res) {
      var data = { wx_code: res.code, wx_appid: 'wx312b45ec2ec4d345' }
      if (res.code) {
        that.postJSON({ apiUrl: apiurl.wechatLetAttemptLogin, data: data, token: "huhu" }, function (res1) {
          if (res1.data.result.token) {
            wx.setStorageSync("token", res1.data.result.token)
            token = res1.data.result.token
            if (mothed == "get") {
              that.getJSON(form, cb)
            } else if (mothed == "post") {
              that.postJSON(form, cb)
            }
            return token;

          } else {
            wx.getUserInfo({
              success(res2) {
                that.postJSON({
                  apiUrl: apiurl.wechatLetLogin,
                  data: {
                    wx_appid: 'wx312b45ec2ec4d345',
                    session_key: that.base64encode(that.utf16to8(res1.data.result.wx_user.session_key)),
                    iv: that.base64encode(that.utf16to8(res2.iv)),
                    encrypt_data: that.base64encode(that.utf16to8(res2.encryptedData))
                  }, token: "huhu"
                }, function (res3) {
                  wx.setStorageSync("token", res3.data.result.token)
                  if (mothed == "get") {
                    that.getJSON(form, cb)
                  } else if (mothed == "post") {
                    that.postJSON(form, cb)
                  }
                  token = res3.data.result.token
                  return token;
                })
              },
              fail() {
                wx.setStorageSync("token", '')
                // wx.redirectTo({
                //   url: '../index/index',
                // })
              }
            })
          }
        })

      }
    }
  })
  return token;
}
function alert(msg, time = 3000) {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: time,
    mask: true
  });
}
/**
 *  延迟跳转
 * @param redirect_url 延迟跳转url地址
 * @param timer 延迟时间，默认3秒
 */
function deplay_redirect(redirect_url, timer = 3000) {
  timer = setTimeout(function () {
    wx.navigateTo({
      url: redirect_url
    })
  }, timer);
}

function deplay_navigateTo(redirect_url, timer = 3000) {
  timer = setTimeout(function () {
    wx.navigateTo({
      url: redirect_url
    })
  }, timer);
}
function navigateBack(deltaz = 1, timer = 3000) {
  // wx.navigateBack({
  //   delta: deltaz
  // })
  timer = setTimeout(function () {
    wx.navigateBack({
      delta: deltaz
    })
  }, timer);
}
/**
 * 用于网络 GET 请求, 标准格式: {url:api, method: GET, data: xxxx}
 */
function getJSON(form = {}, call_success, ErrorMsg) {
  var that = this;
  var apiUrl = (form.apiUrl == "") ? '' : form.apiUrl;
  var formData = form.hasOwnProperty("data") ? form.data : {};
  var header = { 'content-type': 'application/json', 'channel': 'let', 'build': build } // 默认值
  if (!form.hasOwnProperty("token")) {
    header = {
      'content-type': 'application/json', // 默认值
      'token': that.getToken(),
      'channel': 'let',
      'build': build
    }
  }
  wx.request({
    url: apiUrl,
    data: formData,
    method: 'GET',
    header: header,
    success: function (res) {
      if (res.statusCode == 500) {
        return that.info_dialog('无效请求')
      }
      if (res.data.status == 200) {
        // console.log(res.data)
        if (res.data.result.hasOwnProperty("hint") && JSON.stringify(res.data.result.hint) != "{}") {
          wx.navigateTo({
            url: '../result/index?hint=' + JSON.stringify(res.data.result.hint),
          })
        } else {
          call_success(res)
        }

      } else if (res.data.status == 801) {
        if (form.apiUrl.indexOf("config") > -1) {
          return false
        }
        wx.setStorageSync("token", 1)
        wx.reLaunch({
          url: '../index/index',
        })
        // that.getToken(801, form, call_success,"get")
      } else if (res.data.status == 802) {
        wx.reLaunch({
          url: '../ban/index',
        })
      } else {
        if (res.data.status == 414 && res.data.result.hasOwnProperty("hint") && JSON.stringify(res.data.result.hint) != "{}") {
          wx.navigateTo({
            url: '../result/index?hint=' + JSON.stringify(res.data.result.hint),
          })
        } else {
          if (warning) {
            warning(res)
          }
          that.info_dialog(res.data.message)
        }
      }
    },
    fail: function (ErrorMsg1) {
      if (ErrorMsg) {
        ErrorMsg(ErrorMsg1)
      }
      console.log(ErrorMsg1.errMsg)
      that.info_dialog(ErrorMsg1.errMsg)
    }
  });
  // wx.hideLoading();
}

/**
 * 用于网络 POST 请求, 标准格式: {url:api, method: GET, data: xxxx}, success, fail
 */
function postJSON(form = {}, call_success, warning, ErrorMsg) {
  var that = this;
  var apiUrl = (form.apiUrl == "") ? '' : form.apiUrl;
  var formData = form.hasOwnProperty("data") ? form.data : {};
  var header = { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', 'channel': 'let', 'build': build } // 默认值
  if (!form.hasOwnProperty("token")) {
    header = {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', // 默认值
      'token': that.getToken(),
      'channel': 'let',
      'build': build
    }
  }
  wx.request({
    url: apiUrl,
    data: formData,
    method: 'POST',
    header: header,
    success: function (res) {
      // console.log(res)
      if (res.statusCode == 500) {
        return that.info_dialog('无效请求')
      }
      if (res.data.status == 200) {
        if (res.data.result.hasOwnProperty("hint") && JSON.stringify(res.data.result.hint) != "{}") {
          wx.navigateTo({
            url: '../result/index?hint=' + JSON.stringify(res.data.result.hint),
          })
        } else {
          call_success(res)
        }
      } else if (res.data.status == 801) {
        that.putSync('formData', formData, 600)
        wx.setStorageSync("token", 1)
        wx.reLaunch({
          url: '../index/index',
        })
      } else if (res.data.status == 802) {
        wx.reLaunch({
          url: '../ban/index',
        })
      } else {
        if (res.data.status == 414 && res.data.result.hasOwnProperty("hint") && JSON.stringify(res.data.result.hint) != "{}") {
          wx.navigateTo({
            url: '../result/index?hint=' + JSON.stringify(res.data.result.hint),
          })
        } else {
          if (warning) {
            warning(res)
          }
          that.info_dialog(res.data.message)
        }

      }
    },
    fail: function (ErrorMsg1) {
      if (ErrorMsg) {
        ErrorMsg(ErrorMsg1)
      }
      that.info_dialog(ErrorMsg1.errMsg)
    }
  });
  // wx.hideLoading();
}


/**
 * 验证网址是否有效
 * @param url
 * @returns {boolean}
 */
function isValidURL(url) {
  if (/^(http[s]?):\/\/.+$/.test(url)) {
    return true;
  }
  return false;
}

/**
 * 正在加载提示
 */
function loading(msg = '') {
  if (msg == '') {
    wx.showLoading({
      title: "正在加载",
      mask: true
    });
    return;
  }
  wx.showLoading({
    title: msg,
    mask: true
  });
}

function dateTimes(dateTime) {
  var date = "";
  let year = dateTime.getFullYear();
  let month = (dateTime.getMonth().toString()).length < 2 ?
    "0" + (dateTime.getMonth() + 1) : (dateTime.getMonth() + 1);
  let day = (dateTime.getDay().toString().length < 2) ?
    '0' + dateTime.getDay() : dateTime.getDay();
  let hours = dateTime.getHours();
  let minutes = (dateTime.getMinutes().toString().length < 2) ?
    "0" + dateTime.getMinutes() : dateTime.getMinutes();
  let seconds = (dateTime.getSeconds().toString().length < 2) ?
    "0" + dateTime.getSeconds() : dateTime.getSeconds();

  date = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  return date;
}

//日期对象格式化公共类方法
function dateFtt(fmt, date) {
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

function crtTimeFtt(fmt, value) {
  if (value != null) {
    var crtTime = new Date(value);
    return dateFtt(fmt, crtTime); //直接调用公共JS里面的时间类处理的办法
  }
}

/**
 * 提示框，默认只显示4秒
 * @param msg
 * @param time
 */
function info_dialog(msg, time = 3000) {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: time,
    mask: true
  });
}

/**
 * 获取用户登录ID
 * @param callback
 */
function loginOpenId(callback) {

}

/**
 * 用户确认框
 * @param title 提示标题
 * @param content 提示内容
 * @param callback 选择ok , 回调
 */
function ok_dialog(title, content, callback) {
  wx.showModal({
    // title: title,
    confirmColor: '#FF0000',
    content: content,
    success: function (sm) {
      if (sm.confirm) {
        callback(sm.confirm);
      } else if (sm.cancel) {
      }
    }
  })
}

//编码的方法
function base64encode(str) {
  var out, i, len;
  var c1, c2, c3;
  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt((c2 & 0xF) << 2);
      out += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out;
}
//解码的方法
function base64decode(str) {
  var c1, c2, c3, c4;
  var i, len, out;
  len = str.length;
  i = 0;
  out = "";
  while (i < len) {

    do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c1 == -1);
    if (c1 == -1)
      break;

    do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c2 == -1);
    if (c2 == -1)
      break;
    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

    do {
      c3 = str.charCodeAt(i++) & 0xff;
      if (c3 == 61)
        return out;
      c3 = base64DecodeChars[c3];
    } while (i < len && c3 == -1);
    if (c3 == -1)
      break;
    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

    do {
      c4 = str.charCodeAt(i++) & 0xff;
      if (c4 == 61)
        return out;
      c4 = base64DecodeChars[c4];
    } while (i < len && c4 == -1);
    if (c4 == -1)
      break;
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
  }
  return out;
}
function utf16to8(str) {
  var out, i, len, c;
  out = "";
  len = str.length;
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i);
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    }
  }
  return out;
}
function utf8to16(str) {
  var out, i, len, c;
  var char2, char3;
  out = "";
  len = str.length;
  i = 0;
  while (i < len) {
    c = str.charCodeAt(i++);
    switch (c >> 4) {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += str.charAt(i - 1);
        break;
      case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = str.charCodeAt(i++);
        char3 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x0F) << 12) |
          ((char2 & 0x3F) << 6) |
          ((char3 & 0x3F) << 0));
        break;
    }
  }
  return out;
}
function distance(la1, lo1, la2, lo2) {//计算经纬度的距离
  var La1 = la1 * Math.PI / 180.0;
  var La2 = la2 * Math.PI / 180.0;
  var La3 = La1 - La2;
  var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
  s = s * 6378.137; //地球半径
  s = Math.round((s * 10000) / 10000);
  return s
}
var dtime = 600000;
function putSync(k, v, t) {
  wx.setStorageSync(k, v)
  var seconds = parseInt(t);
  if (seconds > 0) {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000 + seconds;
    wx.setStorageSync(k + dtime, timestamp + "")
  } else {
    wx.removeStorageSync(k + dtime)
  }
}

function getSync(k, def) {
  var deadtime = parseInt(wx.getStorageSync(k + dtime))
  if (deadtime) {
    if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
      if (def) { return def; } else { return; }
    }
  }
  var res = wx.getStorageSync(k);
  if (res) {
    return res;
  } else {
    return def;
  }
}

function remove(k) {
  wx.removeStorageSync(k);
  wx.removeStorageSync(k + dtime);
}

function clear() {
  wx.clearStorageSync();
}

function scan() {
  var that = this;
  var show;
  that.loading()
  wx.scanCode({
    success: (res) => {
      that.postJSON({ apiUrl: apiurl.decode, data: { qrcode: res.result } }, function (res1) {
        var result = res1.data.result;
        if (result.action.length > 1) {
          var action = JSON.stringify(result.action);
          var code = JSON.stringify(result.code);
          wx.hideLoading()
          wx.navigateTo({
            url: '../edcs_choose/edcs_choose?action=' + action + '&code=' + code,
          })
        } else {
          that.postJSON({ apiUrl: apiurl.action, data: { action: result.action[0].key, code: result.code } }, function (res2) {
            var result2 = res2.data.result;
            console.log(result2)
            if (result2.control) {
              // var controlContrast = getApp().globalData.controlContrast, url='';
              // for (var i in controlContrast) {
              //   if (controlContrast[i].control == result2.control) {
              //     url = controlContrast[i].contrast
              //   }
              // }
              // if (result2.params.order_id) {
              //   url = url + result2.params.order_id
              // } else if (result2.params.shop_id) {
              //   url = url + result2.params.shop_id
              // }
              var url = result2.control.control
              if (JSON.stringify(result2.control.params) != "{}") {
                url = url + "?1=1"
                for (var i in result2.control.params) {
                  console.log(i, result2.control.params[i])
                  url = url + "&" + i + "=" + result2.control.params[i]
                }
              }
              wx.hideLoading()
              wx.navigateTo({
                url: url,
              })
            } else {
              that.alert(res2.data.message)
            }
          })
        }

      })
    },
    fail: (res) => {
      // that.alert("失败")
      that.hideLoading()
    },
    complete: (res) => {
    }
  })
}