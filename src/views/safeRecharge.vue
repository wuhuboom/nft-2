<template>
  <div class="safe-recharge-view font12 p-l-16 p-r-16">
    <AppTopBar
      :topBarTitle="`${$t(`fuc.safe.text`)} ${$t('home.index.recharge.text')}`"
    >
    </AppTopBar>
    <div>
      <van-form
        class="ntf-form squere-form p-t-20"
        ref="form"
        @submit="onSubmit"
      >
        <p class="lable-text">{{ $t(`rechange.way`) }}</p>
        <div class="el-ntf-select m-b-16">
          <el-select
            v-model="typeId"
            class="full100"
            :placeholder="$t('index.editor.psd.text')"
          >
            <el-option
              v-for="item in rechargeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <p class="lable-text">{{ $t(`recharge.amount.text`) }}</p>
        <van-field
          class="amount-form"
          :placeholder="`${$t('deal.buyDetail.387081-5')}:${
            chooseRecType.minMax
          }`"
          :rules="[
            {
              validator,
              message: this.inputPlace,
            },
          ]"
          type="number"
          v-model.trim="amount"
        />
        <div class="justify-between align-center gray m-b-20 m-t-8">
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

    <!-- <p class="font13 m-b-12 m-t-12">{{ $t(`rechange.way`) }}</p>
    <ul class="type-list m-b-8">
      <li
        class="m-b-8 align-center justify-between p-l-8 p-r-8"
        v-for="(item, index) in rechargeList"
        @click="chose(item)"
        :class="{ 'color-active': item.id === chooseRecType.id }"
        :key="index"
      >
        <div class="align-center">
          <p v-if="item.img" class="pic m-r-8">
            <img class="d-img" :src="item.img" alt="" />
          </p>
          <p>{{ item.name }}</p>
        </div>
        <van-checkbox
          v-if="item.id === chooseRecType.id"
          disabled
          checked-color="#ee0a24"
        ></van-checkbox>
        <van-checkbox v-else checked-color="#ee0a24"></van-checkbox>
      </li>
    </ul> -->
    <div class="">
      <ul class="pre-amount m-t-8">
        <li
          class="m-b-8"
          v-for="(item, idx) in quickAmountList"
          @click="amount = item"
          :key="idx"
        >
          <div
            class="num center-center"
            :class="{ 'asctve-btn': item == amount }"
          >
            {{ item }}
          </div>
        </li>
      </ul>

      <div class="center-center m-t-20">
        <van-button
          class="ntf-vant-btn"
          block
          type="info"
          :loading="loading"
          @click="sumbit"
        >
          {{ $t("confirm.btn.text") }}</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import userApi from "@/api/user";
import to from "await-to-js";
export default {
  name: "TechnicalsupportView",
  data() {
    return {
      loading: false,
      rechargeList: [],
      amount: "",
      typeId: "",
      data: {},
    };
  },
  computed: {
    chooseRecType() {
      return this.rechargeList.find((v) => v.id === this.typeId) || {};
    },
    moneyStr() {
      return this.data.money / this.$globalNum.val;
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
    quickAmountList() {
      if (this.chooseRecType.fast) {
        return this.chooseRecType.fast.split("-");
      }
      return [];
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
    async refresh() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      await this.safeInfo();
      this.$toast.clear();
    },
    async safeInfo() {
      this.loading = true;
      const [err, res] = await userApi.safeInfo();
      this.loading = false;
      if (err) return;
      this.data = res.data;
    },
    validator(val) {
      if (Array.isArray(this.minMax)) {
        if (+val < this.minMax[0] || +val > this.minMax[1]) {
          return false;
        }
      }
      return true;
    },
    chose(item) {
      if (!item) return;
      // this.chooseRecType = item;
      // this.rechargeList.forEach((v) => {
      //   v.chose = v.id === item.id;
      // });
      this.typeId = item.id;
      if (this.quickAmountList && this.quickAmountList.length > 0) {
        this.amount = this.quickAmountList[0];
        return;
      }
      this.amount = "";
    },
    async sumbit() {
      const [err] = await to(this.$refs.form.validate());
      if (err) {
        return;
      }
      this.onSubmit();
    },
    async onSubmit() {
      this.loading = true;
      const [err, res] = await userApi.safeRecharge({
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
    async getList() {
      const [err, res] = await userApi.rechargePreMult();
      if (err) {
        return;
      }
      this.rechargeList = res.data.map((v) => {
        return {
          ...v,
          chose: false,
        };
      });
      console.log(this.rechargeList);
      if (this.rechargeList.length) {
        this.rechargeList[0].chose = true;

        this.chose(this.rechargeList[0]);
      }
    },
  },
  created() {
    this.getList();
    this.safeInfo();
  },
};
</script>
<style scoped lang="less">
.safe-recharge-view {
  .el-ntf-select {
  }
  .gray {
    color: #8a929a;
  }
  .amount-text {
    text-align: right;
  }
  .limit {
    // text-align: right;
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
      height: 46px;
      line-height: 46px;
      border-radius: 5.5px;
      border: solid 1px #606060;
      &.asctve-btn {
        border: none;
        background-image: linear-gradient(to right, #11998e 0%, #38ef7d 100%);
      }
    }
    .active {
      background-color: var(--main);
      border-color: var(--main);
      color: #fff !important;
    }
  }
  .form-box {
    border: 1px solid var(--primary);
    border-radius: 20px;
  }
  .money-str {
    font-size: 26px;
    font-weight: 900;
  }
  .types {
    font-size: 16px;
    font-weight: bold;
    padding: 30px 0 16px;
  }
  .type-list {
    & > li {
      background-color: rgba(255, 255, 255, 0.1);
      height: 42px;
      border-radius: 8px;
      .pic {
        width: 22px;
        height: 22px;
      }
    }
  }
  .rate {
    color: #8a929a;
    padding-top: 8px;
  }
  .head {
    height: 155px;
    background: url("@/assets/img/rechang.webp") no-repeat center top;
    background-size: 100% auto;
  }
  .recharge-sign {
    background: url("@/assets/img/charge.webp") no-repeat center top;
    background-size: cover;
    width: 114px;
    height: 122px;
    & > span {
      padding-top: 16px;
      width: 96px;
      height: 104px;
    }
  }
  ::v-deep {
    .van-checkbox__icon--disabled .van-icon {
      color: #fff;
      background-color: var(--main);
      border-color: var(--main);
    }
  }
}
</style>
