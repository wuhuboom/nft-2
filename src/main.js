import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./locale";
import VueClipboard from "vue-clipboard2";
import global from "./components/global";
import "amfe-flexible";
import element from "./plugins/element";
// 公共样式
import "@/assets/style/base.less";
import "@/assets/font/iconfont.css";
import "@/assets/style/resVant.scss";
import { Locale } from "vant";
// 引入英文语言包
import enUS from "vant/es/locale/lang/en-US";
import VueLuckyCanvas from "@lucky-canvas/vue";
Vue.use(VueLuckyCanvas);
Locale.use("en-US", enUS);
Vue.config.productionTip = false;
Vue.use(global);
Vue.use(VueClipboard);
Vue.use(element);

const app = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
export default app;
