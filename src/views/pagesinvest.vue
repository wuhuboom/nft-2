<template>
  <div class="pagesinvest-page font12 p-l-12 p-r-12">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t('invest.record.page.text')"
      :styleObj="{ backgroundColor: 'tra' }"
    ></AppTopBar>
    <NoData v-if="finished && !video.length" />
    <LoadList :onload="informationVideo" :finished="finished">
      <div
        class="plans"
        v-for="(item, idx) in video"
        :key="idx"
        @click="goDetail(item)"
      >
        <div class="plans-item m-b-16">
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
                <p class="days">{{ getType2(item.status) }}</p>
              </li>
            </ul>
          </div>
          <div class="record-item-content">
            <div class="row">
              <div class="left">{{ $t(`invest.days.text`) }}</div>
              <div class="right">{{ item.days }}</div>
            </div>
            <div class="row">
              <div class="left">{{ $t("invest.record.table.col1.text") }}</div>
              <div class="right">{{ divide(item.money) }}</div>
            </div>
            <div class="row">
              <div class="left">{{ $t("make.money.date") }}</div>
              <div class="right gray">
                {{
                  +item.autoInvest ? $t(`make.show.money`) : $t(`make.show.hie`)
                }}
              </div>
            </div>
            <div class="row">
              <div class="left">{{ $t("invest.record.table.col4.text") }}</div>
              <div class="right active">
                {{ count(item) }}
              </div>
            </div>
            <div class="row">
              <div class="left">{{ $t("invest.record.table.col6.text") }}</div>
              <div class="right">{{ item.rate }}%</div>
            </div>
            <div class="row">
              <div class="left">{{ $t("invest.record.table.col7.text") }}</div>
              <div class="right">{{ item.orderNo }}</div>
            </div>
            <div class="row">
              <div class="left">{{ $t("invest.record.table.col2.text") }}</div>
              <!-- formatDate() -->
              <div class="right">{{ date(item.finishTime) }}</div>
            </div>
          </div>
        </div>
      </div>
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
      query: {
        time: 1,
        pageNo: 1,
        pageSize: 10,
        type: 1,
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
      const [err, res] = await userApi.investMyPost(params);
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
}
</style>
