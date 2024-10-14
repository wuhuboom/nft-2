<template>
  <div class="wallet-page font12">
    <AppTopBar :topBarTitle="$t('fuc.safe.text')">
      <template #right>
        <van-icon
          class="color-fff"
          @click="$router.push({ name: 'Explanation' })"
          size="24"
          name="question-o"
        />
      </template>
    </AppTopBar>
    <AccountBalance />
    <div class="justify-between menu text-center p-l-8 p-r-8">
      <div
        class="cont-all m-b-16 p-l-8 p-r-8"
        :key="idx"
        v-for="(item, idx) in list"
      >
        <ul class="center-center" @click="goTo(item.name)">
          <li class="icon m-r-8">
            <van-icon
              :class="{ tra180: item.icon == 'upgrade' }"
              :size="24"
              :name="item.icon"
            />
          </li>
          <li>
            <p>{{ item.text }} {{ item.text1 }}</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- @click="$router.push({ name: 'SafeBilling' })" -->
    <ul
      class="align-center color-fff safe-bill justify-between m-l-16 m-r-16 p-b-12 p-t-12"
    >
      <li class="font14 bold">{{ $t("backapi.self.safe.bill.data.text") }}</li>
      <li><SelectNav @chosen="chosen" :navs="tabsList" :cur="tabCurrent" /></li>
    </ul>
    <van-list
      v-model="loading"
      :finished="finished"
      loading-text="loading"
      @load="getBill"
    >
      <div class="p-l-16 p-r-16">
        <BillsList :list="results" />
        <NoData v-if="!results.length" />
      </div>
    </van-list>
  </div>
</template>

<script>
import BillsList from "@/components/home/BillsList";
import userApi from "@/api/user";
import i18n from "@/locale";
import AccountBalance from "@/components/home/AccountBalance";
export default {
  name: "WithdrawView",
  components: {
    BillsList,
    AccountBalance,
  },
  data() {
    return {
      data: {},
      playerConfig: {},
      results: [],
      // tabsList: [
      //   {
      //     value: 0,
      //     label: i18n.t("backapi.self.safe.bill.data.choose.type.all.text"),
      //   },
      //   {
      //     value: 1,
      //     label: i18n.t("backapi.self.safe.recharge.text"),
      //   },
      //   {
      //     value: 2,
      //     label: i18n.t("backapi.self.safe.transfer.text"),
      //   },
      //   {
      //     value: 3,
      //     label: i18n.t(
      //       "backapi.self.safe.account.change.type.recharge.offer.text"
      //     ),
      //   },
      //   {
      //     value: 4,
      //     label: i18n.t("backapi.self.safe.huaz.transfer.text"),
      //   },
      //   {
      //     value: 5,
      //     label: i18n.t("safe.recharge.compensation"),
      //   },
      //   {
      //     value: 6,
      //     label: i18n.t("safe.billing.manual"),
      //   },
      // ],
      tabsList: [
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
      tabCurrent: 1,
      pageNo: 1,
      finished: false,
      loading: false,
    };
  },
  computed: {
    list() {
      const arr = [
        {
          icon: "add-o",
          text: i18n.t("home.index.recharge.text"),
          name: "SafeRecharge",
          active: false,
        },
        {
          icon: "guide-o",
          text: i18n.t("wallet.index.transfer.text"),
          text1: i18n.t("wallet.index.for.subordinate.text"),
          name: "TransferSub",
          active: false,
        },
        {
          icon: "upgrade",
          text: i18n.t("wallet.index.transfer.text"),
          text1: i18n.t("wallet.index.for.self.text"),
          name: "TransferSelf",
          active: false,
        },
        {
          icon: "notes-o",
          text: i18n.t("backapi.self.safe.bill.data.text"),
          text1: "",
          name: "SafeBilling",
          active: false,
        },
      ];
      return arr;
    },
    moneyStr() {
      return this.data.money / this.$globalNum.val;
    },
    todayIncomeStr() {
      return this.data.todayIncome / this.$globalNum.val;
    },
    totalIncomeStr() {
      return this.data.totalIncome / this.$globalNum.val;
    },
    symbolStr() {
      return this.data.symbol;
    },
  },
  methods: {
    async chosen(item) {
      this.tabCurrent = item.value;
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
      });
      await this.getBill({
        pageNo: 1,
      });
    },
    async getBill(obj = {}) {
      const query = {
        pageNo: this.pageNo,
        pageSize: 16,
        time: this.tabCurrent,
        ...obj,
      };
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
    goTo(name) {
      this.$router.push({ name });
    },
    async getConfig() {
      const [err, res] = await userApi.palyerConfig();
      if (err) return;
      this.playerConfig = res.data;
      console.log(this.playerConfig);
    },
  },
  created() {
    //this.getConfig();
    this.getBill();
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
.wallet-page {
  color: #9493ac;
  .safe-bill {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
    color: #fff;
    flex-wrap: wrap;
    .cont-all {
      width: 50%;

      & > ul {
        height: 54px;

        border-radius: 10px;
        border: solid 1px #2ba776;
      }
    }
  }
  .tra180 {
    transform: rotate(180deg);
  }
}
</style>
