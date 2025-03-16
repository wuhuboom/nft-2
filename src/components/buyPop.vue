<template>
  <div>
    <van-popup
      @opened="opened"
      v-model="show"
      class="buy-plans-pop p-l-16 p-r-16 p-b-16"
    >
      <p class="head">
        <img
          class="d-img"
          src="@/assets/img/ntf/market/130991@2x.webp"
          alt=""
        />
      </p>
      <van-form @submit="onSubmit">
        <p class="active font16 blod text-center">{{ $t("confirm.order") }}</p>
        <div class="height62 align-center">
          <van-field
            v-if="showInvite"
            v-model.trim="formData.invitationCode"
            autocomplete="new-password"
            name="invitationCode"
            ref="invitationCode"
          >
            <template #label>
              <p class="align-center no-wrap-text">
                {{ $t("enter.inint.code") }}<span class="active">*</span>
              </p>
            </template>
          </van-field>
        </div>
        <div class="height62 align-center">
          <van-field
            v-model.trim="formData.payPwd"
            name="payPwd"
            type="password"
            autocomplete="new-password"
          >
            <template #label>
              <p class="align-center no-wrap-text">
                {{ $t("Payment.password") }}<span class="active">*</span>
              </p>
            </template>
          </van-field>
        </div>
        <div class="font12 criteria br p-t-8 p-b-8" v-if="popTxt.length">
          <ul class="font14 desc-art-list">
            <li
              class="font14 align-center font14 m-b-4"
              :class="{ red: !right }"
            >
              <p class="m-r-4">
                <img class="d-img rit" :src="right ? ritIcon : errIcon" />
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
              class="align-center tips-radio m-t-8"
              :class="{ red: !result[d.key] }"
              :key="i"
            >
              <p>{{ i + 1 }}、{{ d.txt }}</p>
            </li>
          </ul>
        </div>
        <div class="height62 align-center sdsdsdsd">
          <van-field
            v-model.trim="formData.money"
            name="money"
            type="digit"
            :disabled="!hasMax"
            @input="input"
          >
            <template #label>
              <div class="flex-column no-wrap-text">
                <p class="align-center">
                  {{ $t("info.trade.col4.text") }} {{ hasMax ? minMax : ""
                  }}<span class="active">*</span>
                </p>
              </div>
            </template>
          </van-field>
        </div>
        <p class="m-t-12 m-b-12 font14">
          {{ $t("invest.record.table.col4.text") }}:
          <span class="make-m blod">{{ $delZero(way1earnings) }}</span>
        </p>
        <div class="height62 align-center justify-between stepper-list font14">
          <div class="flex-column no-wrap-text">
            <p class="align-center">{{ $t("my.buy.how") }}:</p>
          </div>
          <div>
            <van-stepper
              v-model="formData.quantity"
              :min="1"
              :max="buyMuch.current"
            />
          </div>
        </div>
        <!-- total current -->
        <ul class="m-t-12 m-b-24 font12" v-if="buyMuch.close !== 1">
          <template v-if="buyMuch.current > 0">
            <li
              class="m-b-4"
              v-html="$t('my.buy.total', { num: buyMuch.total })"
            ></li>
            <li v-html="$t('my.buy.current', { num: buyMuch.current })"></li>
          </template>
          <li
            v-else
            style="color: red"
            v-html="$t('my.buy.curfinish', { num: buyMuch.total })"
          ></li>
        </ul>
        <van-button
          class="confirm-btn m-t-16"
          block
          :disabled="buyMuch.current === 0"
          type="info"
          native-type="submit"
        >
          {{ $t("modal.confirm.text") }}
        </van-button>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import userApi from "@/api/user";
