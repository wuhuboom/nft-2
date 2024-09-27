<template>
  <div class="invest-plans-page font12">
    <!-- <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t(`investment`)"
      :styleObj="{ backgroundColor: 'tra' }"
    ></AppTopBar> -->
    <HomeTopBar :showLang="false">
      <template #title>
        <p class="font16" style="font-weight: normal">{{ $t(`investment`) }}</p>
      </template>
    </HomeTopBar>
    <div class="p-l-16 p-r-16 p-t-12">
      <div class="plans" v-if="planeYeb.id">
        <div
          class="plans-item m-b-16"
          @click="$router.push({ name: 'InvestDetail' })"
        >
          <div class="align-center">
            <p class="invest-pic no-shrink m-r-12">
              <img class="d-img" :src="planeYeb.header" alt="" />
            </p>
            <ul class="align-center flex-1 space-between">
              <li>
                <p class="font16">{{ planeYeb.name }}</p>
              </li>
              <li class="rate-row" v-if="planeYeb.rateConfig.length">
                <p class="gray m-b-8">{{ $t(`rate.of.return`) }}</p>
                <p class="font16 rate color-active m-b-8">
                  {{ planeYeb.rateConfig[0].rate }}%
                </p>
              </li>
            </ul>
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
            <p class="invest-pic no-shrink m-r-12">
              <img class="d-img" :src="doc.header" alt="" />
            </p>
            <ul class="align-center flex-1 space-between">
              <li>
                <p class="font16 m-b-8">{{ doc.name }}</p>
                <p class="days">
                  {{ doc.days }}
                  {{
                    doc.days == 1 ? $t(`safe.one.days`) : $t(`safe.invite.days`)
                  }}
                </p>
              </li>
              <li class="rate-row">
                <p class="gray m-b-8">{{ $t(`rate.of.return`) }}</p>
                <p class="font16 rate color-active">{{ doc.rate }}%</p>
              </li>
            </ul>
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
    </div>

    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
      <AppTopBar
        :back="close"
        :titleClass="['app-top-black-title']"
        :topBarTitle="$t(`investment`)"
        :styleObj="{ backgroundColor: 'tra' }"
      ></AppTopBar>
      <div class="buy-detail gray-bg-img p-l-16 p-r-16 p-b-32">
        <div class="align-center">
          <p class="invest-pic no-shrink m-r-12">
            <img class="d-img" :src="item.header" alt="" />
          </p>
          <ul class="align-center flex-1 space-between">
            <li>
              <p class="font16 m-b-8">{{ item.name }}</p>
              <p class="days">
                {{ item.days }}
                {{
                  item.days == 1 ? $t(`safe.one.days`) : $t(`safe.invite.days`)
                }}
              </p>
            </li>
            <li class="rate-row">
              <p class="font16 rate color-active m-b-8">{{ item.rate }}%</p>
              <p class="gray">{{ $t(`rate.of.return`) }}</p>
            </li>
          </ul>
        </div>
        <p class="m-t-20 m-b-12 font14">{{ $t(`purchase.amount`) }}</p>
        <van-form class="ntf-form" @submit="onSubmit">
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
                @click="formData.money = balance"
                >{{ $t("match.all.text") }}</van-button
              >
            </template>
          </van-field>
          <div class="m-t-8 m-b-20 align-center justify-between">
            <!-- <p>
              {{ $t(`total.return`) }}:<span class="font14">{{
                earnings
              }}</span>
            </p> -->
            <p>
              {{ $t(`wallet.index.balance.text`) }}:
              <span class="active">{{ balance }}</span>
            </p>
          </div>
          <ul class="font12 criteria m-b-20" v-if="popTxt.length">
            <li class="font14 m-b-4">{{ $t("Participation.criteria") }}:</li>
            <li class="gray m-b-4" v-for="(d, i) in popTxt" :key="i">
              {{ i + 1 }}、{{ d.txt }}
            </li>
          </ul>

          <div v-if="addRate" class="m-b-12">
            <div
              @click.stop="formData.autoInvest = 0"
              class="justify-between make-way p-x-12 align-center m-b-8"
            >
              <ul class="way-cont flex-1 m-r-20">
                <li class="m-b-8 p-b-8 align-center">
                  {{ $t(`Participation.putong`) }}
                  <van-icon
                    class="green m-l-8"
                    @click.stop="showDesc = true"
                    size="16"
                    name="question-o"
                  />
                </li>
                <li>
                  {{ $t(`total.return`) }}:<span class="font14">{{
                    way1earnings
                  }}</span>
                </li>
              </ul>

              <p>
                <van-checkbox
                  :class="{ checkboxfff: formData.autoInvest == 1 }"
                  disabled
                ></van-checkbox>
              </p>
            </div>
            <div
              @click="formData.autoInvest = 1"
              class="justify-between make-way p-x-12 align-center"
            >
              <ul class="way-cont flex-1 m-r-20">
                <li class="m-b-8 p-b-8 align-center">
                  {{ $t(`Participation.fuli`) }}
                  <van-icon
                    class="green m-l-8"
                    @click.stop="showDesc1 = true"
                    size="16"
                    name="question-o"
                  />
                </li>
                <li>
                  {{ $t(`total.return`) }}:<span class="font14">{{
                    way2earnings
                  }}</span>
                </li>
              </ul>
              <p>
                <van-checkbox
                  disabled
                  :class="{ checkboxfff: formData.autoInvest == 0 }"
                ></van-checkbox>
              </p>
            </div>
          </div>

          <!-- <ul class="m-t-20 m-b-20 align-center justify-between" v-if="addRate">
            <li class="font14 align-center">
              {{ $t(`market.rate.many`) }}
              <van-icon
                class="green m-l-8"
                @click="showDesc = true"
                size="16"
                name="question-o"
              />
            </li>
            <li>
              <el-switch
                v-model="formData.autoInvest"
                active-text="Yes"
                active-color="#f5673e"
                inactive-text="No"
              >
              </el-switch>
            </li>
          </ul> -->
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
    </van-popup>
    <van-popup
      v-if="formData.autoInvest"
      class="desc-art-pop"
      v-model="showDesc1"
      position="center"
    >
      <ul class="font14 desc-art-list color-fff">
        <li class="m-t-8 m-b-8 green">{{ $t(`Participation.fuli`) }}:</li>
        <li class="m-b-4">{{ $t(`market.rate.text1`) }}</li>
        <li class="m-b-4">{{ $t(`market.rate.text2`) }}</li>
        <li class="m-b-4">{{ $t(`market.rate.text3`) }}</li>
      </ul>
    </van-popup>
    <van-popup class="desc-art-pop" v-model="showDesc" position="center">
      <ul class="font14 desc-art-list color-fff">
        <li class="m-b-8 green">{{ $t(`Participation.putong`) }}:</li>
        <li>{{ $t(`Participation.every.day`) }}</li>
      </ul>
    </van-popup>

    <van-popup
      style="width: 88%"
      class="right-art-pop linear-global-pop"
      v-model="showRight"
      position="center"
    >
      <ul class="font14 desc-art-list color-fff">
        <li class="center-center flex-column" :class="{ red: !right }">
          <p class="h-pic m-r-4">
            <img class="d-img" :src="right ? ritIcon : errIcon" />
          </p>
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
        <li class="center-center m-t-24">
          <van-button
            class="ntf-vant-btn"
            @click="showRight = false"
            block
            type="info"
            native-type="button"
            >{{ $t("modal.confirm.text") }}</van-button
          >
        </li>
      </ul>
    </van-popup>
    <activationCode />
  </div>
