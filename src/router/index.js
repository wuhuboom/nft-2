import Vue from "vue";
import VueRouter from "vue-router";
import auth from "@/plugins/auth";
//import app from "@/main";
Vue.use(VueRouter);
import store from "@/store";
import Nprogress from "nprogress";
//import AppTopBar from "@/components/global/AppTopBar";
//import AppBtmBar from "@/components/global/AppBtmBar";
import app from "@/main";
const routes = [
  {
    path: "/",
    name: "home",
    components: {
      default: () => import("@/views/index.vue"),
      //AppBtmBar,
    },
  },
  {
    path: "/invoice",
    name: "invoice",
    components: {
      default: () => import("@/views/invoice.vue"),
      //AppBtmBar,
    },
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
});
router.beforeEach(async (to, from, next) => {
  Nprogress.start();
  const ajaxs = [];
  if (!store.state.serveData.serviceAddr) {
    store.dispatch("getServeData");
  }
  if (!store.state.config.area_code.length) {
    ajaxs.push(store.dispatch("getCodeList"));
  }
  await Promise.all(ajaxs);
  if (auth.getToken() && !store.state.user.id) {
    const [error] = await store.dispatch("getInfo");
    if (error && auth.getToken("userInfo")) {
      store.commit("setUser", JSON.parse(auth.getToken("userInfo")));
    }
  }
  // if (auth.getToken()) {
  //   if (to.path.includes("/login")) {
  //     Nprogress.done();
  //     next("/");
  //   } else {
  //     next();
  //   }
  // } else {
  //   if (to.path.includes("/login")) {
  //     next();
  //   } else {
  //     Nprogress.done();
  //     next("/login/SignIn");
  //   }
  // }
  next();
});
router.afterEach((to, from) => {
  store.commit("setPdTop", true);
  Nprogress.done();
  app.$store.commit("setFromRoute", from);
});
export default router;
