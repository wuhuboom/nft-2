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
export default {
  name: "ChangeRecord",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    typeOptions() {
      return this.$store.state.balanceRecord;
    },
    allTYpe() {
      return this.typeOptions
        .filter((v) => v.key !== "other")
        .map((item) => item.value)
        .flat();
    },
  },
  methods: {
    date(time) {
      return dayjs.unix(this.$ToSeconds(time)).format("YYYY-MM-DD HH:mm");
    },
    getType(type) {
      if (!this.allTYpe.includes(type)) {
        return this.$t("dropdown.billing.other");
      }
      let obj = this.typeOptions.find((item) => {
        if (!Array.isArray(item.value)) {
          return false;
        }
        return item.value.includes(type);
      });
      return obj ? obj.label : "";
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
