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
    <ul
      @click="$router.push({ name: 'SafeBilling' })"
      class="align-center color-fff safe-bill justify-between m-l-16 m-r-16 p-b-12 p-t-12"
    >
      <li class="font14 bold">{{ $t("backapi.self.safe.bill.data.text") }}</li>
      <li><van-icon name="arrow" size="18" /></li>
    </ul>
    <div class="p-l-16 p-r-16">
      <BillsList :list="results" />
      <NoData v-if="!results.length" />
    </div>
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
      loading: false,
      data: {},
      playerConfig: {},
      results: [],
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
    async getBill() {
      const [err, res] = await userApi.safeChangeLog({
        pageNo: 1,
        pageSize: 16,
      });
      if (err) return;
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
      this.results = res.data.results;
    },
    goTo(name) {
      this.$router.push({ name });
    },
    async safeInfo() {
      this.loading = true;
      const [err, res] = await userApi.safeInfo();
      this.loading = false;
      if (err) return;
      this.data = res.data;
    },
    async getConfig() {
      const [err, res] = await userApi.palyerConfig();
      if (err) return;
      this.playerConfig = res.data;
      console.log(this.playerConfig);
    },
    async refresh() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      await this.safeInfo();
      this.$toast.clear();
    },
  },
  created() {
    this.safeInfo();
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
