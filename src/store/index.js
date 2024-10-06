/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import userApi from "@/api/user";
import auth from "@/plugins/auth";
import util from "@/plugins/util";
import delang from "@/assets/img/de-lang.webp";
import dzlang from "@/assets/img/dz-lang.webp";
import app from "@/main";
import { set } from "nprogress";
Vue.use(Vuex);
const lang = location.href.includes("zmkm") ? "zh" : "";
export default new Vuex.Store({
  state: {
    shoeName: true,
    withdrawalLimitMsg: "",
    showMain: {
      show: false,
      msg: "",
    },
    topBar: {
      height: 0,
    },
    setPdTop: true,
    config: {
      area_code: [],
    },
    user: {},
    lang: lang || localStorage.getItem("lang") || "en",
    // 令牌  初始化从本地获取 English  Germany Algeria India France
    token: auth.getToken(),
    langOpt: [
      {
        label: "EN",
        text: "English",
        value: "en",
        icon: require("@/assets/img/lang/en.png"),
      },
      {
        label: "IN",
        icon: require("@/assets/img/lang/in.png"),
        text: "India",
        value: "in",
      },
      {
        label: "RU",
        text: "Germany",
        icon: require("@/assets/img/lang/ru.png"),
        value: "ru",
      },
      {
        label: "NE",
        icon: require("@/assets/img/lang/ne.png"),
        text: "France",
        value: "np",
      },
      {
        label: "FR",
        text: "Germany",
        icon: require("@/assets/img/lang/fr.png"),
        value: "fr",
      },

      {
        label: "DZ",
        icon: dzlang,
        text: "Algeria",
        value: "dz",
      },
      {
        label: "DE",
        text: "Germany",
        icon: delang,
        value: "de",
      },
      {
        label: "PT",
        text: "Germany",
        icon: require("@/assets/img/pt.png"),
        value: "pt",
      },
      {
        label: "ES",
        text: "Germany",
        icon: require("@/assets/img/es.png"),
        value: "es",
      },
    ],
    serveData: {},
    fbMsg: {
      hasMsg: 0,
    },
    paySet: null,
    safeConfig: {},
    balanceRecord: [],
    recroed: {
      query: {},
      video: [],
    },
    fromRoute: {},
    safeData: {},
  },
  getters: {
    defaultCode(state) {
      if (!state.config.area_code.length) return "";
      return state.config.area_code[0];
    },
  },
  mutations: {
    changeSafe(state, data) {
      console.log(data);
      state.safeData = data;
    },
    setFromRoute(state, data) {
      state.fromRoute = data;
    },
    setRecroed(state, data) {
      state.recroed = data;
    },
    setBalanceRecord(state, data) {
      state.balanceRecord = data;
    },
    setwithdrawalLimitMsg(state, data) {
      state.withdrawalLimitMsg = data;
    },
    setShowName(state, data) {
      state.shoeName = data;
    },
    setMainShow(state, data) {
      Object.assign(state.showMain, data);
    },
    setSafeConfig(state, data) {
      state.safeConfig = data;
    },
    changepaySet(state, data) {
      state.paySet = data;
    },
    setFbMsg(state, data) {
      state.fbMsg = data;
    },
    setServeData(state, data) {
      state.serveData = data;
    },
    setPdTop(state, data) {
      state.setPdTop = data;
    },
    setLang(state, lang) {
      state.lang = lang;
      localStorage.setItem("lang", lang);
      location.reload();
    },
    setToken(state, token) {
      state.token = token;
      auth.setToken(token);
    },
    setUser(state, data) {
      auth.setToken(JSON.stringify(data), "userInfo");
      state.user = data;
    },
    loginOut(state) {
      state.paySet = null;
      state.user = {};
      auth.clearToken();
    },
    setCodeList(state, data) {
      state.config = data;
    },
    goServe(state) {
      if (!state.serveData.serviceAddr) return;
      location.href = state.serveData.serviceAddr;
      //window.open(state.serveData.serviceAddr);
    },
  },
  actions: {
    async appDownload() {
      const appType = util.detectDevice();
      const [err, res] = await userApi.appUrl({ appType });
      if (err) return;
      const item = res.data.find((v) => v.appType === appType);
      if (!item) return;
      await userApi.appCount({ id: item.id });
      window.location.href = item.appUrl;
    },
    async getCodeList({ commit }, params) {
      const [err, result] = await userApi.authSysconfig();
      if (err) return;
      commit("setCodeList", result.data);
      console.log(params);
      commit("setMainShow", {
        show: false,
        msg: "",
      });
    },
    async getInfo({ commit }) {
      const [err, result] = await userApi.userInfo();
      if (err) return [err];
      commit("setUser", result.data);
      return [null, result];
    },
    async setSafeConfig({ commit }) {
      const [err, result] = await userApi.fbConf();
      if (err) return [err];
      commit("setSafeConfig", result.data);
      return [null, result];
    },
    async getServeData({ commit }, open = 0) {
      if (open) {
        app.$toast.loading({
          duration: 0,
          forbidClick: true,
        });
      }
      const token = auth.getToken();
      const [err, result] = await userApi[
        `${token ? "servReq" : "servTmpReq"}`
      ]();
      app.$toast.clear();
      if (err) {
        if (Array.isArray(err.data) && err.data.length && open) {
          app.$toast(err.data[0].msg);
        }
        return [err];
      }
      if (open) {
        const host = window.btoa(window.location.origin);
        const link = result.data.serviceAddr;
        location.href =
          link.indexOf("?") !== -1
            ? `${link}&toUrl=${host}`
            : `${link}?toUrl=${host}`;
      } else {
        commit("setServeData", result.data);
        return [null, result];
      }
    },
    async getHasMsg({ commit }) {
      const [err, result] = await userApi.hasMsg();
      if (err) return [err];
      commit("setFbMsg", result.data);
      return [null, result];
    },
    async safeInfo({ commit }) {
      const [err, res] = await userApi.safeInfo();
      if (err) return;
      commit("changeSafe", res.data);
    },
  },
  modules: {},
});
