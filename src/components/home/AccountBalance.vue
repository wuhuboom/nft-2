<template>
  <ul
    class="text-center m-l-16 m-t-16 m-r-16 m-b-24 account-balance color-fff"
    @click="refresh"
  >
    <li class="m-b-8">
      <p class="m-b-4 font16">{{ $t("wallet.Account.Balance") }}</p>
      <p class="money-str m-b-4">
        {{ numToFixed(moneyStr, $globalUnit.val) }}
      </p>
      <p class="m-t-4">
        <i class="iconfont font16 icon-shuaxin"></i>
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
  background-color: var(--main);
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
