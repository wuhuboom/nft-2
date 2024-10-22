<template>
  <div id="app" :style="topBar">
    <router-view name="AppTopBar"></router-view>
    <router-view :key="$router.currentRoute.fullPath" />
    <router-view name="AppBtmBar"></router-view>
    <MaintainDialog />
    <RootDialog ref="RootDialog" />
    <TaxPayment v-if="user.id && $route.name !== 'Recharge'" />
  </div>
</template>
<script>
import MaintainDialog from "@/views/components/MaintainDialog.vue";
import RootDialog from "@/views/components/RootDialog.vue";
import TaxPayment from "@/views/components/TaxPayment.vue";
import i18n from "@/locale";

export default {
  name: "App",
  components: {
    MaintainDialog,
    RootDialog,
    TaxPayment,
  },
  data() {
    return {};
  },
  watch: {
    $route() {
      this.$refs.RootDialog.ajaxVaid();
      //this.$store.commit("setMainShow", { show: false });
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    topBar() {
      if (!this.$store.state.setPdTop) {
        return {
          paddingTop: 0,
        };
      }
      return {};
    },
  },
  created() {
    this.$store.commit("setBalanceRecord", [
      { value: 0, label: i18n.t("dropdown.billing.all.title.text") },
      {
        label: i18n.t("dropdown.billing.rebate"),
        value: [5, 21, 24, 25, 26, 27, 28],
        text: "返利",
      },
      { label: i18n.t("investment"), value: [3, 4, 9], text: "投资" },
      {
        label: i18n.t("home.index.recharge.text"),
        value: [1, 11],
        text: "充值",
      },
      {
        label: i18n.t("home.index.withdraw.text"),
        value: [2, 12, 33],
        text: "提现",
      },
      {
        label: i18n.t("backapi.self.home.tool.wheel.text"),
        value: [29, 30],
        text: "抽奖",
      },
      {
        label: i18n.t("dropdown.billing.other"),
        value: [6, 8, 34, 36],
        key: "other",
        text: "其他",
      },
    ]);
  },
};
</script>
<style lang="less">
#app {
  padding-top: @navHeight;

  .appp-top-bar {
    position: fixed;
    height: @navHeight;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    .appp-top-cont {
      height: 44px;
      width: 100%;
    }
    .appp-top-bar-title {
      font-size: 16px;
      // font-weight: bold;
      color: #fff;
    }
    .icon-button {
      background-color: transparent;
      border-color: transparent;
      color: var(--color-text);
      .van-icon {
        font-size: 24px;
      }
    }
  }
}
</style>
