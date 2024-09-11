<template>
  <div>
    <ul class="list m-t-16 p-b-12 gray" v-for="(item, idx) in list" :key="idx">
      <li class="justify-between">
        <p class="color-fff">{{ getType(item.balanceChangeType) }}</p>
        <p
          class="font14 bold"
          :class="[item.changeMoney > 0 ? 'green' : 'red']"
        >
          {{
            item.changeMoney > 0
              ? `+${divide(item.changeMoney)}`
              : divide(item.changeMoney)
          }}
        </p>
      </li>
      <li class="justify-between m-t-12 m-b-12">
        <p>{{ $t(`invest.record.table.col7.text`) }}</p>
        <p>{{ item.orderNo }}</p>
      </li>
      <li class="justify-between">
        <p>{{ date(item.createdAt) }}</p>
        <p>
          {{ $t("backapi.self.safe.balance.text") }}:
          {{ divide(item.initMoney) }}
        </p>
      </li>
      <li v-if="item.remark" class="remark m-t-8 active">{{ item.remark }}</li>
    </ul>
  </div>
</template>

<script>
import dayjs from "dayjs";
import i18n from "@/locale";
export default {
  name: "ChangeRecord",
  data() {
    return {
      typeOptions: [
        {
          label: i18n.t("dropdown.billing.all.title.text"),
          value: 0,
        },
        {
          label: i18n.t("dropdown.billing.income.online.recharge.text"),
          value: 1,
        },
        {
          label: i18n.t("dropdown.billing.income.withdraw.text"),
          value: 2,
        },
        {
          label: i18n.t("dropdown.billing.expenditure.bet.text"),
          value: 3,
        },
        {
          label: i18n.t("dropdown.billing.income.bet.rebate.text"),
          value: 4,
        },
        {
          label: i18n.t("dropdown.billing.income.lower.level.rebate.text"),
          value: 5,
        },
        {
          label: i18n.t("dropdown.billing.income.manually.add.money.text"),
          value: 6,
        },
        {
          label: i18n.t("dropdown.billing.income.bet.cancel.text"),
          value: 7,
        },
        {
          label: i18n.t("dropdown.billing.expenditure.manual.reduction.text"),
          value: 8,
        },
        {
          label: i18n.t("dropdown.billing.expenditure.rebate.deduction.text"),
          value: 9,
        },
        {
          label: i18n.t("dropdown.billing.expenditure.online.cancel.text"),
          value: 10,
        },
        {
          label: i18n.t("dropdown.billing.income.offline.recharge.text"),
          value: 11,
        },
        {
          label: i18n.t("dropdown.billing.income.withdraw.return.text"),
          value: 12,
        },
        {
          label: i18n.t("dropdown.billing.income.bets.return.text"),
          value: 13,
        },
        {
          label: i18n.t("dropdown.billing.income.bet.back.text"),
          value: 14,
        },
        {
          label: i18n.t("dropdown.billing.income.register.gift.text"),
          value: 15,
        },
        {
          label: i18n.t("dropdown.billing.bonus.text"),
          value: 16,
        },
        {
          label: i18n.t("dropdown.billing.income.vip.cash.text"),
          value: 17,
        },
        {
          label: i18n.t("dropdown.billing.income.activity.cash.text"),
          value: 18,
        },
        {
          label: i18n.t("dropdown.billing.income.recharge.gift.text"),
          value: 19,
        },
        {
          label: i18n.t("dropdown.billing.transaction.fee.text"),
          value: 20,
        },
        {
          label: i18n.t(
            "dropdown.billing.income.lower.level.recharge.rebate.text"
          ),
          value: 21,
        },
        {
          label: i18n.t("dropdown.billing.income.lower.level.bet.rebate.text"),
          value: 22,
        },
        {
          label: i18n.t("dropdown.billing.income.invite.rewards.text"),
          value: 23,
        },
        {
          label: i18n.t("dropdown.billing.income.first.charge.text"),
          value: 24,
        },
        {
          label: i18n.t("dropdown.billing.income.active.profit.text"),
          value: 25,
        },
        {
          label: i18n.t("dropdown.billing.income.sufficient.reward.text"),
          value: 26,
        },
        {
          label: i18n.t("dropdown.billing.income.fixed.day.text"),
          value: 27,
        },
        {
          label: i18n.t("dropdown.billing.invite.first.charge.text"),
          value: 28,
        },
        // {
        //     label: i18n.t("backapi.report.account.change.query.type.turntable.lottery.text"),
        //     value: 29,
        // },
        // {
        //     label: i18n.t("backapi.report.account.change.query.type.turntable.jackpot.text"),
        //     value: 30,
        // },
        {
          label: i18n.t("dropdown.billing.offline.activity.text"),
          value: 31,
        },
        {
          label: i18n.t("dropdown.billing.report.score.text"),
          value: 32,
        },
        {
          label: i18n.t("dropdown.billing.redo.text"),
          value: 33,
        },
        {
          label: i18n.t("backapi.self.safe.huaz.transfer.text"),
          value: 34,
        },
        {
          label: i18n.t(
            "backapi.report.account.change.query.type.team.motivation.text"
          ),
          value: 35,
        },
        {
          label: i18n.t("dropdown.billing.recharge.compensation.text"),
          value: 36,
        },
        {
          label: i18n.t("dropdown.billing.report.score.text"),
          value: 37,
        },
      ],
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    date(time) {
      return dayjs.unix(this.$ToSeconds(time)).format("YYYY-MM-DD HH:mm");
    },
    getType(type) {
      return this.typeOptions.find((item) => item.value === type)?.label;
    },
  },
};
</script>

<style scoped lang="less">
.list {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.gray {
  color: #929292;
}
.green {
  color: #00d91f;
}
.red {
  color: var(--main);
}
</style>
