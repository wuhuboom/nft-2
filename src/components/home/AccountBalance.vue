<template>
  <ul class="text-center color-primary m-b-24" @click="refresh">
    <li class="m-b-8">
      <p class="safe-icon m-t-20 m-b-8 center-center">
        <img class="d-img" src="@/assets/img/ntf/safeh1.png" alt="" />
      </p>
      <p class="m-b-4 font16">{{ $t("wallet.Account.Balance") }}</p>
      <p class="money-str m-b-4 color-fff">
        {{ numToFixed(moneyStr, $globalUnit.val) }}
      </p>

      <p class="m-t-4">
        <i class="iconfont font16 icon-shuaxin active"></i>
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
.safe-icon {
  img {
    width: 39px;
    height: 39px;
  }
}
.money-str {
  font-size: 26px;
  font-weight: 900;
}
</style>
