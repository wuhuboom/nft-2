<template>
  <div>
    <ul
      class="list justify-between align-center m-t-16 p-b-12 gray p-x-8"
      v-for="(item, idx) in list"
      :key="idx"
    >
      <li class="">
        <p class="color-fff font14 m-b-8">{{ dataTxt(item) }}</p>
        <p>
          {{ date(item.createdAt) }}
        </p>
      </li>
      <li>
        <p
          class="font14 bold"
          :class="[item.changeMoney > 0 ? 'active' : 'red']"
        >
          {{ divide(item.changeMoney) }}
        </p>
      </li>
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
      tabsList: [
        {
          value: 0,
          label: i18n.t("backapi.self.safe.bill.data.choose.type.all.text"),
        },
        {
          value: 1,
          label: i18n.t("backapi.self.safe.recharge.text"),
        },
        {
          value: 2,
          label: i18n.t("backapi.self.safe.transfer.text"),
        },
        {
          value: 3,
          label: i18n.t(
            "backapi.self.safe.account.change.type.recharge.offer.text"
          ),
        },
        {
          value: 4,
          label: i18n.t("backapi.self.safe.huaz.transfer.text"),
        },
        {
          value: 5,
          label: i18n.t("safe.recharge.compensation"),
        },
        {
          value: 6,
          label: i18n.t("safe.billing.manual"),
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
    dataTxt(item) {
      const doc = this.tabsList.find((v) => v.value === item.changeType);
      if (!doc) return "--";
      return doc.label;
    },
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
  height: 76px;
  background: url("@/assets/img/billbg.webp") no-repeat center center;
  background-size: 100% 100%;
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
