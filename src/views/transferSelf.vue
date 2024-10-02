<template>
  <div class="address-add font12">
    <AppTopBar
      :topBarTitle="`${$t('wallet.index.transfer.text')}( ${$t(
        'wallet.index.for.self.text'
      )})`"
    >
    </AppTopBar>
    <!-- v-if="!dataList.length" -->
    <div class="center-center py-16" v-if="false">
      <van-Loading color="#1989fa" />
    </div>
    <div v-else>
      <p class="center-center p-l-16 p-r-16 m-t-16">
        {{ $t(`backapi.self.safe.huaz.transfer.center.desc.text`) }}
      </p>
      <AccountBalance />

      <ul class="m-l-32 m-r-32">
        <li class="center-center icon-desc">
          <p class="center-center">
            <van-icon class="color-fff" name="down" size="20" />
          </p>
        </li>
      </ul>
      <van-form class="ntf-form p-r-16 p-l-16 m-t-32" @submit="onSubmit">
        <van-field
          v-model.trim="form.amount"
          class="m-b-24 field-inlude-code"
          :placeholder="$t('backapi.self.safe.transfer.money.text')"
          type="number"
          :rules="[
            {
              required: true,
              message: $t('ruls.amount.length'),
            },
          ]"
        >
          <template #button>
            <van-button
              size="small"
              @click="sendAll"
              class="send-code-btn"
              native-type="button"
              >{{ $t("match.order.detail.all.text") }}</van-button
            >
          </template>
        </van-field>
        <van-field
          class="m-b-24"
          v-model.trim="form.password"
          type="password"
          autocomplete="new-password"
          :placeholder="$t('ruls.pwd2.empty')"
          :rules="[
            {
              required: true,
              message: $t('ruls.pwd2.empty'),
            },
          ]"
        />
        <div class="sumit-section center-center">
          <van-button
            class="ntf-vant-btn"
            block
            type="info"
            :loading="formLoaing"
            native-type="submit"
            >{{ $t("confirm.btn.text") }}</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";
import AccountBalance from "@/components/home/AccountBalance";
const initData = () => {
  return { amount: "", password: "" };
};
export default {
  name: "TransferSelfSubView",
  data() {
    return {
      form: {
        ...initData(),
      },
      formLoaing: false,
      loading: false,
      playerInfo: {},
    };
  },
  components: {
    AccountBalance,
  },
  computed: {
    mygold() {
      return (
        this.numToFixed(this.playerInfo.money, this.$globalUnit.val) /
        this.$globalNum.val
      );
    },
  },
  methods: {
    async refresh() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      await this.detailSafeInfo();
      this.$toast.clear();
    },
    sendAll() {
      this.form.amount = this.mygold;
    },
    async onSubmit() {
      let reqParam = {};
      reqParam.money = this.form.amount;
      reqParam.payPwd = this.form.password;
      if (this.form.amount > this.mygold) {
        this.$toast(this.$t("backapi.balanceNotEnough"));
        return;
      }
      if (+this.form.amount <= 0) {
        this.$toast(this.$t("backapi.balanceNotEnough"));
        return;
      }
      this.formLoaing = true;
      const [err, res] = await userApi.safeToBalance(reqParam);
      this.formLoaing = false;
      if (err) {
        if (err.data && err.data[0]) {
          this.$toast(this.$t(`backapi.${err.data[0].msgKey}`));
        }
        return;
      }
      if (res.msg) {
        this.$toast(res.msg);
      }
      this.form = { ...initData() };
    },
    async detailSafeInfo() {
      const [err, res] = await userApi.safeInfo();
      if (err) return;
      this.playerInfo = res.data;
    },
  },
  created() {
    this.detailSafeInfo();
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
.address-add {
  .icon-desc {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-50%);
    }
    p {
      width: 48px;
      height: 48px;
      border-radius: 16px;
      background-color: #5b5a5a;
      position: relative;
      z-index: 3;
    }
  }
  .money-str {
    font-size: 20px;
  }
  .balance {
    span {
      color: #0022ff;
    }
  }
  .icon-img {
    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
    }
  }
}
</style>
