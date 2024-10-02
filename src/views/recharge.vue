<template>
  <div class="message-page font12 p-l-16 p-r-16">
    <AppTopBar :topBarTitle="$t('deal.recharge.354498-0')"> </AppTopBar>
    <div class="center-center py-16" v-if="!rechargeList.length">
      <van-Loading class="color-primary" />
    </div>
    <div v-else class="m-t-12 gray">
      <p class="font13 m-b-12">{{ $t(`rechange.way`) }}</p>
      <ul class="type-list m-b-8">
        <li
          v-for="(item, index) in rechargeList"
          class="m-r-16"
          @click="chose(item)"
          :class="{ 'color-active': item.id === chooseRecType.id }"
          :key="index"
        >
          <div class="cont">
            <p v-if="item.img" class="pic center-center">
              <img :src="item.img" alt="" />
            </p>
            <p class="center-center">{{ item.name }}</p>
          </div>
        </li>
      </ul>
      <p class="font13 m-b-12 m-t-16">{{ $t(`recharge.amount.text`) }}</p>
      <div class="ntf-form m-b-12">
        <van-form ref="form" @submit="onSubmit">
          <!-- :placeholder="inputPlace" -->
          <van-field
            v-model.trim="amount"
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
          <p class="limit m-t-8 active">
            {{ $t(`deal.buyDetail.387081-5`) }}:{{ chooseRecType.minMax }}
          </p>
          <div class="justify-between m-t-8">
            <p>
              <span class="m-b-4">{{ $t("recharge.usdt.rate.text") }}:</span
              ><span class="color-fff">
                <!-- {{ chooseRecType.type == 1 ? "USDT" : ""
              }} -->
                {{ chooseRecType.rate }}</span
              >
            </p>
            <p class="flex-1 amount-text">
              <span class="m-b-4">{{ $t("recharge.real.amount.text") }}:</span
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
          <div class="num center-center" :class="{ active: item == amount }">
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
      this.amount = this.chooseRecType.def;
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
    text-align: right;
  }
  .gray {
    color: #cacbce;
  }
  .type-text {
    text-align: center;
  }
  .type-list {
    display: flex;
    flex-wrap: wrap;
    & > li:nth-child(4n) {
      margin-right: 0 !important;
    }
    & > li {
      .cont {
        width: 73px;
        height: 55px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        border-radius: 15px;
        background-color: rgba(255, 255, 255, 0.1);
        border: 1px solid transparent;
      }

      .pic {
        width: 65px;
        height: 28px;
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
        border-color: var(--main) !important;
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
      line-height: 31px;
      height: 31px;
      border-radius: 6px;
      border: solid 1px #393939;
      background-color: #292929;
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
    border: 1px solid var(--main);
    border-radius: 8px;
  }
}
</style>
