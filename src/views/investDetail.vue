<template>
  <div class="invest-yue-page font12 p-l-16 p-r-16 p-b-24">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="planeYeb.name"
    >
      <template #right>
        <van-icon
          size="22"
          name="balance-list-o"
          @click="$router.push({ name: 'InvestList' })"
        />
      </template>
    </AppTopBar>
    <div class="plans" v-if="planeYeb.id">
      <div class="buy-head m-b-20 m-t-20">
        <div class="align-center">
          <ul class="align-center flex-1 space-between m-b-20">
            <li>
              <p class="font34 blod m-b-8">{{ planeYeb.name }}</p>
              <p class="in-progress active p-l-8 p-r-8">
                {{ $t("user.in.progress") }}
              </p>
            </li>
            <li class="invest-pic no-shrink">
              <img class="d-img" :src="planeYeb.header" alt="" />
            </li>
          </ul>
        </div>
        <div class="buy-desc blod p-l-12 p-r-12 align-center">
          <ul v-if="planeYeb.rateConfig.length">
            <li class="font28">{{ dayItem.rate }}%</li>
            <li>{{ $t(`rate.of.return`) }}</li>
          </ul>
        </div>
      </div>
      <p class="color-cc font14 m-b-12">{{ $t(`purchase.amount`) }}</p>
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
                type: this.$t('rebate.center.list.nav.smount.text'),
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
              class="send-code-btn"
              native-type="button"
              @click="formData.money = balance"
              >{{ $t("match.all.text") }}</van-button
            >
          </template>
        </van-field>
        <div class="m-t-8 m-b-20 align-center justify-between">
          <p>
            {{ $t(`yugu.menony`) }}:<span class="font14 m-r-4">{{
              earnings
            }}</span>
            NPR/{{ $t(`safe.one.days`) }}
          </p>
          <p>
            {{ $t(`wallet.index.balance.text`) }}:
            <span class="active">{{ balance }}</span>
          </p>
        </div>
        <div>
          <p class="m-t-24 font14 m-b-12">{{ $t(`Rules`) }}</p>
          <div class="rules-desc m-b-16">
            <van-steps direction="vertical" :active="20" active-color="#38ff7e">
              <van-step>
                <ul class="color-cc">
                  <li class="color-cc m-b-4">{{ $t("buy.time") }}</li>
                  <li>{{ date(planeYeb.profitTimeStart) }}</li>
                </ul>
              </van-step>
              <van-step>
                <ul class="color-cc">
                  <li class="color-cc color-fff m-b-4">
                    {{ $t("give.money.time") }}
                  </li>
                  <li>{{ date(planeYeb.profitTime) }}</li>
                </ul>
              </van-step>
              <van-step>
                <ul class="color-cc">
                  <li class="color-cc color-fff m-b-4">
                    {{ $t("return.time") }}
                  </li>
                  <li>
                    {{ planeYeb.orderCancelTime }}{{ $t(`return.money.time`) }}
                  </li>
                </ul>
              </van-step>
            </van-steps>
          </div>
        </div>
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
  </div>
</template>

<script>
import dayjs from "dayjs";
const initFome = () => {
  return {
    planId: "",
    money: "",
    days: "",
    payPwd: "",
  };
};
import userApi from "@/api/user";
import yuIcon from "@/assets/img/ntf/yue.png";
export default {
  name: "investPlans",
  components: {},
  data() {
    return {
      formData: {
        ...initFome(),
      },
      planeYeb: {},
    };
  },
  computed: {
    earnings() {
      const val = this.formData.money || 0;
      if (val > 0) {
        const num = val * (this.dayItem.rate / 100);
        return this.divide(num, false);
      } else {
        return 0;
      }
    },
    dayItem() {
      return this.planeYeb.rateConfig[0] || {};
    },
    balance() {
      return this.divide(this.$store.state.user.balance);
    },
    limitTxt() {
      return `${this.$t(`deal.buyDetail.387081-5`)}:${this.dayItem.min}-${
        this.dayItem.max
      }`;
    },
  },
  methods: {
    date(t) {
      return dayjs.unix(this.$ToSeconds(t)).format("YYYY-MM-DD");
    },
    validator(v) {
      return v >= this.dayItem.min && v <= this.dayItem.max;
    },
    async onSubmit() {
      this.$toast.loading({
        duration: 0,
      });
      const para = Object.assign({}, this.formData);
      para.planId = this.planeYeb.id;
      para.days = this.dayItem.days;
      const [err] = await userApi.invest(para);
      if (err) return;
      this.$toast.success();
      this.formData = initFome();
    },
    async investPlanYeb() {
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
  },
  created() {
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
.invest-yue-page {
  .invest-pic {
    height: 30px;
    width: 30px;
    border-radius: 10px;
    overflow: hidden;
  }
  .rate-row {
    text-align: right;
  }
  .gray {
    color: #cacbce;
  }
  .color-cc {
    color: #e3e7ec;
  }
  .rules-desc {
    ::v-deep {
      .van-steps {
        border-radius: 8px;
        background-color: rgba(255, 255, 255, 0.09);
      }
      .van-hairline {
        &::after {
          border-color: transparent;
        }
      }
    }
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
}
</style>
