<template>
  <ul class="justify-between nvas" :class="className">
    <li
      class="center-center flex-1"
      :class="{ 'bg-active': type === 0 }"
      @click="$router.replace({ name: skip1.name })"
    >
      <p>{{ skip1.text }}</p>
    </li>
    <li
      class="center-center flex-1"
      :class="{ 'bg-active': type === 1 }"
      @click="$router.replace({ name: skip2.name })"
    >
      <p>{{ skip2.text }}</p>
    </li>
  </ul>
</template>

<script>
import i18n from "@/locale";
export default {
  name: "HistoryNav",
  data() {
    return {};
  },
  props: {
    className: {
      type: String,
      default: "m-t-12",
    },
    type: {
      type: Number,
      default: 0,
    },
    skip1: {
      type: Object,
      default: () => {
        return {
          name: "FinancialPecords",
          text: i18n.t("me.recharge.text"),
        };
      },
    },
    skip2: {
      type: Object,
      default: () => {
        return {
          name: "WithdrawRecord",
          text: i18n.t("me.withdraw.text"),
        };
      },
    },
  },
  components: {},
  computed: {
    // getEstimateProfit() {
    //   return this.amount * this.score.antiPerCent;
    // },
    getEstimateProfit() {
      if (this.amount) {
        return this.numToFixed(
          this.amount * (this.payRate / 100 + this.vipRate / 100) -
            this.feeAmount / this.$globalNum.val,
          this.$globalUnit.val
        );
      } else {
        return "0.00";
      }
    },
  },
};
</script>
<style scoped lang="less">
.nvas {
  border-radius: 8.9px;
  background-color: #333335;
  & > li {
    height: 32px;
    border-radius: 8.9px;
  }
  & > li.bg-active {
    background-color: var(--main);
    color: #fff;
  }
}
</style>
