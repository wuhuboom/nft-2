<template>
  <div class="wallet-page font12">
    <AppTopBar :topBarTitle="$t('fuc.safe.text')">
      <template #right>
        <van-icon
          class="color-fff"
          @click="$router.push({ name: 'Explanation' })"
          size="24"
          name="question-o"
        />
      </template>
    </AppTopBar>
    <AccountBalance />

    <div class="justify-around menu text-center m-b-32">
      <ul :key="idx" v-for="(item, idx) in list" @click="goTo(item.name)">
        <li class="icon"><img class="d-img" :src="item.icon" alt="" /></li>
        <li class="m-t-8">
          <p>{{ item.text }}</p>
          <p>{{ item.text1 }}</p>
        </li>
      </ul>
    </div>
    <ul
      @click="$router.push({ name: 'SafeBilling' })"
      class="align-center color-fff safe-bill justify-between p-l-16 p-r-16 p-b-12 p-t-12"
    >
      <li class="font14 bold">{{ $t("backapi.self.safe.bill.data.text") }}</li>
      <li><van-icon name="arrow" size="18" /></li>
    </ul>
    <div class="p-l-16 p-r-16">
      <BillsList :list="results" />
      <NoData v-if="!results.length" />
    </div>
  </div>
</template>

<script>
import BillsList from "@/components/home/BillsList";
import userApi from "@/api/user";
import i18n from "@/locale";
import AccountBalance from "@/components/home/AccountBalance";
export default {
  name: "WithdrawView",
  components: {
    BillsList,
    AccountBalance,
  },
  data() {
    return {
      loading: false,
      data: {},
      playerConfig: {},
      results: [],
    };
  },
  computed: {
    list() {
      const arr = [
        {
          icon: require("@/assets/img/ntf/safeh3.png"),
          text: i18n.t("home.index.recharge.text"),
          name: "SafeRecharge",
          active: false,
        },
        {
          icon: require("@/assets/img/ntf/safeh2.png"),
          text: i18n.t("wallet.index.transfer.text"),
          text1: i18n.t("wallet.index.for.subordinate.text"),
          name: "TransferSub",
          active: false,
        },
        {
          icon: require("@/assets/img/ntf/safeh4.png"),
          text: i18n.t("wallet.index.transfer.text"),
          text1: i18n.t("wallet.index.for.self.text"),
          name: "TransferSelf",
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
    async getBill() {
      const [err, res] = await userApi.safeChangeLog({
        pageNo: 1,
        pageSize: 16,
      });
      if (err) return;

      this.results = res.data.results;
    },
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
    this.getBill();
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
  color: #9493ac;
  .safe-bill {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
    color: #fff;
    .icon {
      width: 38px;
      height: 38px;
      margin: 0 auto;
      img {
        display: block;
      }
    }
  }
}
</style>
