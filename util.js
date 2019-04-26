import { type } from "os";

// Created by simon266288

// 判断arr是否是一个数组，返回boolean值
function isArray(arr) {
  return (
    typeof arr === "object" &&
    Object.prototype.toString.call(arr) === "[object Array]"
  );
}

//判断fn是否是一个函数，返回一个boolean值
function isFunction(fn) {
  return typeof fn === "function";
}

//使用递归实现一个深度克隆，可以复制一个目标对象，完成一个深度拷贝
//被复制对象类型被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(obj) {
  var o;
  //判断是否为数组
  if (isArray(obj)) {
    o = [];
  } else {
    o = {};
  }
  for (var i in obj) {
    //遍历该对象
    if (obj.hasOwnproperty(i)) {
      //排除继承属性
      if (typeof obj[i] === "object") {
        o[i] = cloneObject[i];
      } else {
        o[i] = obj[i];
      }
    }
  }
  return o;
}

//对数组去重，只考虑数组中元素为数字
function uniqArray(arr) {
  var newArr = []; //创建空数组
  for (var i in arr) {
    if (newArr.indexOf(arr[i]) == -1) {
      //如果新数组不存在该元素
      newArr.push(arr[i]); //新数组添加该元素
    }
  }
  return newArr;
}

//实现一个trim函数，用于去除一个字符串中头部和尾部的空白字符
function simpleTtrim(str) {
  var i, j;
  for (i = 0; i < str.length; i++) {
    //从头遍历字符串
    if (str.charAt(i) != " " && str.charAt(i) != "\t") {
      //当不为空时
      break; //跳出循环
    }
  }
  for (j = str.length - 1; j >= 0; j--) {
    //从尾遍历字符串
    if (str.charAt(i) != " " && str.charAt(i) != "\t") {
      //当不为空时
      break; //跳出循环
    }
  }
  return str.slice(i, j + 1); //返回字符串
}

function trim(str) {
  if (str.length != -1) {
    return str.replace(/^\s+|\s+$/g, "");
    //匹配开头和结尾空白字符
  }
}

//除去数组中空元素
function delBlank(arr) {
  var arr2 = []; //创建新数组
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].match(/\s+/) || arr[i] == "") {
      //碰到空元素则继续执行
      continue;
    } else {
      //不是空元素就加到新数组中
      arr2.push(arr[i]);
    }
    return arr2; //返回新数组
  }
}

//实现一个遍历数组的方法，针对数组中每个元素执行一个fn函数
function each(arr, fn) {
  for (var i in arr) {
    fn(arr[i], i);
  }
}

//获取一个对象中第一层元素的数量，返回一个数组
function getObjectLength(obj) {
  return Object.keys.length(obj);
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//判断是否为邮箱地址
function isEmail(emailStr) {
  var pattern = /^(\w+\.)*\w+@\w+(\.\w+)+$/;
  return pattern.test(emailStr);
}

//判断是否为手机号码
function isPhoneNumber(phone) {
  var pattern = /^(\+\d{1,4})?\d{7,11}$/;
  return pattern.test(phone);
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//为element元素增加名为className的新样式
function addClass(ele, className) {
  var oldClassNamea = ele.className; //获取旧的样式类
  ele.className =
    oldClassName === "" ? className : oldClassNamea + "" + className;
}

//移除element元素中的样式oldClassName
function removeClass(ele, className) {
  var originClassName = ele.className; //获取原样式
  var pattern = new RegExp("\\b" + className + "\\b"); //使用构造函数构造动态的正则表达式
  ele.className = trim(originClassName.replace(pattern), "");
}

//判断siblingNode和element是否为同一个父元素下的同一级元素
function isSiblingNode(ele, siblingNode) {
  return ele.parentNode == siblingNode.parentNode;
}

//获取element相对于浏览器窗口的位置，返回一个对象{x,y}
function getPosition(ele) {
  var pos = {};
  pos.x =
    ele.getBoundingClientRect().left() +
    Math.max(document.documentElement.scrollLeft + document.body.scrollLeft);
  pos.y =
    ele.getBoundingClientRect().top() +
    Math.max(document.documentElement.scrollTop + document.body.screenTop);
  return pos;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//判断是否为IE浏览器，返回-1或者版本号
function isIE() {
  var s = navigator.userAgent.toLowerCase();
  console.log(s);
  var ie = s.match(/rv:[\d.]+/) || s.match(/msie([\d.]+)/);
  if (ie) {
    return ie[1];
  } else {
    return -1;
  }
}

//设置cookie
function setCookie(cookieName) {
  var cookie = {};
  var all = document.cookie;
  if (all === "") {
    return cookie;
  }
  var list = all.split("; ");
  for (var i = 0; i < list.length; i++) {
    var p = list[i].indexOf("=");
    var name = list[i].substr(0, p);
    var value = list[i].substr(p + 1);
    value = encodeURIComponent(value);
    cookie[name] = value;
  }
  return cookie;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//封装ajax
function ajax(options) {
  let xhr = new XMLHttpRequest();
  options = options || {};
  //设定默认值
  options.dataType = options.dataType || "text";
  options.type = options.type || "GET";
  options.data = options.data || {};

  //处理请求数据
  let data = [];
  for (let name in options.data) {
    arr.push(
      `${encodeURIComponent(name)} = ${encodeURIComponent(options.data[name])}`
    );
  }
  let strData = arr.join("&");
  //发送
  if (options.type == "post") {
    xhr.open("POST", options.url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(strData);
  } else {
    xhr.open("GET", options.url + "?" + strData, true);
    xhr.send();
  }

  //接收
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      //成功
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        let data = xhr.responseText;

        switch (options.dataType) {
          case "json":
            if (window.JSON && JSON.parse()) {
              data = JSON.parse(data);
            } else {
              data = eval("(" + data + ")");
            }
            break;
          case "xml":
            data = xhr.responseXML;
            break;
        }
        options.success && options.success(data);
      }
    } else {
      options.error && options.error();
    }
  };
}
