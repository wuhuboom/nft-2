<template>
  <div class="p-b-32">
    <div class="page-user font12 p-l-16 p-r-16">
      <ul class="justify-between uesr-head align-center p-t-16 p-b-20">
        <li class="align-center">
          <p class="icon-user m-r-8">
            <img
              class="d-img"
              src="@/assets/img/ntf3/user/126928@2x.png"
              alt=""
            />
          </p>
          <p class="flex-column good-desc">
            <span>{{ $t(`Good.Day`) }}</span>
            <span class="font16 bold">
              {{ user.username }}
            </span>
          </p>
        </li>
        <li>
          <SelectLang />
        </li>
      </ul>
      <ul class="user-balance">
        <li class="center-center m-b-4">
          {{ $t(`home.index.account.balance.text`) }}
        </li>
        <li class="center-center">
          {{ divide(user.balance) }}
        </li>
        <li class="wi-re center-center m-t-20 m-b-24">
          <p
            class="m-r-8 center-center ntf-vant-btn"
            @click="$router.push({ path: '/pages/wallet/onlineRecharge' })"
          >
            <img
              class="d-img m-r-12"
              src="@/assets/img/ntf3/user/130043@2x.png"
              alt=""
            />
            {{ $t("deal.recharge.354498-0") }}
          </p>
          <p
            class="center-center ntf-vant-btn"
            @click="$router.push({ path: '/pages/wallet/withdraw' })"
          >
            <img
              class="d-img m-r-12"
              src="@/assets/img/ntf3/user/157461@2x.png"
              alt=""
            />
            {{ $t(`dropdown.billing.income.withdraw.text`) }}
          </p>
        </li>
      </ul>
      <ul class="navs justify-between m-t-16">
        <li
          v-for="(item, idx) in navs"
          :key="idx"
          @click="item.path && $router.push(item.path)"
          class="center-center flex-column text-center"
        >
          <img class="d-img" :src="item.img" alt="" />
          <p class="m-t-12">{{ item.text }}</p>
        </li>
      </ul>
      <ul
        v-if="config.beyShow === 1"
        @click="$router.push({ name: 'Share' })"
        class="my-qr flex-column m-t-24 p-l-16 p-b-12 p-t-12 justify-around"
      >
        <li class="font14">{{ $t(`me.my.qr.code.text`) }}</li>
        <li class="align-center">
          Click to view the invitation code
          <van-icon class="m-l-4" name="arrow" />
        </li>
      </ul>
      <p class="font14 bold m-t-24 m-b-16">{{ $t(`property.navbar.title`) }}</p>
      <ul class="trade-list d-flex full100 m-b-16 gray">
        <li class="name">
          <p class="els">{{ $t("deal.createOrderMer.354499-5") }}</p>
        </li>
        <li class="flex-1">
          <p class="els">{{ $t("info.trade.col4.text") }}</p>
        </li>
        <li class="no-shrink earnings">
          <p class="els">{{ $t("Total.earnings") }}</p>
        </li>
      </ul>
      <div v-if="plans.length">
        <ul
          class="trade-list d-flex full100 m-b-16"
          v-for="(item, idx) in plans"
          :key="idx"
        >
          <li class="name els align-center">
            <img
              v-if="item.planIcon"
              class="d-img no-shrink"
              :src="item.planIcon"
              alt=""
            />
            <p class="els">{{ item.plan }}</p>
          </li>
          <li class="flex-1">
            <p class="els">{{ divide(item.money) }}</p>
          </li>
          <li class="no-shrink earnings">
            <p class="els">{{ divide(item.moneyIncome) }}</p>
          </li>
        </ul>
      </div>

      <NoData v-else />
      <div
        class="m-b-16 m-t-24 justify-between align-center"
        @click="
          $router.push({
            name: 'BalanceRecord',
          })
        "
      >
        <p class="font14 bold">{{ $t("property.record.title") }}</p>
        <van-icon size="16" name="arrow" />
      </div>
      <ChangeRecord v-if="changs.length" :list="changs" />
      <NoData v-else />
    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";
