<template>
  <div class="font12">
    <HomeTopBar :showLang="false">
      <template #title>
        <p class="font16" style="font-weight: normal">{{ $t(`investment`) }}</p>
      </template>
      <template #right>
        <p
          @click="$router.push('/pages/invest/record')"
          class="m-r-4 align-center"
          style="line-height: 1"
        >
          <van-icon class="m-r-4" name="todo-list-o" size="16" />
          {{ $t("invest.history.text") }}
        </p>
      </template>
    </HomeTopBar>
    <activationCode />
    <div class="invest-plans-page">
      <ul class="total-list p-t-20 m-b-16">
        <li class="flex-column center-center m-b-24">
          <p>{{ $t("fundsRecords.Balance.text") }}</p>
          <p class="balance">{{ balance }}</p>
        </li>
        <li class="justify-around">
          <p class="flex-column center-center">
            <span>{{ $t("buy.invest.money3") }}</span
            ><span class="balance">{{ divide(money.totalInvest) }}</span>
          </p>
          <p class="flex-column center-center">
            <span>{{ $t("buy.invest.money2") }}</span
            ><span class="balance">{{ divide(money.frozen) }}</span>
          </p>
        </li>
      </ul>

      <div class="p-l-12 p-r-12" v-for="(item, idx) in records" :key="idx">
        <div
          class="plans p-t-16 m-b-8"
          v-for="(doc, index) in item.rateConfig"
          :key="index"
        >
          <div class="p-r-16 p-l-16">
            <ul class="align-center plane-name p-b-8 m-b-16">
              <li class="align-center">
                <img class="d-img icon-header" :src="doc.header" alt="" />
                <p class="m-l-8 m-r-4">{{ doc.name }}</p>
              </li>
              <li>
                <img
                  src="@/assets/img/ntf/market/130993@3x.png"
                  class="hot d-img"
                  alt=""
                />
              </li>
            </ul>
            <div class="d-flex desc">
              <ul class="align-center m-b-20">
                <li>
                  <img src="@/assets/img/ntf/market/130970@3x.png" alt="" />
                </li>
                <li class="m-l-8">
                  <p class="gray">{{ $t("buy.invest.money4") }}</p>
                  <p class="font14 blod">{{ doc.min }}</p>
                </li>
              </ul>
              <ul class="align-center m-b-20">
                <li>
                  <img src="@/assets/img/ntf/market/131008@3x.png" alt="" />
                </li>
                <li class="m-l-8">
                  <p class="gray">{{ $t("buy.invest.money5") }}</p>
                  <p class="font14 blod">{{ way1earnings(doc) }}</p>
                </li>
              </ul>
              <ul class="align-center m-b-20">
                <li>
                  <img src="@/assets/img/ntf/market/130976@3x.png" alt="" />
                </li>
                <li class="m-l-8">
                  <p class="gray">{{ $t("buy.invest.money6") }}</p>
                  <p class="font14 blod">
                    {{ doc.days }}
                    {{
                      doc.days == 1
                        ? $t(`safe.one.days`)
                        : $t(`safe.invite.days`)
                    }}
                  </p>
                </li>
              </ul>
              <ul class="align-center m-b-20">
                <li>
                  <img src="@/assets/img/ntf/market/130978@3x.png" alt="" />
                </li>
                <li class="m-l-8">
                  <p class="gray">{{ $t("my.all.income") }}</p>
                  <p class="font14 blod">
                    {{ (doc.days * way1earnings(doc)).toFixed(2) }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <p
            class="buy-btn d-flex"
            @click="
              open({
                parent: item,
                ...doc,
              })
            "
          >
            <span>{{ $t("deal.buyDetail.387081-12") }}</span>
          </p>
        </div>
      </div>
    </div>
    <buyPop ref="buyPop" :item="item" />
    <NoMony ref="noMony" />
  </div>
</template>
<script>
import HomeTopBar from "@/components/home/HomeTopBar.vue";
import activationCode from "@/components/activationCode";
import buyPop from "@/components/buyPop";
import NoMony from "@/components/NoMony";
import userApi from "@/api/user";
export default {
  name: "investPlans",
  components: { activationCode, HomeTopBar, buyPop, NoMony },
  data() {
    return {
      item: { min: 1 },
      money: {
        frozen: 0,
        totalInvest: 0,
      },
      records: [],
    };
  },
  methods: {
    open(doc) {
      this.item = doc;
      if (doc.parent.curr == 100) {
        this.$toast("backapi.planExpired");
        return;
      }
      if (this.balance < doc.min) {
        console.log(this.$refs);
        this.$refs.noMony.open();
        return;
      }
      this.$refs.buyPop.open();
    },
    //普通盈利
    way1earnings(doc) {
      // if (doc.showAuto) {
      //   //复利
      //   this.way2earnings(doc);
      //   return;
      // }
      const val = doc.min || 0;
      if (val > 0) {
        const curRate = doc.rate / 100;
        let num = val * curRate * 1; //天
        return num.toFixed(2);
      } else {
        return 0;
      }
    },
    //复利盈利
    way2earnings(doc) {
      const val = doc.min || 0;
      if (val > 0) {
        //= X * (1 + Y/100)*Z
        const curRate = doc.rate / 100;
        let num = val * Math.pow(1 + curRate, doc.days) - val;
        return num.toFixed(2);
      } else {
        return 0;
      }
    },
    async playerInvestMyTotal() {
      const [err, res] = await userApi.playerInvestMyTotal();
      if (err) {
        return;
      }
      this.money = res.data;
    },
    async investPlans() {
      const [err, res] = await userApi.investPlans(this.$route.query.id);
      if (err) return;
      this.records = res.data || [];
      this.records = this.records.map((item) => {
        if (typeof item.rateConfig == "string") {
          item.rateConfig = JSON.parse(item.rateConfig);
          item.rateConfig = item.rateConfig.filter(
            (v) => !(parseInt(v.show) === 0)
          );
        }
        console.log(item.rateConfig);
        item.close = false;
        return item;
      });
      this.records = this.records.filter((v) => v.rateConfig.length);
      // this.test();
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    balance() {
      return this.divide(this.user.balance);
    },
  },
  created() {
    this.$store.commit("setPdTop", false);
    this.$store.dispatch("getInfo");
    this.playerInvestMyTotal();
    this.investPlans();
  },
};
</script>
<style scoped lang="less">
.invest-plans-page {
  min-height: 100vh;
  background: url("@/assets/img/130990@2x.webp") repeat-y center top;
  background-size: 100% auto;
  .total-list {
    font-size: 15px;
    color: #e3e7ec;
    .balance {
      font-size: 22px;
      color: #fff;
      font-weight: bold;
    }
    & > li:nth-child(1) {
      .balance {
        font-size: 30px;
      }
    }
  }
  .plans {
    background: url("@/assets/img/130975@2x.webp") no-repeat center center;
    background-size: 100% 100%;
    .hot {
      width: 20px;
      height: 20px;
    }
    .icon-header {
      width: 30px;
      height: 30px;
      border-radius: 6px;
    }
    .plane-name {
      border-bottom: 1px solid rgba(112, 112, 112, 0.3);
    }
    .desc {
      flex-wrap: wrap;
      & > ul {
        width: 50%;
        img {
          width: 33px;
          height: 33px;
        }
      }
    }
    .gray {
      color: #808080;
    }
    .buy-btn {
      background: url("@/assets/img/ntf/market/130994@3x.png") no-repeat center
        center;
      background-size: 100% 100%;
      height: 51px;
      justify-content: center;
      padding-top: 6px;
    }
  }
}
</style>
