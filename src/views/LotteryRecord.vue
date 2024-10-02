<template>
  <div class="balanceRecord-page font14">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t('lottery.order1')"
    ></AppTopBar>
    <LoadList :onload="balanceChangeReq" :finished="finished">
      <div v-if="video.length" class="p-x-12">
        <ul
          class="align-center justify-between list m-b-4 p-l-12 p-r-12"
          v-for="(item, idx) in video"
          :key="idx"
        >
          <li>
            {{ $t("ChangeRecord29") }}
            <span class="yellow">
              {{
                item.changeMoney > 0
                  ? `+${divide(item.changeMoney)}`
                  : divide(item.changeMoney)
              }}
            </span>
          </li>
          <li class="time">{{ date(item.createdAt) }}</li>
        </ul>
      </div>

      <NoData v-else />
    </LoadList>
  </div>
</template>

<script>
import i18n from "@/locale";
import userApi from "@/api/user";
import dayjs from "dayjs";
export default {
  name: "balanceRecordView",
  data() {
    return {
      navs: [
        {
          name: i18n.t(`property.record.search.time1.text`),
          key: 1,
        },
        {
          name: i18n.t(`property.record.search.time2.text`),
          key: 2,
        },
        {
          name: i18n.t(`property.record.search.time3.text`),
          key: 3,
        },
      ],
      type: [29, 30],
      cur: 3,
      finished: false,
      video: [],
      query: {
        pageNo: 1,
        pageSize: 20,
      },
    };
  },
  computed: {
    dataArray() {
      return this.$store.state.balanceRecord;
    },
  },
  methods: {
    date(time) {
      return dayjs.unix(this.$ToSeconds(time)).format("YYYY-MM-DD HH:mm");
    },
    async balanceChangeReq(obj = {}) {
      const params = {
        ...this.query,
        ...obj,
        time: this.cur,
        type: this.type,
      };
      if (params.type === 0) {
        delete params.type;
      }
      const [err, res] = await userApi.balanceChangeReq(params);
      if (err) {
        this.finished = true;
        return;
      }
      this.finished = res.data.results.length < this.query.pageSize;

      this.video =
        params.pageNo == 1
          ? res.data.results
          : this.video.concat(res.data.results);
      this.query.pageNo++;
    },
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
.list {
  height: 45px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  .time {
    color: #ebebf5;
  }
  .yellow {
    color: #f8b123;
  }
}
</style>
