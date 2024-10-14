<template>
  <div class="safe-billing font12 color-primary pb-16">
    <AppTopBar :topBarTitle="$t('backapi.self.safe.bill.data.text')">
    </AppTopBar>
    <!-- v-if="!dataList.length" -->
    <div class="center-center py-16" v-if="false">
      <van-Loading color="#1989fa" />
    </div>
    <div v-else class="">
      <ul
        class="drop-list m-r-13 m-r-l justify-between align-center m-b-12 m-l-16 m-r-16"
      >
        <li class="time-filter">
          <SelectNav @chosen="chosenTime" :navs="timeList" :cur="time" />
        </li>
        <li>
          <SelectNav :navs="tabsList" @chosen="chosenType" :cur="tabCurrent">
            <img
              class="d-img filter-img"
              src="@/assets/img/ntf3/130134@2x.webp"
              alt=""
            />
          </SelectNav>
        </li>
      </ul>
      <van-list
        v-model="loading"
        :finished="finished"
        loading-text="loading"
        @load="getBill"
      >
      </van-list>
      <div class="p-l-16 p-r-16">
        <BillsList :list="results" />
      </div>

      <NoData v-if="nothing" />
    </div>
  </div>
</template>

<script>
import BillsList from "@/components/home/BillsList";
const initData = () => {
  return {
    data: {
      hasNext: true,
      pageNo: 1,
      pageSize: 10,
      results: [],
      totalCount: null,
      totalPage: null,
    },
  };
};
// eslint-disable-next-line no-unused-vars
import userApi from "@/api/user";
import i18n from "@/locale";
export default {
  name: "SafeBillingView",
  data() {
    return {
      head: [
        i18n.t("bet.index.date.text"),
        i18n.t("rebate.center.list.nav.type.text"),
        i18n.t("rebate.center.list.nav.smount.text"),
      ],
      loading: false,
      icon1: require("@/assets/img/billing1.webp"),
      icon2: require("@/assets/img/billing2.webp"),
      results: [],
      finished: false,
      time: 1,
      pageNo: 1,
      timeList: [
        {
          value: 1,
          label: i18n.t("property.record.search.time1.text"),
        },
        {
          value: 2,
          label: i18n.t("property.record.search.time2.text"),
        },
        {
          value: 3,
          label: i18n.t("property.record.search.time3.text"),
        },
      ],
      tabsList: [
        {
          value: 0,
          label: i18n.t("backapi.self.safe.bill.data.choose.type.all.text"),
          ...initData(),
        },
        {
          value: 1,
          label: i18n.t("backapi.self.safe.recharge.text"),
          ...initData(),
        },
        {
          value: 2,
          label: i18n.t("backapi.self.safe.transfer.text"),
          ...initData(),
        },
        {
          value: 3,
          label: i18n.t(
            "backapi.self.safe.account.change.type.recharge.offer.text"
          ),
          ...initData(),
        },
        {
          value: 4,
          label: i18n.t("backapi.self.safe.huaz.transfer.text"),
          ...initData(),
        },
        {
          value: 5,
          label: i18n.t("safe.recharge.compensation"),
          ...initData(),
        },
        {
          value: 6,
          label: i18n.t("safe.billing.manual"),
          ...initData(),
        },
      ],
      tabCurrent: 0,
    };
  },
  components: {
    BillsList,
  },
  computed: {
    nothing() {
      return !this.loading && this.results.length === 0;
    },
  },
  methods: {
    chosenTime(item) {
      this.time = item.value;
      this.tabCurrent = 0;
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
      });
      this.getBill({ pageNo: 1 });
    },
    add(item) {
      return !`${item.changeMoney}`.includes("-");
    },
    dataTxt(item) {
      const doc = this.tabsList.find((v) => v.value === item.changeType);
      if (!doc) return "--";
      return doc.label;
    },
    chosenType(item) {
      this.tabCurrent = item.value;
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
      });
      this.getBill({ pageNo: 1 });
    },
    async getBill(obj = {}) {
      const query = {
        pageNo: this.pageNo,
        pageSize: 16,
        time: this.time,
        changeType: this.tabCurrent,
        ...obj,
      };
      if (query.changeType === 0) {
        delete query.changeType;
      }
      const isFirst = query.pageNo === 1;
      const [err, res] = await userApi.safeChangeLog(query);
      this.loading = false;
      if (err) {
        this.finished = true;
        return;
      }
      this.$toast.clear();
      //模拟数据 res.data.results
      // res.data.results = [
      //   {
      //     type: 1,
      //     ymd: "2021-09-01",
      //     money: 100,
      //   },
      //   {
      //     type: 2,
      //     ymd: "2021-09-01",
      //     money: 100,
      //   },
      //   {
      //     type: 3,
      //     ymd: "2021-09-01",
      //     money: 100,
      //   },
      // ];
      this.finished = res.data.results.length < query.pageSize;
      this.results = isFirst
        ? res.data.results
        : this.results.concat(res.data.results);
      this.pageNo = query.pageNo + 1;
    },
  },
};
</script>
<style scoped lang="less">
.safe-billing {
  ::v-deep {
    .van-grid-item__content {
      background-color: transparent;
      padding: 0;
      text-align: center;
    }
    .van-grid {
      flex-wrap: nowrap;
    }
  }

  .drop-list {
    // height: 32px;
    // border-bottom: 1px solid #484b4c;
    // border-top: 1px solid #484b4c;
    height: 60px;
    border-bottom: 1px solid #242b36;
    .search {
      min-width: 74px;
      height: 18px;
      border-radius: 8px;
      background-color: var(--primary);
      color: #fff;
    }
  }
  .billing-head {
    margin-left: 16px;
    display: flex;
    flex-wrap: wrap;
    color: #707070;
    & > li {
      margin: 0 16px 16px 0;
    }
    .cont {
      height: 28px;
      padding: 0 12px;
      background-color: #e6e6e6;
      border-radius: 14px;
    }
    .active {
      background-color: #0022ff;
      color: #fff;
    }
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
  .nothing {
    flex-direction: column;
    font-size: 12px;
    color: #9a9a9a;
    padding-top: 66px;
    span {
      padding-top: 22px;
    }
    img {
      width: 98px;
      height: 70px;
      object-fit: cover;
    }
  }
}
.time-filter {
  ::v-deep {
    .title {
      height: 28px;
      border-radius: 14px;
      border: solid 1px #fff;
      padding: 0 10px;
      color: #fff;
    }
  }
}
.filter-img {
  height: 25px;
  width: 25px;
}
</style>