</template>

<script>
import HomeTopBar from "@/components/home/HomeTopBar.vue";
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
  components: { activationCode, HomeTopBar },
  data() {
    return {
      errIcon,
      ritIcon,
      formData: {
        ...initFome(),
      },
      item: {},
      show: false,
      records: {},
      showDesc: false,
      showDesc1: false,
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
    right() {
      return this.result.inDays && this.result.groups;
    },
    //普通盈利
    way1earnings() {
      const val = this.formData.money || 0;
      if (val > 0) {
        //= X * (1 + Y/100)*Z
        const curRate = this.item.rate / 100;
        let num = val * curRate * this.item.days;
        return num.toFixed(2);
      } else {
        return 0;
      }
    },
    //复利盈利
    way2earnings() {
      const val = this.formData.money || 0;
      if (val > 0) {
        //= X * (1 + Y/100)*Z
        const curRate = this.item.rate / 100;
        let num = val * Math.pow(1 + curRate, this.item.days) - val;
        return num.toFixed(2);
      } else {
        return 0;
      }
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
    validator(v) {
      return v >= this.item.min && v <= this.item.max;
    },
    async investPlanYeb() {
      if (this.config.beyShow !== 1) return;
      const [err, res] = await userApi.investPlanYeb();
      if (err) return;
      this.planeYeb = {
        ...res.data,
        header: yuIcon,
        rateConfig: JSON.parse(res.data.rateConfig || "[]"),
      };
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
      this.show = false;
      this.$store.dispatch("getInfo");
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
      console.log(v);
      if (v.parent.curr == 100) {
        this.$toast("backapi.planExpired");
        return;
      }
      //更新用户
      this.$store.dispatch("getInfo");
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
  watch: {
    //formData.autoInvest
    // "formData.autoInvest"(val) {
    //   console.log(val);
    // },
  },
  created() {
    this.$store.commit("setPdTop", false);
    this.investPlans();
    this.investPlanYeb();
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
.invest-plans-page {
  .qustion {
    width: 16px;
    height: 16px;
    margin-left: 8px;
  }
  .make-way {
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.09);
    .way-cont > li:first-child {
      border-bottom: 1px solid rgba(112, 112, 112, 0.4);
    }
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
    background-color: rgba(150, 209, 252, 0.1);
    padding: 24px 8px;
    min-width: 42px;
  }
  .rate-row {
    text-align: right;
  }
  .days {
    height: 18px;
    line-height: 18px;
    padding: 0 10px;
    border-radius: 3px;
    background-color: #bcff2f;
    color: #000;
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
  ::v-deep {
    .van-checkbox__icon--disabled .van-icon {
      color: #fff;
      background-color: var(--main);
      border-color: var(--main);
    }
    .checkboxfff .van-icon {
      background-color: transparent;
      border-color: #707070;
      &::before {
        opacity: 0;
      }
    }
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
</style>
