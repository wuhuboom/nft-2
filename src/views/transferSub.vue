<template>
  <div class="address-add font12 olor-primary">
    <AppTopBar
      :topBarTitle="`${$t('wallet.index.transfer.text')}( ${$t(
        'wallet.index.for.subordinate.text'
      )})`"
    >
    </AppTopBar>
    <div class="center-center py-16" v-if="false">
      <van-Loading class="color-primary" />
    </div>
    <div v-else>
      <div class="ntf-form squere-form m-t-32">
        <van-form class="p-l-16 p-r-16" @submit="onSubmit">
          <p class="lable-text bold">{{ $t("From") }}</p>
          <ul
            class="wallet-head m-b-16 p-l-12 p-r-12 align-center justify-between"
          >
            <li class="align-center">
              <img
                class="d-img"
                src="@/assets/img/ntf3/user/130003@2x.webp"
                alt=""
              />
              <span class="m-l-16 font16 gray">{{ $t("fuc.safe.text") }}</span>
            </li>
            <li class="">
              <p class="font12 gray gray m-b-8">
                {{ $t("wallet.index.balance.text") }}
              </p>
              <p class="blod">{{ mygold }}</p>
            </li>
          </ul>
          <p class="lable-text bold">
            {{ $t("To.game.account") }}
          </p>
          <van-field
            class="m-b-24"
            v-model.trim="form.account"
            :placeholder="$t('form.account.text')"
            :rules="[{ required: true, message: $t('ruls.accout.empty') }]"
          />
          <div class="m-b-24 money-list">
            <p class="lable-text p-l-16 p-t-12">
              {{ $t("To.game.account") }}
            </p>
            <van-field
              v-model.trim="form.amount"
              class="field-inlude-code"
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
                  class="send-code-btn"
                  native-type="button"
                  @click="sendAll"
                  >{{ $t("invest.detail.enter.max.text") }}</van-button
                >
              </template>
            </van-field>
          </div>

          <p class="lable-text bold">
            {{ $t("form.pwd2.text") }}
          </p>
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
  </div>
</template>

<script>
import userApi from "@/api/user";
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
  components: {},
  computed: {
    safeData() {
      return this.$store.state.safeData;
    },
    mygold() {
      return (
        this.numToFixed(this.safeData.money, this.$globalUnit.val) /
        this.$globalNum.val
      );
    },
  },
  methods: {
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
      this.$store.dispatch("safeInfo");
    },
  },
  created() {},
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
.wallet-head {
  height: 55px;
  border-radius: 10px;
  border: solid 1px #606060;
  & > li:nth-child(2) {
    text-align: right;
  }
  img {
    width: 32px;
    height: 32px;
  }
}
.gray {
  color: #85898f;
}
.money-list {
  border-radius: 5.5px;
  border: solid 1px #37ff7e;
  ::v-deep {
    .van-cell .van-field__body {
      border-color: transparent;
      background-color: transparent;
    }
  }
}
</style>
