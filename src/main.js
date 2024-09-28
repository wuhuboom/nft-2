import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./locale";
import VueClipboard from "vue-clipboard2";
import global from "./components/global";
import "amfe-flexible";
// eslint-disable-next-line no-unused-vars
import semver from "semver";
import userPic from "@/assets/img/user@2x.png";
import element from "./plugins/element";
// semver.compare(客户端版本, 服务器版本) < 0 时，提示更新
// console.log(
//   "process.env.VUE_APP_VERSION",
//   semver.compare(process.env.VUE_APP_VERSION, "0.1.9")
// );
import { publicDateTimeSolt } from "@/plugins/publicTool.js";
// 公共样式
import "@/assets/style/base.less";
import "@/assets/font/iconfont.css";
import "@/assets/style/resVant.scss";
import { Locale } from "vant";
// 引入英文语言包
import enUS from "vant/es/locale/lang/en-US";

Locale.use("en-US", enUS);
Vue.config.productionTip = false;
Vue.use(global);
Vue.use(VueClipboard);
Vue.use(element);
Vue.filter("removeEsports", (value) => {
  return (value || "").trim().replace(/esports/gi, "");
});
Vue.filter("timestampStr", (value) => {
  if (value && value != "---" && value != 0) {
    return publicDateTimeSolt(value, 1);
  } else if (value === "---" || value === 0) {
    return value;
  }
});
const countTrailingZeros = (number) => {
  // 将数转换为字符串
  var numberString = number?.toString();

  // 使用正则表达式匹配尾数的0
  var regex = /0+$/;
  var trailingZeros = numberString?.match(regex);

  // 如果匹配到尾数的0，则返回0的个数
  if (trailingZeros) {
    return trailingZeros[0].length;
  } else {
    return 0;
  }
};
Vue.prototype.numToFixed = (v, len) => {
  len = len || 1; // 保留几位小数
  if (v === null || v === undefined) {
    return 0;
  }
  // 将数字转换为字符串，并找到小数点的位置
  let numStr = v.toString();
  let decimalIndex = numStr.indexOf(".");

  // 如果没有小数点，直接在末尾添加指定数量的零
  if (decimalIndex === -1) {
    numStr += ".";
    for (let i = 0; i < len; i++) {
      numStr += "0";
    }
  }
  // 如果有小数点，将其后面的数字截取指定数量
  else {
    numStr = numStr.substring(0, decimalIndex + len + 1);
  }

  // 最后将结果转换回数字并返回
  return Number(numStr);
};
const num =
  process.env.NODE_ENV === "production"
    ? window.UNIFIED_NUMBER
    : process.env.VUE_APP_UNIFIED_NUMBER;
//余额要除以多少
Vue.prototype.$globalNum = {
  val: num,
};
//保留几位小数
Vue.prototype.$globalUnit = {
  val: countTrailingZeros(num),
};
Vue.prototype.formatDate = (time, fmt) => {
  if (typeof time === "string") {
    if (time.length === 10) {
      time += " 00:00:00";
    }

    var t = time.split(/[- :]/);

    // Apply each element to the Date function
    var d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
    var date = new Date(d);
  } else {
    // eslint-disable-next-line no-redeclare
    var date = new Date(time);
  }

  // let date = new Date(time)
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};
Vue.prototype.$userPic = userPic;
Vue.prototype.divide = (v, fix = true) => {
  if (!fix) return Math.trunc(v * 100) / 100;
  return Math.trunc((v * 100) / num) / 100;
};
Vue.prototype.$ToSeconds = (timestamp) => {
  // 将时间戳转换为数字
  const ts = Number(timestamp);
  // 判断时间戳是否为毫秒级（13位且在合理范围内）或秒级（10位且在合理范围内）
  if (ts > 1e12) {
    return timestamp / 1000;
  } else if (ts > 1e9 && ts < 1e12) {
    return timestamp; // 秒级时间戳
  }

  return timestamp;
};
Vue.directive("draggable", {
  bind(el) {
    const dragElement = (event, type) => {
      //有overflow-hidden 就不添加
      if (
        !document.querySelector("body").classList.contains("overflow-hidden")
      ) {
        document.querySelector("body").classList.add("overflow-hidden");
      }

      const disX =
        type === "touch"
          ? event.touches[0].clientX - el.offsetLeft
          : event.clientX - el.offsetLeft;
      const disY =
        type === "touch"
          ? event.touches[0].clientY - el.offsetTop
          : event.clientY - el.offsetTop;

      const move = (event) => {
        //添加 类 overflow-hidden
        let left =
          type === "touch"
            ? event.touches[0].clientX - disX
            : event.clientX - disX;
        let top =
          type === "touch"
            ? event.touches[0].clientY - disY
            : event.clientY - disY;

        // Ensure the element stays within the screen boundaries
        const maxWidth = window.innerWidth - el.offsetWidth;
        const maxHeight = window.innerHeight - el.offsetHeight;

        if (left < 0) left = 0;
        if (top < 0) top = 0;
        if (left > maxWidth) left = maxWidth;
        if (top > maxHeight) top = maxHeight;

        el.style.left = left + "px";
        el.style.top = top + "px";
      };

      const stop = () => {
        //移除 类 overflow-hidden
        document.removeEventListener(
          type === "touch" ? "touchmove" : "mousemove",
          move
        );
        document.removeEventListener(
          type === "touch" ? "touchend" : "mouseup",
          stop
        );
      };

      document.addEventListener(
        type === "touch" ? "touchmove" : "mousemove",
        move
      );
      document.addEventListener(
        type === "touch" ? "touchend" : "mouseup",
        stop
      );
    };
    //结束后删除类
    const stop = (el) => {
      document.querySelector("body").classList.remove("overflow-hidden");
      console.log("stop", el);
      //重置 删除 style 的 left
      document.querySelector(".js-lot-icon-app").style.left = "";
    };
    el.addEventListener("mousedown", (e) => dragElement(e, "mouse"));
    el.addEventListener("touchstart", (e) => dragElement(e, "touch"));
    el.addEventListener("mouseup", (e) => stop(e));
    el.addEventListener("touchend", (e) => stop(e));
  },
});

const app = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
export default app;
