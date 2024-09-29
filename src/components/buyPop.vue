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
            v-if="parseInt(item.parent && item.parent.inviteRequire) === 1"
            v-model.trim="formData.invitationCode"
            autocomplete="new-password"
            name="invitationCode"
            ref="invitationCode"
          >
            <!-- :rules="[
              {
                required: true,
                message: this.$t('ruls.xxx.empty', {
                  name: this.$t('form.invitecode.text'),
                }),
              },
            ]" -->
            <template #label>
              <p class="align-center no-wrap-text">
                {{ $t("register.invitationCode.text")
                }}<span class="active">*</span>:
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
            <!-- :rules="[
              {
                required: true,
                message: this.$t('ruls.xxx.empty', {
                  name: this.$t('Payment.password'),
                }),
              },
            ]" -->
            <template #label>
              <p class="align-center no-wrap-text">
                {{ $t("Payment.password") }}<span class="active">*</span>:
              </p>
            </template>
          </van-field>
        </div>
        <!-- <ul class="font12 criteria br p-t-8 p-b-8" v-if="popTxt.length"></ul> -->
        <div
          class="font12 criteria br p-t-8 p-b-8"
          v-if="popTxt.length && Object.keys(result).length"
        >
          <ul class="font14 desc-art-list color-fff">
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
              class="align-center tips-radio gray m-t-8"
              :class="{ red: !result[d.key] }"
              :key="i"
            >
              <p class="c-pic m-r-4">
                <img
                  class="d-img rit"
                  :src="result[d.key] ? ritIcon : errIcon"
                />
              </p>
              <p>{{ i + 1 }}、{{ d.txt }}</p>
            </li>
          </ul>
          <!-- <ul class="font12 criteria br p-t-8 p-b-8" v-if="popTxt.length">
            <li class="font14 align-center font14 m-b-4">
              <img
                class="rit"
                src="@/assets/img/ntf/market/130995@2x.webp"
                alt=""
              />
              {{ $t("Participation.criteria") }}
            </li>
            <li class="color80 m-b-4" v-for="(d, i) in popTxt" :key="i">
              {{ i + 1 }}、{{ d.txt }}
            </li>
          </ul> -->
        </div>
        <ul class="justify-between height62 buy-much align-center">
          <li>{{ $t("buy.invest.money4") }}</li>
          <li class="font14 blod active">{{ item.min }}</li>
        </ul>
        <van-button
          class="confirm-btn m-t-16"
          block
          type="info"
          native-type="submit"
        >
          {{ $t("modal.confirm.text") }}
        </van-button>
      </van-form>
    </van-popup>
    <!-- <van-popup
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
      </ul>
    </van-popup> -->
  </div>
</template>

<script>
import errIcon from "@/assets/img/ntf/err.png";
import ritIcon from "@/assets/img/ntf/right.png";
import userApi from "@/api/user";
const initFome = () => {
  return {
    planId: "",
    money: "",
    days: "",
    payPwd: "",
    autoInvest: "",
    invitationCode: "",
  };
};
export default {
  name: "buyPop",
  data() {
    return {
      errIcon,
      ritIcon,
      formData: {
        ...initFome(),
      },
      show: false,
      showRight: false,
      result: {
        // groups: true,
        // inDays: true,
      },
    };
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
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
    open() {
      this.formData = initFome();
      this.show = true;
      this.result = {};
    },
    opened() {
      this.$nextTick(() => {
        this.$refs["invitationCode"].focus();
      });
    },
    async onSubmit() {
      if (!this.formData.invitationCode) {
        this.$toast(
          this.$t("ruls.xxx.empty", {
            name: this.$t("form.invitecode.text"),
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
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      const para = Object.assign(this.formData, {
        days: this.item.days,
        planId: this.item.parent.id,
        autoInvest: this.item.showAuto,
        money: this.item.min,
      });
      const [err] = await userApi.invest(para);
      if (err) {
        if (err.code == 108) {
          this.result = err.data;
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
        input {
          color: #fff;
          text-align: right;
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
.no-wrap-text {
  //文字不换行
  white-space: nowrap;
}
</style>
