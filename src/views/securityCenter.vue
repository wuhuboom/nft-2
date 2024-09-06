<template>
  <div class="wallet-page font12 p-r-12 p-l-12">
    <AppTopBar
      :topBarTitle="$t('user.Report.Management')"
      :styleObj="{ backgroundColor: 'transparent' }"
    ></AppTopBar>
    <div>
      <ul
        class="align-center menu font16 m-t-12 m-b-12 p-l-12 p-r-12"
        :key="idx"
        v-for="(item, idx) in list"
        @click="goTo(item.name)"
      >
        <li class="icon m-r-16">
          <img class="d-img" :src="item.icon" alt="" />
        </li>
        <li class="flex-1 align-center justify-between">
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";
import i18n from "@/locale";
export default {
  name: "WithdrawView",
  data() {
    return {
      loading: false,
      data: {},
      playerConfig: {},
    };
  },
  computed: {
    list() {
      const arr = [
        {
          icon: require("@/assets/img/ntf/set1.png"),
          text: i18n.t("security.pass.text"),
          name: "ForgetPassword",
          active: false,
        },
        {
          icon: require("@/assets/img/ntf/set2.png"),
          text: `${i18n.t("security.fun.pass.text")}`,
          name: "FundPasswordSetting",
          active: false,
        },
        // {
        //   icon: require("@/assets/img/red/security3.png"),
        //   text: `${i18n.t("fuc.balance.details")}`,
        //   name: "TransferSelf",
        //   active: false,
        // },
        {
          icon: require("@/assets/img/ntf/set3.png"),
          text: `${i18n.t("security.bank.card.text")}`,
          name: "BankAccountList",
          active: false,
        },
        // {
        //   icon: require("@/assets/img/red/security5.png"),
        //   text: `${i18n.t("agency.center.user.center.text")}`,
        //   name: "SafeBilling",
        //   active: false,
        // },
        {
          icon: require("@/assets/img/ntf/set4.png"),
          text: `${i18n.t("security.phone.text")}`,
          name: "UpdataPhone",
          active: false,
        },
        {
          icon: require("@/assets/img/ntf/set5.png"),
          text: `${i18n.t("security.mail.text")}`,
          name: "UpdataEmail",
          active: false,
        },
      ];
      return arr;
    },
    moneyStr() {
      return this.data.money / this.$globalNum.val;
    },
    todayIncomeStr() {
      return this.data.todayIncome / this.$globalNum.val;
    },
    totalIncomeStr() {
      return this.data.totalIncome / this.$globalNum.val;
    },
    symbolStr() {
      return this.data.symbol;
    },
  },
  methods: {
    goTo(name) {
      this.$router.push({ name });
    },
    async safeInfo() {
      this.loading = true;
      const [err, res] = await userApi.safeInfo();
      this.loading = false;
      if (err) return;
      this.data = res.data;
    },
    async getConfig() {
      const [err, res] = await userApi.palyerConfig();
      if (err) return;
      this.playerConfig = res.data;
      console.log(this.playerConfig);
    },
    async refresh() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      await this.safeInfo();
      this.$toast.clear();
    },
  },
  created() {
    this.safeInfo();
    this.getConfig();
  },
  mounted() {
    document.querySelector("body").classList.add("gray-bg-img");
  },
  destroyed() {
    document.querySelector("body").classList.remove("gray-bg-img");
  },
};
</script>
<style scoped lang="less">
.wallet-page {
  .money-str {
    font-size: 26px;
    font-weight: 900;
  }
  .black-line {
    height: 5px;
    background-image: linear-gradient(
      to right,
      #af1816,
      #af1816 5%,
      #0c0c0c 5%,
      #0c0c0c
    );
  }
  .menu {
    height: 52px;
    color: #cacbce;
    background-color: rgba(255, 255, 255, 0.04);
    border-radius: 8px;
    img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
