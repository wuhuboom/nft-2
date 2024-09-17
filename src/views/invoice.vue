<template>
  <div class="invoice-page font12 p-l-12 p-r-12">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t(`user.trade.title4.text`)"
      :styleObj="{ backgroundColor: 'tra' }"
    ></AppTopBar>
    <ul class="m-t-16">
      <li
        class="justify-between nav-item align-center m-b-8 p-l-16 p-r-16"
        v-for="(item, idx) in navs"
        :key="idx"
        @click="$router.push(item.path)"
      >
        <p class="align-center">
          <img class="d-img m-r-12" :src="item.icon" alt="" />
          {{ item.title }}
        </p>
        <van-icon size="16" name="arrow" />
      </li>
    </ul>
  </div>
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
          icon: require("@/assets/img/ntf3/user/124556@2x.png"),
        },
        {
          title: i18n.t("invoice.menu2.text"),
          path: "/pages/user/withdrawRecord",
          icon: require("@/assets/img/ntf3/user/124558@2x.png"),
        },
        {
          title: i18n.t("invoice.menu3.text"),
          path: "/pages/user/balanceRecord",
          icon: require("@/assets/img/ntf3/user/124560@2x.png"),
        },
        {
          title: i18n.t("invoice.menu4.text"),
          path: "/pages/invest/record",
          icon: require("@/assets/img/ntf3/user/124562@2x.png"),
        },
      ],
    };
  },
};
</script>
<style scoped lang="less">
.invoice-page {
  .nav-item {
    padding: 0 16px;
    height: 52px;
    border-radius: 20px;
    background-color: #17181c;
    img {
      height: 24px;
      width: 24px;
    }
  }
}
</style>