import ChangeRecord from "@/components/home/ChangeRecord.vue";
export default {
  name: "pageUser",
  components: {
    ChangeRecord,
  },
  data() {
    return {
      invest: {},
      plans: [],
      changs: [],
    };
  },
  computed: {
    config() {
      return this.$store.state.config;
    },
    user() {
      return this.$store.state.user;
    },
    navs() {
      const arr = [
        {
          text: this.$t("fuc.rebate.center"),
          img: require("@/assets/img/ntf/user2.png"),
          path: "/pages/function/rebate_center",
        },
        {
          text: this.$t("Team.benefits"),
          path: "/pages/user/income",
          img: require("@/assets/img/ntf/user3.png"),
        },
        {
          text: this.$t("user.trade.title4.text"),
          img: require("@/assets/img/ntf/user4.png"),
          path: "/pages/user/invoice",
        },
      ];
      if (this.config.beyShow == 1) {
        arr.unshift({
          img: require("@/assets/img/ntf/user1.png"),
          text: this.$t(`Yu'ebao`),
          path: "/pages/user/investDetail",
        });
      } else {
        arr.push({
          img: require("@/assets/img/ntf/user5.webp"),
          text: this.$t(`me.my.qr.code.text`),
          path: "/pages/me/share",
        });
      }
      return arr;
    },
  },
  methods: {
    async balanceChangeRequest() {
      const [err, res] = await userApi.balanceChangeReq({
        time: 1,
        pageNo: 1,
        pageSize: 10,
      });
      if (err) return;
      this.changs = res.data.results;
    },
    async investMyStatisItems() {
      const [err, res] = await userApi.investMyStatisItems();
      if (err) return;
      this.plans = res.data;
    },
    async investMyStatis() {
      const [err, res] = await userApi.investMyStatis();
      if (err) return;
      this.invest = res.data;
    },
  },
  created() {
    this.$store.commit("setPdTop", false);
    this.investMyStatisItems();
    // this.investMyStatis();
    this.balanceChangeRequest();
    this.$store.dispatch("getInfo");
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
.gray {
  color: #79869b;
}
.green {
  color: #00d91f;
}
.my-qr {
  background: url("@/assets/img/ntf/myqr.webp") no-repeat center center;
  background-size: 100% 100%;
  height: 70px;
  & > li:nth-child(1) {
    color: #faa822;
  }
}
.user-set {
  position: relative;
  .userpic {
    width: 58px;
    height: 58px;
  }
  .edt {
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: 22px;
    height: 22px;
    border-radius: 11px;
    background-image: linear-gradient(to bottom, #1f2430, #21232e);
  }
}
.navs {
  align-items: baseline;
  & > li {
    background: no-repeat center center;
    background-size: 100% 100%;
    &,
    img {
      width: 57px;
    }
    img {
      height: 57px;
    }
  }
}
.trade-list {
  .name {
    width: 135px;
    img {
      height: 24px;
      width: 24px;
      margin-right: 8px;
    }
  }
  .earnings {
    width: 88px;
    margin-left: 39px;
  }
  & > li:nth-child(2),
  & > li:nth-child(3) {
    text-align: right;
  }
  .trade {
  }
}
.uesr-head {
  .icon-user {
    height: 44px;
    width: 44px;
  }
  .good-desc {
    & > span:nth-child(1) {
      color: rgba(255, 255, 255, 0.4);
    }
  }
}
.user-balance {
  & > li:nth-child(1) {
    font-size: 16px;
    color: #8e8e8e;
  }
  & > li:nth-child(2) {
    font-size: 28px;
  }
}
.wi-re {
  & > p {
    min-width: 139px;
    height: 39px;
    padding: 0 4px;
  }
  img {
    height: 20px;
    width: 20px;
  }
}
</style>
