<template>
  <div class="pagesinvest-page font12 p-l-12 p-r-12">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t('invest.history.text')"
      :styleObj="{ backgroundColor: 'tra' }"
    >
      <template #right>
        <i
          @click="changeOpen"
          class="icon icon-eys iconfont icon-yanjing_xianshi_o"
        ></i>
      </template>
    </AppTopBar>
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
    <LoadList class="" :onload="informationVideo" :finished="finished">
      <div
        class="plans"
        v-for="(item, idx) in video"
        :key="idx"
        @click="goDetail(item)"
      >
        <pagesinvestItem :open="open" :item="item" />
      </div>
    </LoadList>
  </div>
</template>

<script>
import i18n from "@/locale";
import userApi from "@/api/user";
import dayjs from "dayjs";
import pagesinvestItem from "@/views/pagesinvestItem";
export default {
  name: "balanceRecordView",
  data() {
    return {
      open: false,
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
    };
  },
  components: {
    pagesinvestItem,
  },
  methods: {
    //普通盈利 每天的收益
    way1earnings(doc, key = "min") {
      const base = +(doc.fixed || 0);
      const val = doc[`${key}`] || 0;
      if (val > 0) {
        const curRate = doc.rate / 100;
        let num = val * curRate * 1 + base;
        return num;
      } else {
        return 0;
      }
    },
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
    changeOpen() {
      this.open = !this.open;
    },
    goDetail(item) {
      this.$router.push({
        path: "/pages/invest/recordDetail?id=" + item.id,
      });
    },
    date(t) {
      return dayjs.unix(this.$ToSeconds(t)).format("YYYY-MM-DD HH:mm");
    },
    count(item) {
      const val = this.divide(item.money) || 0;
      if (val > 0) {
        //= X * (1 + Y/100)*Z
        const curRate = item.rate / 100;
        let num = val * curRate * item.days;
        if (+item.autoInvest === 1) {
          num = val * Math.pow(1 + curRate, item.days) - val;
        }
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
      return res.label;
    },
    chosen(v) {
      this.query.status = v;
      this.query.pageNo = 1;
      this.video = [];
      this.informationVideo();
    },
    async informationVideo(obj = {}) {
      const params = {
        ...this.query,
        ...obj,
      };
      const [err, res] = await userApi.investMyPost(params);
      if (err) {
        this.finished = true;
        return false;
      }
      this.finished = res.data.results.length < this.query.pageSize;
      // res.data.results 模拟数据
      // res.data.results = [
      //   {
      //     id: 1,
      //     plan: {
      //       name: "plan1",
      //     },
      //     planIcon: "https://img.yzcdn.cn/vant/cat.jpeg",
      //     type: 0,
      //     status: 0,
      //     days: 10,
      //     money: 1000,
      //     autoInvest: 1,
      //     rate: 10,
      //     orderNo: "123456",
      //     finishTime: 1620000000,
      //   },
      // ];
      this.video =
        params.pageNo == 1
          ? res.data.results
          : this.video.concat(res.data.results);
      this.query.pageNo++;
    },
  },
};
</script>
<style scoped lang="less">
.pagesinvest-page {
  .btn-head {
    height: 56px;
    & > li {
      min-width: 95px;
      padding: 0 2px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      background-size: 100% 100%;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      &.active-bg {
        background-color: transparent;

        background-image: linear-gradient(to right, #11998e 0%, #38ef7d 100%);
      }
    }
  }
  .plans-item {
    border-radius: 12px;
    background-color: #161a25;
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
    background-color: #23303c;
    color: #fff;
    display: inline-block;
  }
  .in-progress {
    background-color: #004021;
    color: var(--main);
  }
  .gray {
    color: #cacbce;
  }
  .plans-head {
    border-bottom: 1px solid #2b4745;
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
}
</style>
