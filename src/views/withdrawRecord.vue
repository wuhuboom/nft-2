u
<template>
  <div class="wallet-page font12 color-primary font12">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t('Today.History')"
    ></AppTopBar>
    <ul class="drop-list justify-between p-l-12 p-r-12 align-center m-b-16">
      <li>
        <el-select v-model="filterTab" @change="changFilter">
          <el-option
            v-for="item in tabSimpleList"
            :key="item.id"
            :label="item.text"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </li>
      <li>
        <el-select v-model="status" @change="changeStatus">
          <el-option
            v-for="item in inputSearchListItemArray"
            :key="item.id"
            :label="item.text"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </li>
    </ul>
    <!-- <van-tabs class="tabs-title" v-model="filterTab" @change="changFilter">
      <van-tab
        :key="item.id"
        :title="item.text"
        v-for="item in tabSimpleList"
        :name="item.id"
      ></van-tab>
    </van-tabs>
    <ul class="status-bar align-center">
      <li
        class="p-l-16 p-r-16 center-center"
        :class="{ 'bg-active': status === item.id }"
        @click="changeStatus(item.id)"
        v-for="item in inputSearchListItemArray"
        :key="item.id"
        :label="item.text"
      >
        {{ item.text }}
      </li>
    </ul> -->
    <div class="p-l-12 p-r-12">
      <van-list
        v-model="loading"
        :finished="
          curItem.totalPage !== null && curItem.pageNo > curItem.totalPage
        "
        finished-text=""
        loading-text="loading"
        @load="onLoad"
      >
        <NoData v-if="notthing" />
        <div v-else>
          <ul
            class="list m-b-16 p-b-12 gray"
            v-for="(item, idx) in curItem.results"
            :key="idx"
          >
            <li class="justify-between">
              <p class="color-fff">
                {{ getType(+item.type) }}
              </p>
              <p class="font14 bold color-fff blod">
                {{ divide(item.money) }}
              </p>
            </li>
            <li class="justify-between m-t-12 m-b-12">
              <p>{{ item.createdAt | timestampStr }}</p>
              <p :class="[+item.status == 3 ? 'red' : 'green']">
                {{ getState(+item.status) }}
              </p>
            </li>

            <li v-if="item.remark" class="remark m-t-8 p-x-8">
              {{ item.remark }}
            </li>
          </ul>
          <!-- <van-grid class="color-primary" :border="false" :column-num="4">
          <van-grid-item v-for="value in head" :key="value">
            {{ value }}
          </van-grid-item>
        </van-grid>
        <van-grid
          class="color-primary m-b-8 m-t-8"
          v-for="(item, idx) in curItem.results"
          :key="idx"
          :border="false"
          :column-num="4"
        >
          <van-grid-item class="color-fff">
            {{ item.createdAt | timestampStr }}
          </van-grid-item>
          <van-grid-item class="color-fff">
            {{ getType(+item.type) }}
          </van-grid-item>
          <van-grid-item class="color-fff">
            {{ divide(item.money) }}
          </van-grid-item>
          <van-grid-item class="color-active">
            {{ getState(+item.status) }}
          </van-grid-item>
          <div
            class="color-active p-l-16 p-r-16 m-t-4"
            v-if="item.status === 3"
          >
            {{ $t("withdraw.record.status.fail.text") }}：{{ item.remark }}
          </div>
        </van-grid> -->
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";
import i18n from "@/locale";
const init = () => {
  return {
    type: 0,
    status: 0,
  };
};
export default {
  name: "withdrawRecordView",
  data() {
    return {
      ...init(),
      filterTab: 1,
      head: [
        i18n.t("bet.index.date.text"),
        i18n.t("rebate.center.list.nav.type.text"),
        i18n.t("rebate.center.list.nav.smount.text"),
        i18n.t("recharge.Status"),
      ],
      typeOptions: [
        {
          text: i18n.t("order.search.all.text"),
          type: 1,
        },
        {
          text: i18n.t("order.search.fbd.text"),
          type: 2,
        },
      ],
      tabSimpleList: [
        {
          text: i18n.t("match.records.today.text"),
          id: 1,
        },
        {
          text: i18n.t("match.records.yes.text"),
          id: 2,
        },
        {
          text: i18n.t("match.records.nearly7.text"),
          id: 3,
        },
        {
          text: i18n.t("match.records.nearly10.text"),
          id: 4,
        },
        {
          text: i18n.t("match.records.nearly30.text"),
          id: 5,
        },
      ],
      inputSearchListItemArray_type: [
        {
          text: i18n.t("recharge.All.Type"),
          id: 0,
        },
        {
          text: i18n.t("recharge.On.line"),
          id: 1,
        },
        {
          text: i18n.t("recharge.Offline"),
          id: 2,
        },
      ],
      inputSearchListItemArray: [
        {
          text: i18n.t("dropdown.billing.all.title.text"),
          id: 0,
        },
        {
          text: i18n.t("withdraw.loading"),
          id: 1,
        },
        {
          text: i18n.t("withdraw.record.status.withdraw.success.text"),
          id: 2,
        },
        {
          text: i18n.t("withdraw.failed"),
          id: 3,
        },
      ],
      statusArr: [
        {
          text: i18n.t("recharge.All.Status"),
          id: 0,
        },
        {
          text: i18n.t("recharge.record.status.pendding.text"),
          id: 1,
        },
        {
          text: i18n.t("recharge.Arrives"),
          id: 2,
        },
        {
          text: i18n.t("recharge.record.center.show.detail.status.scored.text"),
          id: 3,
        },
        {
          text: i18n.t(
            "recharge.record.center.show.detail.status.pay.timeout.text"
          ),
          id: 4,
        },
      ],
      typeList: [
        {
          nameStr: this.$t("withdraw.record.center.show.detail.type.bank.text"),
          valueNum: 1,
        },
        {
          nameStr: this.$t("withdraw.record.center.show.detail.usdt.bank.text"),
          valueNum: 2,
        },
        {
          nameStr: this.$t(
            "backapi.self.whitdraw.type.ewallet.form.wallet.addr.text"
          ),
          valueNum: 4,
        },
      ],
      statusList: [
        {
          nameStr: this.$t("withdraw.record.status.need.audit.text"),
          valueNum: 1,
        },
        {
          nameStr: this.$t("withdraw.record.status.already.audit.text"),
          valueNum: 2,
        },
        {
          nameStr: this.$t("withdraw.failed"),
          valueNum: 3,
        },
        {
          nameStr: this.$t("withdraw.record.status.withdraw.success.text"),
          valueNum: 4,
        },
        {
          nameStr: this.$t("withdraw.record.status.paid.in.text"),
          valueNum: 5,
        },
        {
          nameStr: this.$t("backapi.self.pay.failed.text"),
          valueNum: 6,
        },
        {
          nameStr: this.$t("withdraw.record.status.operation.in.text"),
          valueNum: 7,
        },
        {
          nameStr: this.$t("withdraw.record.status.redo.in.text"),
          valueNum: 8,
        },
        {
          nameStr: this.$t("backapi.self.pay.failed.text"),
          valueNum: 9,
        },
      ],
      loading: false,
      curItem: {
        hasNext: true,
        pageNo: 1,
        pageSize: 20,
        results: [],
        totalCount: null,
        totalPage: null,
      },
    };
  },
  computed: {
    choseDoc() {
      return this.typeOptions.find((item) => item.type === this.type);
    },
    notthing() {
      return this.curItem.results.length === 0 && !this.loading;
    },
    statusToStr() {
      return (value) => {
        if (
          (value.status === 1 && value.statusSettlement === 0) ||
          (value.status === 3 && value.statusSettlement === 0)
        ) {
          //未结算/已撤销
          return 0;
        } else if (value.status === 1 && value.statusSettlement === 1) {
          //已结算
          if (value.statusOpen === 1) {
            //赢的情况(已中奖)
            return value.winningAmount;
          } else if (value.statusOpen === 2) {
            //输的情况
            return value.winningAmount * 1 - value.betMoney;
          }
        }
      };
    },
  },
  methods: {
    getType(value) {
      if (value) {
        let res = this.typeList.find((item) => item.valueNum === value);
        return res.nameStr;
      }
      return "--";
    },
    getState(value) {
      const res = this.statusList.find((item) => item.valueNum === value);
      if (res) {
        return res.nameStr;
      }
      return "--";
    },
    chose(v) {
      this.type = v.type;
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
      });
      this.onLoad(1);
    },
    changeStatus(v) {
      this.status = v;
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
      });
      this.onLoad(1);
    },
    changeSType(v) {
      this.type = v;
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
      });
      this.onLoad(1);
    },
    async changFilter(v) {
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
      });
      this.filterTab = v;
      Object.assign(this.$data, init());
      await this.onLoad(1);
    },
    async searchLoad() {
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
      });
      await this.onLoad(1);
    },
    realTypeName(realTypeName, typeNum) {
      // console.log("realTypeName", realTypeName);
      let tempFindArray = [];
      if (typeNum === 1) {
        //支付状态
        tempFindArray = this.inputSearchListItemArray;
      } else if (typeNum === 2) {
        //支付类型,线上、线下
        tempFindArray = this.inputSearchListItemArray_type;
      }

      // console.log("tempFindArray",tempFindArray);
      let tempArray = tempFindArray.find((itemT) => {
        if (itemT.id === realTypeName) {
          return itemT;
        }
      });
      // console.log("tempArray",tempArray);
      // return tempArray.nameStr
      if (tempArray) {
        return tempArray.nameStr;
      } else {
        return this.$t(
          "recharge.record.center.show.detail.status.pay.other.text"
        );
      }
    },
    async onLoad(num) {
      const time = this.filterTab;
      const pageNo = !isNaN(num) ? num : this.curItem.pageNo;
      const obj = {
        time: time,
        pageNo: pageNo,
        pageSize: this.curItem.pageSize,
      };
      if (this.status) {
        obj.status = this.status;
      }
      if (this.type) {
        obj.type = this.type;
      }
      const [err, res] = await userApi.withdrawLogReq(obj);
      this.loading = false;

      if (err) {
        this.curItem.hasNext = false;
        return;
      }
      let list =
        res.data.pageNo == 1
          ? res.data.results
          : this.curItem.results.concat(res.data.results);
      //如果 list 是空数据 加点假数据
      // if (list.length === 0) {
      //   list = [
      //     {
      //       createdAt: "2021-07-01 12:00:00",
      //       money: 100,
      //       status: 3,
      //       type: 1,
      //       remark: "失败原因",
      //     },
      //     {
      //       createdAt: "2021-07-01 12:00:00",
      //       money: 100,
      //       status: 2,
      //       type: 1,
      //       remark: "失败原因",
      //     },
      //   ];
      // }
      this.curItem = {
        ...res.data,
        results: list,
        pageNo: res.data.pageNo + 1,
      };
      this.$toast.clear();
    },
  },
};
</script>
<style scoped lang="less">
.wallet-page {
  .money-str {
    font-size: 26px;
    font-weight: 900;
  }
  .black-line {
    height: 5px;
    background-image: linear-gradient(
      to right,
      #af1816,
      #af1816 5%,
      #0c0c0c 5%,
      #0c0c0c
    );
  }
  .menu {
    height: 65px;
    color: #fff;
    & > li:nth-child(2) {
      border-bottom: 1px solid #484b4c;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .icon {
      img {
        width: 45px;
        display: block;
      }
    }
    .dec {
      img {
        width: 10px;
        display: block;
      }
    }
  }
  .tab-list {
    overflow-x: auto;
    .tab {
      display: flex;
      & > li {
        white-space: nowrap;
      }
    }
  }
  .drop-list {
    height: 58px;
    border-bottom: 1px solid #242b36;
    .search {
      min-width: 74px;
      height: 18px;
      border-radius: 8px;
      background-color: var(--primary);
      color: #fff;
    }
  }
  ::v-deep {
    .van-grid-item__content {
      background-color: transparent;
      padding: 0;
      text-align: center;
    }
  }
}
.list {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.remark {
  background-color: rgba(255, 0, 0, 0.19);
  color: #f82354;
}
.gray {
  color: #9fa0a2;
}
.green {
  color: #85f823;
}
.red {
  color: #f82354;
}
.tabs-title {
  ::v-deep {
    .van-tab {
      margin-right: 8px;
    }
    .van-tabs__nav {
      background-color: transparent;
    }
    .van-tab__text {
      color: #9db1cd;
    }
    .van-tab--active .van-tab__text {
      color: #fff;
    }
    .van-tabs__line {
      height: 2px;
      background-color: #fff;
    }
    .van-tabs__wrap {
      border-bottom: 1px solid rgba(112, 112, 112, 0.34);
      overflow-x: auto;
      height: 60px;
    }
    .van-tab__text--ellipsis {
      overflow: visible;
      //名字不换行
      white-space: nowrap;
    }
  }
}
.status-bar {
  height: 68px;
  & > li {
    height: 36px;
    border-radius: 18px;
    background-color: #30405b;
    margin-right: 10px;
    &.bg-active {
      background-image: linear-gradient(to bottom, #11998e, #38ef7d);
    }
  }
}
</style>
