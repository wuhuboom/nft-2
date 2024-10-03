<template>
  <div class="pagesinvest-page font12 p-l-12 p-r-12">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t('backapi.self.safe.bill.detail.text')"
    ></AppTopBar>
    <pagesinvestDetail :item="detail" class="m-t-16" />
    <p class="font14 m-b-8">{{ $t("buy.invest.money5") }}</p>
    <LoadList :onload="informationVideo" :finished="finished">
      <div class="row" v-for="(item, idx) in video" :key="idx">
        <div class="left">{{ date(item.createdAt) }}</div>
        <div class="right green">+{{ divide(item.money) }}</div>
      </div>
      <NoData class="m-t-40" v-if="query.pageNo > 1 && !video.length" />
    </LoadList>
  </div>
</template>

<script>
import i18n from "@/locale";
import userApi from "@/api/user";
import dayjs from "dayjs";
import pagesinvestDetail from "@/views/pagesinvestDetail.vue";
export default {
  name: "balanceRecordView",
  components: {
    pagesinvestDetail,
  },
  data() {
    return {
      finished: false,
      video: [],
      detail: {},
      query: {
        pageNo: 1,
        pageSize: 20,
        id: this.$route.query.id,
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
  methods: {
    goDetail(item) {
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
    async investMyDetail() {
      const [err, res] = await userApi.investMyDetail({
        id: this.query.id,
      });
      if (err) {
        return false;
      }
      this.detail = res.data;
    },
    async informationVideo(obj = {}) {
      const params = {
        ...this.query,
        ...obj,
      };
      const [err, res] = await userApi.investMyDetailLog(params);
      if (err) {
        this.finished = true;
        return false;
      }
      this.finished = res.data.results.length < this.query.pageSize;
      //res.data.results 模拟数据
      // res.data.results = [
      //   {
      //     orderMoney: 1000,
      //     money: 100,
      //     orderNo: "202107010001",
      //     createdAt: 1625097600,
      //   },
      //   {
      //     orderMoney: 2000,
      //     money: 200,
      //     orderNo: "202107010002",
      //     createdAt: 1625097600,
      //   },
      //   {
      //     orderMoney: 3000,
      //     money: 300,
      //     orderNo: "202107010003",
      //     createdAt: 1625097600,
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
    // let detail = window.localStorage.getItem("recroedItem");
    // detail = detail ? JSON.parse(detail) : {};
    // this.detail = detail;
    this.investMyDetail();
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
.pagesinvest-page {
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
    height: 36px;
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
  .green {
    color: #1fb759;
  }
}
</style>
