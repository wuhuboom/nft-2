<template>
  <div class="pagesinvest-item plans-item m-b-16">
    <div class="align-center plans-head p-b-8 m-b-8">
      <p class="invest-pic no-shrink m-r-8" v-if="item.planIcon">
        <img class="d-img" :src="item.planIcon" alt="" />
      </p>
      <ul class="align-center flex-1 space-between">
        <li>
          <p class="font14 m-b-4">{{ item.plan && item.plan.name }}</p>
          <p class="gray">{{ getType(item.type) }}</p>
        </li>
        <li class="rate-row">
          <p class="days">{{ $t("table.head.detail.text") }}</p>
        </li>
      </ul>
    </div>
    <div class="record-item-content">
      <div class="row">
        <div class="left">{{ $t(`invest.days.text`) }}</div>
        <div class="right">{{ dayFn(item.days) }}</div>
      </div>
      <div class="row">
        <div class="left">
          {{ $t("invest.record.table.col1.text") }}
        </div>
        <div class="right">{{ moneyFn(divide(item.money)) }}</div>
      </div>
      <div class="row">
        <div class="left">{{ $t("init.money.time") }}</div>
        <div class="right">{{ date(item.createdAt) }}</div>
      </div>
      <div class="row">
        <div class="left">{{ $t("invest.record.table.col5.text") }}</div>
        <div class="right green">{{ getType2(item.status) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import i18n from "@/locale";
export default {
  name: "pagesinvestItem",
  data() {
    return {
      typeOptions: [
        {
          label: i18n.t("fixed.deposit"),
          value: 0,
        },
        {
          label: i18n.t("current.deposit"),
          value: 1,
        },
      ],
      typeOptions2: [
        {
          label: i18n.t("invest.record.status0.text"),
          value: 0,
        },
        {
          label: i18n.t("invest.record.status1.text"),
          value: 1,
        },
        {
          label: i18n.t("invest.record.status2.text"),
          value: 2,
        },
      ],
    };
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    open: {
      type: Boolean,
      default: null,
    },
  },
  methods: {
    moneyFn(v) {
      if (this.open === false) {
        return "*******";
      } else if (this.open === true) {
        return v;
      }
      return v;
    },
    dayFn(v) {
      if (this.open === false) {
        return "**";
      } else if (this.open === true) {
        return v;
      }
      return v;
    },
    getType2(value) {
      let res = this.typeOptions2.find((item) => item.value == value);
      return res.label;
    },
    date(t) {
      return dayjs.unix(this.$ToSeconds(t)).format("YYYY-MM-DD HH:mm");
    },
    count(doc) {
      const val = this.divide(doc.money) || 0;
      const base = +(doc.fixed || 0);
      if (val > 0) {
        const curRate = doc.rate / 100;
        let num = val * curRate * 1 + base; //天
        return num.toFixed(2);
      } else {
        return 0;
      }
    },
    getType(value) {
      let res = this.typeOptions.find((item) => item.value === value);
      if (!res) return "";
      return res.label;
    },
  },
};
</script>
<style scoped lang="less">
.pagesinvest-item {
  border-radius: 14px;
  background-color: rgba(255, 255, 255, 0.1);
  .row {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    .left {
      color: #929292;
    }
    .right {
    }
  }
  .gray {
    color: #cacbce;
  }
  .days {
    height: 18px;
    line-height: 18px;
    padding: 0 10px;
    border-radius: 3px;
    background-color: #5b5a5a;
    color: #fff;
    display: inline-block;
  }
  .plans-head {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .green {
    color: #48d511;
  }
}
</style>
