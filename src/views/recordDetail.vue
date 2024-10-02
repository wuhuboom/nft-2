<template>
  <div class="pagesinvest-page font12 p-l-12 p-r-12">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t('backapi.self.safe.bill.detail.text')"
    ></AppTopBar>
    <LoadList class="m-t-16" :onload="informationVideo" :finished="finished">
      <div class="plans" v-for="(item, idx) in video" :key="idx">
        <div class="plans-item m-b-16">
          <div class="record-item-content">
            <div class="row">
              <div class="left">{{ $t(`invest.money.text`) }}</div>
              <div class="right">{{ divide(item.orderMoney) }}</div>
            </div>
            <div class="row">
              <div class="left">{{ $t(`one.day.rate`) }}</div>
              <div class="right">{{ divide(item.money) }}</div>
            </div>
            <div class="row">
              <div class="left">{{ $t(`fundsRecords.orderNo.text`) }}</div>
              <div class="right">
                {{ item.orderNo }}
              </div>
            </div>
            <div class="row">
              <div class="left">{{ $t(`make.money.date`) }}</div>
              <div class="right">{{ date(item.createdAt) }}</div>
            </div>
          </div>
        </div>
      </div>
      <NoData v-if="query.pageNo > 1 && !video.length" />
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
      finished: false,
      video: [],
      //       pageNo: 1
      // pageSize: 10
      // id: 6742
      query: {
        pageNo: 1,
        pageSize: 10,
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
  min-height: 100vh;
  .plans-item {
    border-radius: 14px;
    background-color: #161a25;
    padding: 24px 16px;
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
}
</style>
