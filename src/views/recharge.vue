<template>
  <div class="message-page font14 p-l-16 p-r-16">
    <AppTopBar :topBarTitle="$t('deal.recharge.354498-0')"> </AppTopBar>
    <div class="center-center py-16" v-if="!rechargeList.length">
      <van-Loading class="color-primary" />
    </div>
    <div v-else class="gray">
      <!-- <div class="top-desc center-center m-b-20 p-t-24">
        <img class="d-img" src="@/assets/img/ntf3/user/129517@2x.webp" alt="" />
      </div> -->

      <div class="ntf-form rech-form m-b-12">
        <van-form ref="form" @submit="onSubmit">
          <p class="lable-text m-t-20 m-b-12">
            {{ $t(`rechange.way`) }}
          </p>
          <ul class="type-list m-b-16">
            <li
              v-for="(item, index) in rechargeList"
              class="m-r-20 m-b-8"
              @click="chose(item)"
              :class="{ 'color-active': item.id === chooseRecType.id }"
              :key="index"
            >
              <div class="cont center-center">
                <p v-if="item.img" class="pic center-center">
                  <img :src="item.img" alt="" />
                </p>
                <p class="center-center">{{ item.name }}</p>
              </div>
            </li>
          </ul>
          <p class="lable-text m-b-12">
            {{ $t(`recharge.amount.text`) }}
          </p>
          <van-field
            v-model.trim="amount"
            :placeholder="`${$t(`deal.buyDetail.387081-5`)}:${
              chooseRecType.minMax
            }`"
            :rules="[
              {
                validator,
                message: this.inputPlace,
              },
            ]"
            type="number"
          >
            <template #button>
              <!-- <span class="color-fff">{{ chooseRecType.currencySymbol }}</span> -->
            </template>
          </van-field>

          <div class="m-t-8 m-b-20 align-center justify-between">
            <p>
              <span class="">{{ $t("recharge.usdt.rate.text") }}:</span
              ><span class="color-fff">
                <!-- {{ chooseRecType.type == 1 ? "USDT" : ""
              }} -->
                {{ chooseRecType.rate }}</span
              >
            </p>
            <p class="amount-text">
              <span class="">{{ $t("recharge.real.amount.text") }}:</span
              ><span class="color-fff"
                >{{ ngnToUsdtMoney }}
                <!-- {{ chooseRecType.currencySymbol }} -->
              </span>
            </p>
          </div>
        </van-form>
      </div>
      <ul class="pre-amount">
        <li
          class="m-b-8"
          v-for="(item, idx) in quickAmountList"
          @click="amount = item"
          :key="idx"
        >
          <div
            class="num center-center color-fff"
            :class="{ chose: item == amount }"
          >
            {{ item }}
          </div>
        </li>
      </ul>
      <div class="center-center m-t-20">
        <van-button
          block
          class="ntf-vant-btn"
          type="info"
          :loading="loading"
          @click="$refs.form.submit()"
        >
          {{ $t("recharge.button.now.text") }}</van-button
        >
      </div>
      <ul class="m-t-16 p-x-8 said-text">
        <li>{{ $t(`recharge.tip.title.text`) }}</li>
        <li class="m-b-16">
          {{ $t(`backapi.self.recharge.tip.content1.text`) }}
        </li>
        <li class="m-b-16">
          {{ $t(`backapi.self.recharge.tip.content2.text`) }}
        </li>
        <li class="m-b-16">
          {{ $t(`backapi.self.recharge.tip.content3.text`) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";
import i18n from "@/locale";
export default {
  name: "RechargeView",
  data() {
    return {
      loading: false,
      rechargeList: [],
      chooseRecType: {},

      amount: "",
      rechargeTipLists: [
        i18n.t("backapi.self.recharge.tip.content1.text"),
        i18n.t("backapi.self.recharge.tip.content2.text"),
        i18n.t("backapi.self.recharge.tip.content3.text"),
      ],
    };
  },
  computed: {
    quickAmountList() {
      if (this.chooseRecType.fast) {
        return this.chooseRecType.fast.split("-");
      }
      return [];
    },
    minMax() {
      if (!this.chooseRecType.minMax) return "";
      return this.chooseRecType.minMax.split("-").map((v) => +v);
    },
    inputPlace() {
      if (!this.chooseRecType.minMax) return "";
      return `${this.$t("recharge.single.amount.text")}:${
        this.chooseRecType.minMax
      }`;
    },
    ngnToUsdtMoney() {
      if (this.amount) {
        let returnAmountStr = "";
        let reAmountStr = (this.amount * this.chooseRecType.rate).toString();
        reAmountStr = reAmountStr.split(".");
        let leftAmount = reAmountStr[0];
        if (reAmountStr[1]) {
          let saveToStr = reAmountStr[1].substring(0, 2);
          returnAmountStr = leftAmount + "." + saveToStr;
        } else {
          returnAmountStr = reAmountStr[0];
        }
        return returnAmountStr;
      } else {
        return 0.0;
      }
    },
  },
  methods: {
    validator(val) {
      if (Array.isArray(this.minMax)) {
        if (+val < this.minMax[0] || +val > this.minMax[1]) {
          return false;
        }
      }
      return true;
    },
    async onSubmit() {
      this.loading = true;
      const [err, res] = await userApi.rechargeOrder({
        payId: this.chooseRecType.id,
        money: this.amount * 1,
      });
      this.loading = false;
      if (err) {
        if (err.data && err.data[0]) {
          this.$toast(this.$t(`backapi.${err.data[0].msgKey}`));
        }
        return;
      }
      if (res.data.UrlAddress) {
        window.location.href = res.data.UrlAddress;
      }
    },
    async recharge() {
      const params = {
        lang: this.$store.state.lang,
      };
      const [err, res] = await userApi.recharge(params);
      if (err) return;
      this.rechargeList = res.data;

      this.chose(this.rechargeList[0]);
    },
    chose(item) {
      if (!item) return;
      this.chooseRecType = item;
      // if (this.quickAmountList && this.quickAmountList.length > 0) {
      //   this.amount = this.quickAmountList[0];
      //   return;
      // }
      this.amount = this.chooseRecType.def || "";
    },
  },
  created() {
    this.recharge();
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
.message-page {
  .amount-text {
  }
  .gray {
    color: #9db1cd;
  }
  .type-text {
    text-align: center;
  }
  .type-list {
    display: flex;
    flex-wrap: wrap;
    & > li:nth-child(3n) {
      margin-right: 0 !important;
    }
    & > li {
      .cont {
        display: flex;
        align-items: center;
        padding: 0 14px;
        height: 28px;
        border-radius: 14px;
        background-color: #30405b;
        border: 1px solid transparent;
        color: #fff;
      }

      .pic {
        width: 20px;
        height: 20px;
        margin-right: 8px;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
    & > li:nth-child(3n + 2) {
      // border-right: 1px solid var(--primary);
      // border-left: 1px solid var(--primary);
    }
    & > li.color-active {
      .cont {
        background-image: linear-gradient(to bottom, #11998e, #38ef7d);
        background-color: transparent;
      }
    }
  }
  .count {
    height: 99px;
    background: url("@/assets/img/red/reghar.webp") no-repeat center center;
    background-size: 100% 100%;
  }
  .enter-form {
    ::v-deep {
      .van-cell {
        background-color: transparent;
        padding-left: 0;
        padding-right: 0;
        &::after {
          display: none;
        }
      }
      .van-field__control {
        color: var(--primary);
      }
      .van-field__body {
        background: url("@/assets/img/red/inputborder.webp") no-repeat 0 12px;
        padding-bottom: 4px;
        background-size: 100% auto;
        text-align: right;
      }
      .limit,
      [type="text"],
      .van-field__error-message {
        text-align: right;
      }
    }
  }
  .pre-amount {
    display: flex;
    flex-wrap: wrap;
    & > li {
      width: 33.333%;

      padding: 4px;
    }
    .num {
      text-align: center;
      height: 31px;
      border-radius: 15.5px;

      background-color: #30405b;
      &.chose {
        background-color: transparent;
        background-image: linear-gradient(to right, #11998e, #38ef7d 96%);
      }
    }
    .active {
      background-color: var(--main);
      border-color: var(--main);
      color: #fff !important;
    }
  }
  .sumit-section {
    .van-button {
      height: 20px;
      border-radius: 8px;
      background-color: var(--primary);
      border: none;
      flex-basis: 100px;
      white-space: nowrap;
    }
  }
  .said-text {
  }
}
.rech-form {
  ::v-deep {
    .van-cell {
      .van-field__body {
        border-radius: 12px;
        border: solid 0.5px #545d6a;
        background-color: #1d222b;
      }
    }
  }
}

.el-icon-check {
  font-size: 20px;
}
.top-desc {
  img {
    width: 343px;
    height: 83px;
  }
}
.lable-text {
  color: #fff;
}
</style>
