<template>
  <div class="change-password-view font12 p-l-12 p-r-12">
    <AppTopBar :topBarTitle="$t('security.fun.pass.text')"> </AppTopBar>
    <div>
      <van-form class="ntf-form" @submit="onSubmit">
        <ChoseNav
          className="m-t-16 m-b-16"
          @chosen="form.verificationVal = $event.value"
          :cur="form.verificationVal"
          :navs="verificationOpt"
          :disabled="countdown > 0"
        />
        <van-field
          class="m-b-16 icon-input"
          v-if="form.verificationVal == 1"
          :disabled="countdown > 0"
          :value="user.email"
          :placeholder="$t('form.email.text')"
        >
          <template #left-icon>
            <img
              class="d-img icon-img"
              src="@/assets/img/124614@2x.webp"
              alt=""
            />
          </template>
        </van-field>
        <van-field
          class="m-b-16 icon-input"
          v-if="form.verificationVal == 2"
          :value="user.phone"
          disabled
          :placeholder="$t('password.setting.phone.old.phone.text')"
        >
          <template #left-icon>
            <img
              class="d-img icon-img"
              src="@/assets/img/ntf/set4.png"
              alt=""
            />
          </template>
        </van-field>
        <p class="lable-text">{{ $t("form.vercode.text") }}</p>
        <van-field
          class="m-b-16 field-inlude-code p-x-0"
          :placeholder="$t('form.vercode.text')"
          v-model.trim="form.vercode"
          :rules="[
            {
              required: true,
              message: $t('ruls.xxx.please', {
                name: $t('form.vercode.text'),
              }),
            },
          ]"
        >
          <template #button>
            <van-button
              size="small"
              @click="sendCode"
              :disabled="countdown > 0"
              class="send-code-btn"
              native-type="button"
              >{{ $t("deal.chat.921073-7")
              }}{{ countdown ? `(${countdown})` : "" }}</van-button
            >
          </template>
        </van-field>
        <p class="lable-text">
          {{
            $t(
              "user.security.center.bankcard.bankadd.input.place.pay.pass.text"
            )
          }}
        </p>
        <van-field
          class="m-b-16"
          v-model.trim="form.password"
          autocomplete="new-password"
          :type="showText ? 'text' : 'password'"
          :placeholder="$t('form.new.password.text')"
          @click-right-icon="openEye"
          :right-icon="`color-fff icon iconfont ${
            showText ? 'icon-yanjing_xianshi_o' : 'icon-yanjing_yincang_o'
          }`"
          :rules="[
            {
              validator: validatePassword,
              message: $t('digits.pass.length6'),
            },
          ]"
        />
        <p class="lable-text">
          {{
            $t(
              "user.security.center.bankcard.bankadd.input.place.pay.pass.text"
            )
          }}
        </p>
        <van-field
          class="m-b-16"
          v-model.trim="form.twoPassword"
          autocomplete="new-password"
          :type="showText ? 'text' : 'password'"
          :placeholder="$t('form.confirm.password.text')"
          @click-right-icon="openEye"
          :right-icon="`color-fff icon iconfont ${
            showText ? 'icon-yanjing_xianshi_o' : 'icon-yanjing_yincang_o'
          }`"
          :rules="[
            {
              validator: validatePassword,
              message: $t('digits.pass.length6'),
            },
            {
              validator: validateTwo,
              message: this.$t('ruls.passtwo.unequal'),
            },
          ]"
        />

        <div class="sumit-section center-center pt-16 px-16">
          <van-button
            class="ntf-vant-btn"
            :loading="loading"
            block
            type="info"
            native-type="submit"
            >{{ $t("modal.confirm.text") }}</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
const initCountdown = 60;
import userApi from "@/api/user";
export default {
  name: "ChangPassword",

  data() {
    return {
      countdown: 0,
      loading: false,
      showText: false,
      form: {
        vercode: "",
        verificationVal: 1,
        password: "",
        twoPassword: "",
      },
      verificationOpt: [
        {
          text: "Email",
          value: 1,
        },
        {
          text: "SMS",
          value: 2,
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    clearTimer() {
      this.timer && clearInterval(this.timer);
      this.countdown = 0;
    },
    sendCode() {
      this.$toast(this.$t("form.verift.going.text"));
      // 模拟发送验证码的操作
      if (this.form.verificationVal === 1) {
        userApi.emailCodeReq({
          email: this.user.email,
        });
      } else {
        userApi.phoneCodeReq({
          phone: this.user.phone,
        });
      }
      this.clearTimer();
      // 开始倒计时
      this.countdown = initCountdown; // 设置倒计时时长

      // 启动定时器，每秒减少倒计时时间
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          this.clearTimer(); // 倒计时结束时清除定时器
        }
      }, 1000);
    },
    validateTwo(value) {
      return value === this.form.password;
    },
    validatePassword(password) {
      return /^\d{6}$/.test(password);
    },
    openEye() {
      this.showText = !this.showText;
    },
    async onSubmit() {
      let reqParam = {};

      if (this.form.verificationVal == 1) {
        reqParam.email = this.user.email;
      } else if (this.form.verificationVal == 2) {
        reqParam.phone = this.user.phone;
      }

      reqParam.code = this.form.vercode;
      reqParam.newpwd = this.form.password;
      reqParam.confirmed = this.form.twoPassword;
      reqParam.verificationVal = this.form.verificationVal;
      this.loading = true;
      const [err] = await userApi.editPwdPay(reqParam);
      this.loading = false;
      if (err) {
        const currMsgKey = err.data && err.data[0] && err.data[0].msgKey;
        if (currMsgKey) {
          this.$toast(this.$t(`backapi.${currMsgKey}`));
        }
        return;
      }
      this.$toast.success();
      this.$router.back();
    },
  },
  created() {
    // this.$toast.success("");
  },
  beforeDestroy() {
    this.clearTimer();
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
.change-password-view {
  ::v-deep {
    .iconfont {
      color: var(--primary);
    }
  }
}
</style>
