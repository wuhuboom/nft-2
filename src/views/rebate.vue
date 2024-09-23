<template>
  <div class="agency-page font14 p-l-12 p-r-12">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t('fuc.rebate.center')"
      :styleObj="{ backgroundColor: 'transparent' }"
    ></AppTopBar>
    <!-- v-if="!dataList.length" -->
    <div class="center-center py-16" v-if="totalNum === null">
      <van-Loading class="" />
    </div>
    <div v-else>
      <div class="rebate-head p-x-12 m-t-12">
        <ul class="flex-column header">
          <li class="font14 m-b-8">
            {{ $t("backapi.self.rebate.top.content.total.text") }}
          </li>
          <li class="total-num">{{ divide(totalNum) }}</li>
        </ul>
        <div class="d-flex m-t-12 font12 tolal-list-all">
          <ul class="center-center tolal-list p-b-4 flex-column">
            <li>
              {{ $t("backapi.self.rebate.top.content.lastweek.text") }}
            </li>
            <li class="p-r-8">{{ divide(lastWeekNum) }}</li>
          </ul>
          <ul class="center-center tolal-list p-b-4 flex-column">
            <li>
              {{ $t("backapi.self.rebate.top.content.today.text") }}
            </li>
            <li class="p-r-8">{{ divide(todayNum) }}</li>
          </ul>
          <ul class="center-center tolal-list p-b-4 flex-column">
            <li>
              {{ $t("backapi.self.rebate.top.content.week.text") }}
            </li>
            <li class="p-r-8">{{ divide(weekNum) }}</li>
          </ul>
        </div>
      </div>

      <van-list
        class="m-t-24"
        v-model="loading"
        :finished="curItem.hasNext === false"
        finished-text=""
        loading-text="loading"
        @load="onLoad"
      >
        <div class="">
          <van-grid class="m-b-16" :border="false" :column-num="2">
            <van-grid-item v-for="value in head" :key="value">
              {{ value }}
            </van-grid-item>
          </van-grid>
          <div v-if="nothing">
            <NoData />
          </div>
          <van-grid
            v-show="!nothing"
            class="m-b-4 grid-list font13"
            v-for="(item, idx) in curItem.results"
            :key="idx"
            :border="false"
            :column-num="2"
          >
            <van-grid-item class="color-fff">
              {{ getType(item.type) }}
              <p class="m-t-8 gray">{{ item.ymd }}</p>
            </van-grid-item>
            <van-grid-item class="color-fff">
              {{ divide(item.money) }}
            </van-grid-item>
          </van-grid>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import i18n from "@/locale";
import userApi from "@/api/user";
import NoData from "@/components/global/NoData.vue";
export default {
  name: "AebateView",
  data() {
    return {
      head: [
        i18n.t("rebate.center.list.nav.type.text"),
        i18n.t("rebate.center.list.nav.smount.text"),
      ],
      icon1: require("@/assets/img/billing1.webp"),
      icon2: require("@/assets/img/billing2.webp"),
      detail: {},
      curItem: {
        hasNext: true,
        pageNo: 1,
        pageSize: 5,
        results: [],
        totalCount: null,
        totalPage: null,
      },
      loading: false,
      totalNum: null,
      weekNum: null,
      todayNum: null,
      lastWeekNum: null,
    };
  },
  computed: {
    nothing() {
      return this.curItem.results.length === 0 && !this.loading;
    },
  },
  methods: {
    getType(type) {
      if (type === 1) {
        return this.$t("rebate.center.list.cell.bet.text");
      } else if (type === 2) {
        return this.$t("rebate.center.list.cell.profit.text");
      } else if (type === 3) {
        return this.$t("rebate.center.list.cell.recharge.text");
      }
      return "";
    },
    add() {
      return true;
    },
    async getStatissticsData() {
      const [err, resR] = await userApi.rebateStatisReq();
      if (err) return;
      this.totalNum = resR.data.total;
      this.weekNum = resR.data.week;
      this.todayNum = resR.data.today;
      this.lastWeekNum = resR.data.lastWeek;
    },
    async onLoad(num) {
      const pageNo = !isNaN(num) ? num : this.curItem.pageNo;
      const obj = {
        pageNo: pageNo,
        pageSize: this.curItem.pageSize,
      };
      const [err, res] = await userApi.rebateListReq(obj);
      this.loading = false;
      if (err) {
        if (err.code == 409) {
          this.$toast(this.$t("backapi.self.alert.fast.access.tip.text"));
        }
        this.curItem.hasNext = false;
        return;
      }
      let list = this.curItem.results.concat(res.data.results);
      // for (let i = 0; i < 7; i++) {
      //   list.push(list[0]);
      // }
      this.curItem = {
        ...res.data,
        results: list,
        pageNo: res.data.pageNo + 1,
      };
      this.curItem.hasNext = false;
    },
  },
  created() {
    this.getStatissticsData();
  },
  components: { NoData },
};
</script>
<style scoped lang="less">
.header {
  .total-num {
    font-size: 24px;
    font-weight: bold;
  }
}
.gray {
  color: #9c9c9c;
}
.tolal-list-all {
  padding: 20px 0;
  border-radius: 11px;
  background-image: linear-gradient(
    to bottom,
    rgba(17, 153, 142, 0.3),
    rgba(56, 239, 125, 0.3)
  );

  & > ul {
    min-height: 58px;
    padding: 0 4px;
    width: 33.3333%;
    border-right: 1px solid rgba(255, 255, 255, 0.17);
    justify-content: space-around !important;
    & > li:nth-child(2) {
      font-size: 18px;
      font-weight: bold;
    }
  }
  & > ul:last-child {
    border-color: transparent;
  }
}
.agency-page {
  ::v-deep {
    .van-grid-item__content {
      background-color: transparent;
      padding: 0;
      justify-content: center;
      align-items: flex-start;
    }
    .van-grid {
      flex-wrap: nowrap;
      .van-grid-item:nth-child(2) .van-grid-item__content {
        align-items: flex-end;
      }
    }
    .grid-list {
      padding: 12px;
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 0.04);
    }
  }
  .agency-lst {
    border-radius: 10px;
    border: 1px solid var(--main);
    text-align: center;
    & > li {
      width: 50%;
    }
    .border-active {
      border-bottom: 1px solid var(--main);
    }
  }
  .type-head {
    padding: 24px 20px 4px;
    border-bottom: 1px solid #dadada;
  }
  .list {
    padding: 20px 20px 20px 0;
    background-color: #fff;
    border-bottom: 2px solid #efefef;
    margin-bottom: 4px;
    .pic {
      width: 72px;
      img {
        width: 40px;
        height: 40px;
        object-fit: cover;
      }
    }
    .txt {
      & > p:nth-child(1) {
        color: #222741;
        margin-bottom: 10px;
      }
      & > p:nth-child(2) {
        color: #acaebe;
      }
    }
    .num {
      color: #75788d;
      font-size: 16px;
    }
  }
  .list-add {
    .num {
      color: #73c74e;
    }
  }
}
.rebate-head {
  border-radius: 9px;
  background-color: #16212b;
}
</style>
