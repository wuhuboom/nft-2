<template>
  <div class="index-page font12 p-l-12 p-r-12">首页</div>
</template>

<script>
import i18n from "@/locale";
export default {
  name: "balanceRecordView",
  data() {
    return {
      navs: [
        {
          title: i18n.t("invoice.menu1.text"),
          path: "/pages/function/rechargeHistory",
        },
        {
          title: i18n.t("invoice.menu2.text"),
          path: "/pages/user/withdrawRecord",
        },
        {
          title: i18n.t("invoice.menu3.text"),
          path: "/pages/user/balanceRecord",
        },
        {
          title: i18n.t("invoice.menu4.text"),
          path: "/pages/invest/record",
        },
      ],
    };
  },
  created() {
    this.$store.commit("setPdTop", true);
  },
};
</script>
<style scoped lang="less">
.invoice-page {
  .nav-item {
    height: 38px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
