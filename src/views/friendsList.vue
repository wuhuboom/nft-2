<template>
  <div class="fr-page font12 color-primary">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t('backapi.self.safe.bill.detail.text')"
    ></AppTopBar>
    <ul class="p-l-8 head justify-around align-center">
      <li class="align-center" v-for="(item, idx) in tabsList" :key="idx">
        <i
          class="doc m-r-8"
          :style="{
            backgroundColor: item.color,
          }"
        ></i>
        {{ item.name }}
      </li>
    </ul>
    <div class="p-l-12 p-r-12">
      <ul class="justify-between align-center art">
        <li>{{ $t("detail.live.4") }}</li>
        <li>{{ $t("last.money.time") }}</li>
      </ul>
      <LoadList :onload="investMyFriendsList" :finished="finished">
        <ul
          class="list p-l-12 p-r-16 m-b-8 justify-between align-center"
          v-for="(item, idx) in video"
          :key="idx"
        >
          <li>
            <i
              class="doc m-r-8"
              :style="{
                backgroundColor: tabsList.find(
                  (v) => v.value === item.activedStatus
                ).color,
              }"
            ></i>
            {{ item.username }}
          </li>
          <li>{{ date(item.lastInvestCreate) }}</li>
        </ul>
      </LoadList>
    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";
import i18n from "@/locale";
import dayjs from "dayjs";
export default {
  name: "FriendsList",
  components: {},
  data() {
    return {
      video: [],
      finished: false,
      query: {
        pageNo: 1,
        pageSize: 30,
        level: this.$route.query.level,
      },
      tabsList: [
        {
          name: i18n.t("detail.live.1"),
          value: 1,
          color: "#48d513",
        },
        {
          name: i18n.t("detail.live.2"),
          value: 2,
          color: "#ff0000",
        },
        {
          name: i18n.t("detail.live.3"),
          value: 3,
          color: "#a7a7a7",
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    date(t) {
      if (!t) return "-";
      return dayjs.unix(this.$ToSeconds(t)).format("YYYY-MM-DD HH:mm");
    },
    async investMyFriendsList(obj = {}) {
      const params = {
        ...this.query,
        ...obj,
      };
      const [err, res] = await userApi.investMyFriendsList(params);
      if (err) {
        this.finished = true;
        return false;
      }
      this.finished = res.data.results.length < this.query.pageSize;
      //模拟数据 res.data.results
      // res.data.results = [
      //   {
      //     username: "test",
      //     lastInvestTime: 1727422948942,
      //     activedStatus: 1,
      //   },
      //   {
      //     username: "test",
      //     lastInvestTime: 1727422948942,
      //     activedStatus: 2,
      //   },
      //   {
      //     username: "test",
      //     lastInvestTime: 1727422948942,
      //     activedStatus: 3,
      //   },
      // ];
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
.head {
  height: 32px;
  background-color: #333335;
}
.art {
  height: 32px;
}
.list {
  height: 32px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
}
.doc {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 5px;
}
</style>
