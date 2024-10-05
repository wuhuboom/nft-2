<template>
  <ul
    class="text-center m-l-16 m-t-16 m-r-16 m-b-24 account-balance color-fff"
    @click="refresh"
  >
    <li class="m-b-8">
      <p class="m-b-4 font16">{{ $t("wallet.Account.Balance") }}</p>
      <p class="money-str m-b-4 center-center">
        {{ numToFixed(moneyStr, $globalUnit.val) }}
        <i class="iconfont m-l-8 font16 icon-shuaxin"></i>
      </p>
    </li>
  </ul>
</template>

<script>
import userApi from "@/api/user";
export default {
  name: "ChangeRecord",
  data() {
    return {
      data: {},
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
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
    async safeInfo() {
      this.loading = true;
      const [err, res] = await userApi.safeInfo();
      this.loading = false;
      if (err) return;
      this.data = res.data;
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
  },
};
</script>

<style scoped lang="less">
.account-balance {
  border-radius: 12px;
  background: url("@/assets/img/ntf3/40363@2x.webp") no-repeat center center;
  height: 186px;
  background-size: 100% 100%;
  position: relative;
  padding: 24px 16px;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-filter: blur(50px);
    filter: blur(50px);
    background-color: #056351;
    border-radius: 12px;
    opacity: 0.41;
  }
  & > li {
    position: relative;
    z-index: 3;
  }
}
.money-str {
  font-size: 26px;
  font-weight: 900;
}
</style>
