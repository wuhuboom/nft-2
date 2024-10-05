<template>
  <div class="pagesinvest-page font12">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t('invest.record.page.text')"
    ></AppTopBar>
    <ul class="btn-head p-l-16 align-center">
      <li
        @click="chosen(item.value)"
        class="m-r-16"
        :class="{ 'active-bg': query.status === item.value }"
        v-for="(item, idx) in dataArray"
        :key="idx"
      >
        {{ item.label }}
      </li>
    </ul>
    <NoData v-if="finished && !video.length" />
    <div class="p-l-12 p-r-12">
      <LoadList :onload="informationVideo" :finished="finished">
        <div
          class="plans"
          v-for="(item, idx) in video"
          :key="idx"
          @click="goDetail(item)"
        >
          <pagesinvestItem :item="item" />
        </div>
      </LoadList>
    </div>
  </div>
</template>

<script>
import pagesinvestItem from "@/views/pagesinvestItem";
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
          key: 0,
        },
        {
          name: i18n.t(`property.record.search.time2.text`),
          key: 4,
        },
        {
          name: i18n.t(`property.record.search.time3.text`),
          key: 2,
        },
        {
          name: i18n.t(`property.record.search.time5.text`),
          key: 3,
        },
      ],
      dataArray: [
        {
          label: i18n.t("invest.record.status0.text"),
          value: 0,
        },
        {
          label: i18n.t("Today.History"),
          value: 1,
        },
      ],
      finished: false,
      video: [],
      query: {
        pageNo: 1,
        pageSize: 10,
        type: 1,

        status: 0,
      },
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
  components: {
    pagesinvestItem,
  },
  methods: {
    chosen(v) {
      this.query.status = v;
      this.query.pageNo = 1;
      this.video = [];
      this.informationVideo();
    },
    goDetail(item) {
      //window.localStorage.setItem("recroedItem", JSON.stringify(item));
      this.$router.push({
        path: "/pages/invest/recordDetail?id=" + item.id,
      });
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
    getType2(value) {
      let res = this.typeOptions2.find((item) => item.value == value);
      if (!res) return "";
      return res.label;
    },
    async informationVideo(obj = {}) {
      const params = {
        ...this.query,
        ...obj,
      };
      if (params.status === "") {
        delete params.status;
      }
      const [err, res] = await userApi.investMyPost(params);
      if (err) {
        this.finished = true;
        return false;
      }
      this.finished = res.data.results.length < this.query.pageSize;
      //模拟数据  res.data.results
      // res.data.results = [
      //   {
      //     id: 1,
      //     plan: {
      //       name: "测试",
      //     },
      //     planIcon: "https://img.yzcdn.cn/vant/cat.jpeg",
      //     days: 1,
      //     money: 100,
      //     autoInvest: 1,
      //     rate: 0.1,
      //     orderNo: "123456",
      //     finishTime: 1617264000,
      //     status: 1,
      //   },
      // ];
      this.video =
        params.pageNo == 1
          ? res.data.results
          : this.video.concat(res.data.results);
      this.query.pageNo++;
    },
  },
  created() {
    if (this.$store.state.fromRoute.name === "RecordDetail") {
      this.query = this.$store.state.recroed.query;
      this.video = this.$store.state.recroed.video;
    }
  },
  mounted() {
    document.querySelector("body").classList.add("gray-bg-img");
  },
  destroyed() {
    this.$store.commit("setRecroed", {
      video: this.video,
      query: this.query,
    });
    document.querySelector("body").classList.remove("gray-bg-img");
  },
};
</script>
<style scoped lang="less">
.pagesinvest-page {
  .plans-item {
    border-radius: 14px;
    border: solid 1px #292929;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 24px 8px;
    min-width: 42px;
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
  }
  .rate-row {
    text-align: right;
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
  .gray {
    color: #cacbce;
  }
  .plans-head {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .invest-pic {
    height: 35px;
    width: 35px;
    border-radius: 10px;
    overflow: hidden;
  }
  .buy-detail {
    min-height: 100%;
    padding-top: @navHeight+24px;
  }
  .drop-list {
    height: 32px;
    border-bottom: 1px solid #484b4c;
    border-top: 1px solid #484b4c;
    .search {
      min-width: 74px;
      height: 18px;
      border-radius: 8px;
      background-color: var(--primary);
      color: #fff;
    }
  }
  .btn-head {
    height: 56px;
    & > li {
      background: url("@/assets/img/ntf/home/single-item-buy-2@2x.webp")
        no-repeat center center;
      min-width: 95px;
      padding: 0 2px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      background-size: 100% 100%;
      &.active-bg {
        border-radius: 10px;
        background: #f5673e;
      }
    }
  }
}
</style>
