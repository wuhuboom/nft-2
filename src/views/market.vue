<template>
  <div class="invest-plans-page font12 p-l-16 p-r-16 p-t-12">
    <div>
      <img class="d-img logo" src="@/assets/img/ntf3/130105@2x.webp" alt="" />
    </div>
    <div class="circle center-center" id="circle">
      <ul class="purchased">
        <li>{{ $t(`user.money.purchased`) }}</li>
        <li class="color-fff m-t-8 m-b-8">{{ divide(user.frozenBet) }}</li>
        <li class="active">+{{ divide(invest.today) }}</li>
        <li
          class="p-l-8 p-r-8 m-t-16 center-center"
          @click="$router.push({ name: 'Investrecord' })"
        >
          {{ $t("invest.record.page.text") }}
        </li>
      </ul>
    </div>
    <p class="font16 bold m-t-20 m-b-20">{{ $t(`planText1`) }}</p>
    <div class="plans" v-if="planeYeb.id">
      <div
        class="plans-item m-b-16"
        @click="$router.push({ name: 'InvestDetail' })"
      >
        <div class="align-center">
          <ul class="align-center flex-1 space-between m-b-16">
            <li>
              <p class="font16 m-b-8">{{ planeYeb.name }}</p>
              <p class="days p-l-4 p-r-4">{{ $t("user.in.progress") }}</p>
            </li>
            <li class="invest-pic no-shrink">
              <img class="d-img" :src="planeYeb.header" alt="" />
            </li>
          </ul>
        </div>
        <div class="rate-row p-l-12 p-r-12 justify-between align-center">
          <p class="gray">{{ $t(`rate.of.return`) }}</p>
          <p class="font16 rate color-fff">
            {{ planeYeb.rateConfig[0].rate }}%
          </p>
        </div>
        <div v-show="false">
          <van-progress
            track-color="#808080"
            color="#f5673e"
            class="m-t-16 m-b-8"
            :percentage="+planeYeb.curr"
          />
        </div>
      </div>
    </div>
    <div class="plans" v-for="(item, idx) in records" :key="idx">
      <div
        class="plans-item m-b-16"
        v-for="(doc, index) in item.rateConfig"
        :key="index"
        @click="
          chose({
            parent: item,
            ...doc,
          })
        "
      >
        <div class="align-center">
          <ul class="align-center flex-1 space-between m-b-16">
            <li>
              <p class="font16 m-b-8">{{ doc.name }}</p>
              <p class="days p-l-4 p-r-4">{{ $t("user.in.progress") }}</p>
            </li>
            <li class="invest-pic no-shrink">
              <img class="d-img" :src="doc.header" alt="" />
            </li>
          </ul>
        </div>
        <div class="rate-row p-l-12 p-r-12 justify-between align-center">
          <p>
            {{ doc.days }}
            {{ doc.days == 1 ? $t(`safe.one.days`) : $t(`safe.invite.days`) }}
          </p>
          <p class="gray">{{ $t(`rate.of.return`) }}</p>
          <p class="font16 rate color-fff">{{ doc.rate }}%</p>
        </div>
        <div v-show="false">
          <van-progress
            track-color="#808080"
            color="#f5673e"
            class="m-t-16 m-b-8"
            :percentage="item.curr"
          />
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
      <AppTopBar
        :back="close"
        :titleClass="['app-top-black-title']"
        :topBarTitle="$t(`investment`)"
        :styleObj="{ backgroundColor: 'tra' }"
      ></AppTopBar>
      <div class="buy-detail gray-bg-img p-l-16 p-r-16 p-b-32">
        <div class="buy-head">
          <div class="align-center">
            <ul class="align-center flex-1 space-between m-b-20">
              <li>
                <p class="font34 blod m-b-8">{{ item.name }}</p>
                <p class="in-progress active p-l-8 p-r-8">
                  {{ $t("user.in.progress") }}
                </p>
              </li>
              <li class="invest-pic no-shrink">
                <img class="d-img" :src="item.header" alt="" />
              </li>
            </ul>
          </div>
          <div class="buy-desc blod p-l-12 p-r-12 align-center">
            <ul class="one-invite">
              <li class="font28">{{ item.days }}</li>
              <li>
                {{
                  item.days == 1 ? $t(`safe.one.days`) : $t(`safe.invite.days`)
                }}
              </li>
            </ul>
            <ul>
              <li class="font28 align-center">
                {{ item.rate }}%
                <p>
                  <img
                    class="d-img ligth"
                    src="@/assets/img/ntf3/166@2x.webp"
                    alt=""
                  />
                </p>
              </li>
              <li>{{ $t(`rate.of.return`) }}</li>
            </ul>
          </div>
        </div>
        <ul class="font14 m-t-20 criteria" v-if="popTxt.length">
          <li class="font16 m-b-4">{{ $t("Participation.criteria") }}</li>
          <li class="gray m-b-4" v-for="(d, i) in popTxt" :key="i">
            {{ i + 1 }}、{{ d.txt }}
          </li>
        </ul>
        <div class="align-center m-t-20 blod introduction" v-if="addRate">
          <ul class="flex-1 radius align-center m-r-8">
            <li
              class="center-center text-center flex-1"
              :class="{ selected: formData.autoInvest == 1 }"
              @click="formData.autoInvest = 1"
            >
              {{ $t(`Participation.fuli`) }}
            </li>
            <li
              class="flex-1 text-center center-center"
              :class="{ selected: formData.autoInvest == 0 }"
              @click="formData.autoInvest = 0"
            >
              {{ $t(`Participation.putong`) }}
            </li>
          </ul>
          <p
            class="radius intro-desc text-center center-center"
            @click="showDesc = true"
          >
            {{ $t("privacy_support_ques.introduction.title.text") }}?
          </p>
        </div>
        <p class="m-t-20 m-b-12 font14">{{ $t(`purchase.amount`) }}</p>
        <van-form class="ntf-form ntf-form-up" @submit="onSubmit">
          <van-field
            v-model="formData.money"
            type="digit"
            name="money"
            class="field-inlude-code"
            :placeholder="limitTxt"
            :rules="[
              {
                required: true,
                message: this.$t('ruls.xxx.empty', {
                  name: this.$t('rebate.center.list.nav.smount.text'),
                }),
              },
              {
                validator,
                message: limitTxt,
              },
            ]"
          >
            <template #button>
              <van-button
                size="small"
                native-type="button"
                class="send-code-btn"
                @click="formData.money = Math.floor(balance)"
                >{{ $t("match.all.text") }}</van-button
              >
            </template>
          </van-field>
          <div class="m-t-8 m-b-20 align-center justify-between">
            <p>
              <span class="gray">{{ $t(`total.return`) }}:</span
              ><span class="color-fff">{{ earnings }}</span>
            </p>
            <p>
              <span class="gray"> {{ $t(`wallet.index.balance.text`) }}:</span>

              <span class="color-fff">{{ balance }}</span>
            </p>
          </div>

          <van-field
            class="m-b-16"
            v-if="parseInt(item.parent && item.parent.inviteRequire) === 1"
            v-model="formData.invitationCode"
            autocomplete="new-password"
            name="invitationCode"
            :placeholder="`${$t('ruls.xxx.please', {
              name: $t('form.invitecode.text'),
            })}`"
            :rules="[
              {
                required: true,
                message: this.$t('ruls.xxx.empty', {
                  name: this.$t('form.invitecode.text'),
                }),
              },
            ]"
          />
          <van-field
            class="m-b-32"
            v-model="formData.payPwd"
            name="payPwd"
            type="password"
            autocomplete="new-password"
            :placeholder="`${$t('ruls.xxx.please', {
              name: $t('Payment.password'),
            })}`"
            :rules="[
              {
                required: true,
                message: this.$t('ruls.xxx.empty', {
                  name: this.$t('Payment.password'),
                }),
              },
            ]"
          />
          <van-button
            class="ntf-vant-btn"
            block
            type="info"
            native-type="submit"
            >{{ $t("modal.confirm.text") }}</van-button
          >
        </van-form>
      </div>
      <img
        class="my-serve"
        @click="$store.dispatch('getServeData', 1)"
        src="@/assets/img/ntf3/129511@2x.webp"
        alt=""
      />
    </van-popup>
    <van-popup class="desc-art-pop" v-model="showDesc" position="center">
      <ul class="font14 desc-art-list color-fff">
        <li v-if="formData.autoInvest == 0">
          <p class="m-b-8 green">{{ $t(`Participation.putong`) }}:</p>
          <p>{{ $t(`Participation.every.day`) }}</p>
        </li>
        <li v-if="formData.autoInvest == 1">
          <p class="m-t-8 m-b-8 green">{{ $t(`Participation.fuli`) }}:</p>
          <p class="m-b-4">{{ $t(`market.rate.text1`) }}</p>
          <p class="m-b-4">{{ $t(`market.rate.text2`) }}</p>
          <p class="m-b-4">{{ $t(`market.rate.text3`) }}</p>
        </li>
      </ul>
    </van-popup>
    <van-popup
      style="width: 88%"
      class="right-art-pop"
      v-model="showRight"
      position="center"
    >
      <ul class="font14 desc-art-list color-fff p-x-20">
        <li class="center-center flex-column" :class="{ red: !right }">
          <p>
            {{
              right
                ? $t(`Participation.every.day2`)
                : $t(`Participation.every.day3`)
            }}
          </p>
        </li>
        <li
          v-for="(d, i) in popTxt"
          class="align-center tips-radio gray m-t-8"
          :class="{ red: !result[d.key] }"
          :key="i"
        >
          <p class="c-pic m-r-4">
            <img class="d-img" :src="result[d.key] ? ritIcon : errIcon" />
          </p>
          <p>{{ i + 1 }}、{{ d.txt }}</p>
        </li>
        <!-- <li class="center-center m-t-24">
          <van-button
            class="ntf-vant-btn"
            @click="showRight = false"
            block
            type="info"
            native-type="button"
            >{{ $t("modal.confirm.text") }}</van-button
          >
        </li> -->
      </ul>
    </van-popup>
    <activationCode />
  </div>
</template>

<script>
//import i18n from "@/locale";
import activationCode from "@/components/activationCode";
import yuIcon from "@/assets/img/ntf/yue.png";
import errIcon from "@/assets/img/ntf/err.png";
import ritIcon from "@/assets/img/ntf/right.png";
const initFome = () => {
  return {
    planId: "",
    money: "",
    days: "",
    payPwd: "",
    autoInvest: 1,
    invitationCode: "",
  };
};
import userApi from "@/api/user";
export default {
  name: "investPlans",
  components: { activationCode },
  data() {
    return {
      invest: {},
      errIcon,
      ritIcon,
      formData: {
        ...initFome(),
      },
      item: {},
      show: false,
      records: {},
      showDesc: false,
      showRight: false,
      result: {
        inDays: 0,
        groups: 0,
      },
      planeYeb: {},
    };
  },
  computed: {
    config() {
      return this.$store.state.config;
    },
    balance() {
      return this.divide(this.$store.state.user.balance);
    },
    user() {
      return this.$store.state.user;
    },
    right() {
      return this.result.inDays && this.result.groups;
    },
    earnings() {
      const val = this.formData.money || 0;
      if (val > 0) {
        //= X * (1 + Y/100)*Z
        const curRate = this.item.rate / 100;
        let num = val * curRate * this.item.days;
        if (+this.formData.autoInvest === 1) {
          num = val * Math.pow(1 + curRate, this.item.days) - val;
        }
        return num.toFixed(2);
      } else {
        return 0;
      }
    },
    popTxt() {
      const arr = [];
      const data = this.item;
      //模拟数据
      // Object.assign(data, {
      //   subPlayer: 1,
      //   inDays: 1,
      // });
      if (data.subPlayer) {
        arr.push({
          key: "groups",
          txt: this.$t("Participation.greater.than", {
            num: `>=${data.subPlayer}`,
          }),
        });
      }
      if (data.inDays) {
        arr.push({
          key: "inDays",
          txt: this.$t("Participation.investment.than", {
            num: `>=${data.inDays}`,
          }),
        });
      }
      return arr;
    },
    addRate() {
      return !(parseInt(this.item.showAuto) === 0);
    },
    limitTxt() {
      return `${this.$t(`deal.buyDetail.387081-5`)}:${this.item.min}-${
        this.item.max
      }`;
    },
  },
  methods: {
    async investSummary() {
      const [err, res] = await userApi.investSummary();
      if (err) return;
      this.summary = res.data;
    },
    async investMyStatis() {
      const [err, res] = await userApi.investMyStatis();
      if (err) return;
      this.invest = res.data;
    },
    validator(v) {
      return v >= this.item.min && v <= this.item.max;
    },
    async investPlanYeb() {
      // if (this.config.beyShow !== 1) return;
      const [err, res] = await userApi.investPlanYeb();
      if (err) return;
      this.planeYeb = {
        ...res.data,
        header: yuIcon,
        rateConfig: JSON.parse(res.data.rateConfig || "[]"),
      };
      console.log(this.planeYeb, "beyShow");
      if (!this.planeYeb.imgUrl) {
        this.planeYeb.imgUrl = yuIcon;
      }
    },
    async onSubmit() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      const para = Object.assign(this.formData, {
        days: this.item.days,
        planId: this.item.parent.id,
        autoInvest: this.formData.autoInvest ? 1 : 0,
      });
      const [err] = await userApi.invest(para);
      if (err) {
        if (err.code == 108) {
          this.result = err.data;
          this.showRight = true;
        }
        return;
      }
      this.$router.push({ name: "Investrecord" });
      this.formData = initFome();
      this.$toast.success(
        this.$t("backapi.self.safe.bill.detail.status.success.text")
      );
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
    test() {
      this.item = {
        ...this.records[0].rateConfig[1],
        parent: this.records[0],
      };
      this.show = true;
    },
    chose(v) {
      if (v.parent.curr == 100) {
        this.$toast("backapi.planExpired");
        return;
      }
      //更新用户
      this.$store.dispatch("getInfo");
      console.log(v);
      this.item = v;
      this.show = true;
      if (this.addRate) {
        this.formData.autoInvest = true;
      } else {
        this.formData.autoInvest = false;
      }
    },
    close() {
      this.show = false;
    },
  },
  created() {
    this.investMyStatis();
    this.investPlans();
    this.investPlanYeb();
    this.$store.commit("setPdTop", false);
    //更新用户信息
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
.purchased {
  text-align: center;
  & > li:nth-child(1) {
    color: #cacbce;
  }
  & > li:nth-child(2) {
    font-size: 22px;
    font-weight: bold;
  }
  & > li:nth-child(3) {
    font-weight: bold;
  }
  & > li:nth-child(4) {
    min-width: 105px;
    height: 38px;
    border-radius: 19px;
    border: solid 2px #6ae0c3;
    background-color: #274d4b;
  }
}
.invest-plans-page {
  .circle {
    width: 260px;
    height: 260px;
    margin: 16px auto 16px;
    background: url("@/assets/img/ntf3/126932@2x.webp") no-repeat center center;
    background-size: 100% 100%;
    position: relative;
  }

  .green {
    color: #defb84;
  }
  .gray {
    color: #cacbce;
  }
  .plans-item {
    border-radius: 14px;
    //border: solid 1px #292929;
    background-color: #161a25;
    padding: 24px 12px;
    min-width: 42px;
  }
  .rate-row {
    height: 58px;
    border-radius: 9px;
    font-weight: bold;
    background-image: linear-gradient(89deg, #242a3b 1%, #273b40 100%);
    & > p:nth-child(1) {
      text-shadow: 0 3px 6px rgba(55, 251, 124, 0.49);
      color: #caffde;
    }
    & > p:nth-child(2) {
      color: #a1adc9;
    }
  }
  .days {
    height: 18px;
    text-align: center;
    line-height: 18px;
    border-radius: 3px;
    background-color: #004021;
    display: inline-block;
  }
  .invest-pic {
    height: 46px;
    width: 46px;
    border-radius: 46px;
    overflow: hidden;
  }
  .buy-detail {
    min-height: 100%;
    padding-top: @navHeight+24px;
  }
  .buy-head {
    padding: 24px 16px 16px;
    border-radius: 9px;
    background-image: linear-gradient(87deg, #242a3b 2%, #273b40 99%);
    position: relative;
    .in-progress {
      height: 24px;
      line-height: 1;
      text-align: center;
      border-radius: 12px;
      border: solid 1px var(--main);
      display: inline-flex;
      align-items: center;
    }
    .invest-pic {
      height: 80px;
      width: 80px;
    }
    .font34 {
      font-size: 34px;
    }
    &::after {
      height: 2px;
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        #fff 52%,
        rgba(128, 128, 128, 0)
      );
    }
  }
  .buy-desc {
    text-align: center;
    .one-invite {
      margin-right: 50px;
    }
    .font28 {
      font-size: 28px;
      text-shadow: 0 3px 6px rgba(255, 255, 255, 0.49);
    }
  }
  ::v-deep {
    .el-switch__label--left {
      color: #cacbce;
    }
    .el-switch__label--right {
      color: #cacbce;
    }
    .desc-art-pop {
      width: 318px;
      padding: 14px 10px;
      border-radius: 14px;
      background-color: #1c1c1e;
    }
  }
  .desc-art-list {
    color: #e3e7eb;
  }
  .red {
    color: #ef3501;
  }
  .h-pic {
    height: 42px;
  }
  .c-pic {
    height: 20px;
    width: 20px;
    flex-shrink: 0;
  }
  .tips-radio {
    align-items: flex-start;
  }
}
.ligth {
  width: 39px;
  height: 39px;
}

.introduction {
  color: #5d7097;
  .radius {
    height: 38px;
    border-radius: 19px;
    border: solid 2px #5d7097;
  }
  & > ul {
  }
  .selected {
    height: 38px;
    border-radius: 19px;
    color: #caffde;
    border: solid 2px #6ae0c3;
    background-color: #274d4b;
  }
  .intro-desc {
    padding: 0 8px;
  }
}
.my-serve {
  display: block;
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 120px;
  right: 12px;
}

.right-art-pop {
  border-radius: 9px;
  background-image: linear-gradient(88deg, #242a3b 2%, #273b40 99%);
}
.logo {
  width: 75px;
  height: 35px;
}
</style>
