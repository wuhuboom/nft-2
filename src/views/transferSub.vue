<template>
  <div class="address-add font12 olor-primary">
    <AppTopBar
      :styleObj="{ backgroundColor: 'transparent' }"
      :topBarTitle="`${$t('wallet.index.transfer.text')}( ${$t(
        'wallet.index.for.subordinate.text'
      )})`"
    >
    </AppTopBar>
    <div class="center-center py-16" v-if="false">
      <van-Loading class="color-primary" />
    </div>
    <div v-else>
      <AccountBalance />
      <ul class="m-l-32 m-r-32">
        <li class="center-center icon-desc">
          <p class="center-center">
            <van-icon class="color-fff" name="down" size="20" />
          </p>
        </li>
      </ul>
      <van-form class="defind-form" @submit="onSubmit">
        <van-field
          class="m-b-24"
          v-model.trim="form.account"
          :placeholder="$t('form.account.text')"
          :rules="[{ required: true, message: $t('ruls.accout.empty') }]"
        />
        <van-field
          v-model.trim="form.amount"
          class="m-b-24"
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
              class="page-res-btn"
              native-type="button"
              @click="sendAll"
              color="#0025fc"
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
            class="page-res-btn"
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
  return { account: "", amount: "", password: "" };
};
export default {
  name: "TransferSubView",
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
      reqParam.aimName = this.form.account;
      reqParam.money = this.form.amount;
      reqParam.payPwd = this.form.password;
      this.formLoaing = true;
      const [err, res] = await userApi.safeTransfer(reqParam);
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
    font-size: 26px;
    font-weight: 900;
  }
  .van-cell {
    padding: 0;
    background-color: transparent;
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