import errIcon from "@/assets/img/ntf/err.png";
import ritIcon from "@/assets/img/ntf/market/130995@2x.webp";
const initFome = () => {
  return {
    planId: "",
    money: "",
    days: "",
    payPwd: "",
    autoInvest: "",
    invitationCode: "",
    quantity: 1,
  };
};
export default {
  name: "buyPop",
  data() {
    return {
      showErr: false,
      errIcon,
      ritIcon,
      formData: {
        ...initFome(),
      },
      show: false,
      showRight: false,
      result: {
        groups: true,
        inDays: true,
      },
    };
  },
  props: {
    daysResult: {
      type: Object,
      default: () => {},
    },
    item: {
      type: Object,
      default: () => {},
    },
    buyMuch: {
      type: Object,
      default: () => {
        return {
          total: 5,
          current: Infinity,
          close: 1,
        };
      },
    },
  },
  computed: {
    //普通盈利 每天的收益
    way1earnings() {
      const base = +(this.item.fixed || 0);
      const val = this.formData.money || 0;
      if (val > 0) {
        const curRate = this.item.rate / 100;
        let num = val * curRate * 1 + base;
        return (num * this.item.days).toFixed(2);
      } else {
        return 0;
      }
    },
    hasMax() {
      return this.minMax.includes("-");
    },
    minMax() {
      let str = "";
      if (this.item.min && this.item.max && this.item.max > this.item.min) {
        str = `${this.item.min}-${this.item.max}`;
      } else {
        str = `${this.item.min}`;
      }
      return str;
    },
    showInvite() {
      return parseInt(this.item.parent && this.item.parent.inviteRequire) === 1;
    },
    popTxt() {
      const arr = [];
      const data = this.item || {};
      // Object.assign(data, {
      //   inDays: 1,
      //   subPlayer: 1,
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
    right() {
      return this.result.inDays && this.result.groups;
    },
  },
  methods: {
    input() {
      this.formData.money = this.formData.money.replace(/^0+/, "");
    },
    blurMoney() {
      if (!this.hasMax) return;
      if (
        !(
          this.formData.money >= this.item.min &&
          this.formData.money <= this.item.max
        )
      ) {
        this.$toast(`${this.$t("Limit.Range")} ${this.minMax}`);
        this.formData.money = this.item.max || this.item.min;
      }
    },
    open() {
      this.show = true;
      this.$nextTick(() => {
        this.formData = initFome();
        if (!this.hasMax) {
          this.formData.money = this.item.min;
        }

        this.result = {
          groups: true,
          inDays: true,
        };
      });
    },
    opened() {
      this.$nextTick(() => {
        if (this.$refs["invitationCode"]) {
          this.$refs["invitationCode"].focus();
        }
      });
    },
    sleep(v) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, v * 1000);
      });
    },
    async onSubmit() {
      if (!this.formData.invitationCode && this.showInvite) {
        this.$toast(
          this.$t("ruls.xxx.empty", {
            name: this.$t("enter.inint.code"),
          })
        );
        return;
      }
      if (!this.formData.payPwd) {
        this.$toast(
          this.$t("ruls.xxx.empty", {
            name: this.$t("Payment.password"),
          })
        );
        return;
      }
      if (this.hasMax) {
        if (
          !(
            this.formData.money >= this.item.min &&
            this.formData.money <= this.item.max
          )
        ) {
          this.$toast(`${this.$t("Limit.Range")} ${this.minMax}`);
          return;
        }
      }
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      const para = Object.assign(this.formData, {
        days: this.item.days,
        id: this.item.id,
        planId: this.item.parent.id,
        autoInvest: this.item.showAuto,
      });
      const [err] = await userApi.invest(para);

      // this.result = {
      //   groups: 1,
      //   inDays: 0,
      // };
      if (err) {
        if (err.code == 108) {
          this.result = err.data;
        }
        return;
      }
      await this.sleep(1.5);
      this.show = false;

      this.formData = initFome();
      this.$emit("success");
      this.$toast.success(
        this.$t("backapi.self.safe.bill.detail.status.success.text")
      );
    },
  },
  created() {},
};
</script>

<style scoped lang="less">
.buy-plans-pop {
  background: url("@/assets/img/ntf/market/130983@2x.webp") no-repeat center
    center;
  background-size: 100% 100%;
  min-height: 300px;
  width: 276px;
  overflow: visible;
  color: #808080;
  ::v-deep {
    .van-field--disabled .van-field__label {
      color: #646566;
    }
    .van-field__value {
      position: static;
    }
    .van-cell {
      overflow: visible;
      position: relative;
      background-color: transparent;
      border-color: transparent;
      padding-left: 0;
      padding-right: 0;
      &::after {
        display: none;
      }
      .van-field__label {
        width: auto;
      }
      .van-field__body {
        &,
        input {
          height: 100%;
        }
        input {
          color: #fff;
          text-align: right;
          -webkit-text-fill-color: #fff;
        }
      }
    }
    .van-field__error-message {
      position: absolute;
      top: 30px;
      left: 0;
      //省略号
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
  }
}
.head {
  width: 95px;
  height: 95px;
  margin: -24px auto 0;
}
.br {
  border-bottom: 1px solid rgba(112, 112, 112, 0.12);
}
.height62 {
  height: 62px;
  border-bottom: 1px solid rgba(112, 112, 112, 0.12);
}
.rit {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}
.confirm-btn {
  background-color: transparent;
  border-color: transparent;
  height: 36px;
  border-radius: 6px;
  background-image: linear-gradient(to right, #f5673e, #f03700);
}
//tanc
.desc-art-list {
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
.no-wrap-text {
  //文字不换行
  white-space: nowrap;
}
.limit-rang {
  font-size: 10px;
}
.make-m {
  color: #f5673e;
}
.stepper-list {
  ::v-deep {
    .van-stepper {
      border: 1px solid #707070;
      border-radius: 5px;
      overflow: hidden;
    }
    .van-stepper__minus,
    .van-stepper__plus {
      background: #5b5a5a;
      border-radius: 0;
      color: #fff;
    }
    .van-stepper__input {
      background-color: transparent;
      color: #f5673e;
    }
  }
}
.show-err-dilog {
  width: 270px;
  min-height: 111px;
  background: linear-gradient(180deg, #1f2430 0%, #151515 100%);
  border-radius: 14px 14px 14px 14px;
}
</style>
