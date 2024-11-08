<template>
  <div class="register-page font14 p-l-16 p-r-16 p-t-20">
    <AppTopBar :topBarTitle="$t('reg.btn.text')" />
    <div class="center-center">
      <van-form class="ntf-form full100" ref="form" @submit="onSubmit">
        <div class="flex-column center-center">
          <div class="full100">
            <p class="lable-text">{{ $t("form.account.text") }}</p>
            <van-field
              class="username m-b-16"
              v-model.trim="form.username"
              autocomplete="new-password"
              name="username"
              :placeholder="
                $t('ruls.xxx.please', { name: $t('form.account.text') })
              "
              :rules="[
                { required: true, message: $t('ruls.accout.empty') },
                {
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]+$/,
                  message: this.$t('reg.name.user'),
                },
              ]"
            />
            <p class="lable-text">{{ $t("form.password.text") }}</p>
            <van-field
              class="res-icon-size password m-b-16"
              v-model.trim="form.password"
              autocomplete="new-password"
              :type="showText ? 'text' : 'password'"
              :placeholder="
                $t('ruls.xxx.please', { name: $t('form.password.text') })
              "
              @click-right-icon="openEye"
              :right-icon="`color-fff icon iconfont  ${
                showText ? 'icon-yanjing_xianshi_o' : 'icon-yanjing_yincang_o'
              }`"
              :rules="[
                { required: true, message: $t('backapi.passwordIsEmpty') },
                {
                  validator: validatePassword,
                  message: $t('backapi.passwordEasy'),
                },
              ]"
            />
            <p class="lable-text">{{ $t("form.twoPassword.text") }}</p>
            <van-field
              v-model.trim="form.twoPassword"
              autocomplete="new-password"
              class="res-icon-size password m-b-16"
              @click-right-icon="openEye"
              :type="showText ? 'text' : 'password'"
              :placeholder="
                $t('ruls.xxx.please', { name: $t('form.twoPassword.text') })
              "
              :right-icon="`color-fff icon iconfont  ${
                showText ? 'icon-yanjing_xianshi_o' : 'icon-yanjing_yincang_o'
              }`"
              :rules="[
                { required: true, message: $t('backapi.passwordIsEmpty') },
                {
                  validator: validatePassword,
                  message: $t('backapi.passwordEasy'),
                },
                {
                  validator: validateTwo,
                  message: this.$t('ruls.passtwo.unequal'),
                },
              ]"
            />
            <p class="lable-text">{{ $t("form.invitecode.text") }}</p>
            <van-field
              v-model.trim="form.invitationCode"
              type="number"
              class="res-icon-size login-ceode m-b-16"
              autocomplete="new-password"
              :placeholder="
                $t('ruls.xxx.please', { name: $t('form.invitecode.text') })
              "
              :rules="[
                {
                  required: true,
                  message: $t('backapi.invitationCodeIsEmpty'),
                },
              ]"
            />
            <p class="lable-text">{{ $t("form.email.text") }}</p>
            <van-field
              v-model.trim="form.email"
              :placeholder="
                $t('ruls.xxx.please', { name: $t('form.email.text') })
              "
              class="email res-icon-size m-b-16 icon-input"
              autocomplete="new-password"
              name="email"
              :rules="[
                { required: true, message: $t('ruls.email.empty') },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                  message: this.$t('vaid.gmail'),
                },
              ]"
            >
              <template #left-icon>
                <img
                  class="d-img icon-img"
                  src="@/assets/img/ntf3/form/email.webp"
                  alt=""
                />
              </template>
            </van-field>
            <p class="lable-text" v-if="authConfig.mailCodeRequired === 1">
              {{ $t("Submitted.email.code") }}
            </p>
            <van-field
              v-if="authConfig.mailCodeRequired === 1"
              class="field-inlude-code m-b-16"
              v-model.trim="form.code"
              :placeholder="$t('Submitted.email.code')"
              :rules="[
                {
                  required: true,
                  message: $t('ruls.xxx.please', {
                    name: $t('Submitted.email.code'),
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
              {{ $t("form.phoneNum.text") }}
            </p>
            <van-field
              v-model.trim="form.phone"
              :placeholder="
                $t('ruls.xxx.please', { name: $t('form.phoneNum.text') })
              "
              type="digit"
              autocomplete="new-password"
              class="left-icon-box res-icon-size login-phone align-center phone-input"
              :rules="[
                { required: true, message: $t('ruls.phone.empty') },
                {
                  validator: validatePhone,
                  message: this.$t('vaid.phone', {
                    num: form.phone.startsWith('0') ? 11 : 10,
                  }),
                },
              ]"
            >
              <template #left-icon>
                <p @click="leftFn" class="align-center area-code">
                  <span>+{{ form.areaCode }}</span>
                  <van-icon name="arrow-down" />
                </p>
              </template>
            </van-field>
            <!-- <van-field
              v-model.trim="form.code"
              class="res-icon-size login-ceode"
              :maxlength="4"
              autocomplete="new-password"
              :placeholder="$t('form.vercode.text')"
              :rules="[{ required: true, message: $t('ruls.vercode.empty') }]"
            >
              <template #right-icon>
                <img
                  @click="verifyCodeReq"
                  width="68"
                  class="d-block"
                  :src="src"
                  alt=""
                />
              </template>
            </van-field> -->
          </div>
        </div>

        <div
          class="flex-column p-b-24 p-t-32 center-center text-center contact"
        >
          <div class="full100">
            <van-button
              class="ntf-vant-btn"
              block
              type="info"
              native-type="submit"
              >{{ $t("reg.btn.text") }}</van-button
            >
          </div>

          <div class="full100 center-center m-t-32 text-center flex-wrap">
            <p class="tips m-r-8">{{ $t("Already.a.account") }}</p>
            <p
              class="login-link color-fff flex-wrap"
              @click="$router.push({ name: 'Login' })"
            >
              {{ $t("index.index.login") }}
            </p>
          </div>
        </div>
      </van-form>
    </div>
    <BtmActionSheet
      :text="`+${form.areaCode}`"
      ref="BtmActionSheet"
      :actions="area_code"
      fix="+"
      @select="onSelect"
    />
    <!-- <van-action-sheet v-model="show" :actions="area_code" @select="onSelect" /> -->
  </div>
</template>

<script>
const initCountdown = 60;
import userApi from "@/api/user";
import to from "await-to-js";
export default {
  name: "RegisterView",
  data() {
    return {
      countdown: 0,
      src: "",
      show: false,
      form: {
        username: "",
        password: "",
        twoPassword: "",
        email: "", // 邮箱
        invitationCode: "", // 邀请码
        code: "", // 验证码
        phone: "", // 手机号
        areaCode: "", // 区号,
        verifyKey: "", // 验证码key
        emailCode: "", // 邮箱验证码
      },
      radio: [],
      showText: false,
      emailFix: "", //@gmail.com
    };
  },
  computed: {
    authConfig() {
      return this.$store.state.config;
    },
    area_code() {
      return this.$store.state.config.area_code;
    },
  },
  methods: {
    clearTimer() {
      this.timer && clearInterval(this.timer);
      this.countdown = 0;
    },
    scrollToTop() {
      if ("scrollTo" in window) {
        window.scrollTo({
          top: 0,
          behavior: "smooth", // 平滑滚动到顶部
        });
      } else {
        // 兼容旧版浏览器，使用 document.documentElement.scrollTop 或 document.body.scrollTop
        (document.documentElement || document.body).scrollTop = 0; // 适用于 Chrome、Firefox、IE、Edge 等现代浏览器
      }
    },
    async sendCode() {
      const [accountErr] = await to(this.$refs.form.validate("username"));
      if (accountErr) {
        //回到顶部
        this.scrollToTop();
        return;
      }
      const [emailErr] = await to(this.$refs.form.validate("email"));
      if (emailErr) return;
      this.$toast(this.$t("form.verift.going.text"));
      // 模拟发送验证码的操作
      userApi.authCodeReq({
        email: this.form.email + this.emailFix,
        username: this.form.username,
      });
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
    validatePassword(password) {
      return /^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/.test(password);
    },
    validatePhone(v) {
      if (this.form.areaCode != 91) return true;
      if (v.startsWith("0")) {
        return v.length === 11;
      } else {
        return v.length === 10;
      }
    },
    validateTwo(value) {
      return value === this.form.password;
    },
    async onSubmit() {
      if (!this.form.areaCode) {
        this.$toast(this.$t("backapi.areaCodeIsEmpty"));
        if (!this.area_code.length) {
          this.$store.dispatch("getCodeList");
        }
        return;
      }
      const data = Object.assign({}, this.form);
      data.phone = data.areaCode + data.phone;
      data.email = data.email + this.emailFix;
      if (this.authConfig.mailCodeRequired !== 1) {
        delete data.emailCode;
      }
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
      });
      const [err] = await userApi.register(data);
      this.$toast.clear();
      if (err) {
        if (Array.isArray(err.data) && err.data.length) {
          this.$toast(this.$t(`backapi.${err.data[0].msgKey}`));
        }
        this.verifyCodeReq();
        return;
      }
      this.$toast.success(
        `${this.$t("index.editor.psd.modal.success.text2")},${this.$t(
          "index.editor.psd.modal.success.text3"
        )}`
      );
      setTimeout(() => {
        this.$router.push({ name: "Login" });
      }, 3000);
      // this.$store.commit("setUser", res.data);
    },
    change() {},
    onSelect(item) {
      this.form.areaCode = item.name;
    },
    leftFn() {
      this.$refs.BtmActionSheet.open();
    },
    openEye() {
      this.showText = !this.showText;
    },
    async verifyCodeReq() {
      // this.form.code = "";
      // const [err, res] = await userApi.verifyCodeReq();
      // if (err) {
      //   if (+err.code == 409) {
      //     this.$toast(this.$t("backapi.self.alert.fast.access.tip.text"));
      //   }
      //   return;
      // }
      // this.src = res.data.img;
      // this.form.verifyKey = res.data.verifyKey;
    },
  },
  created() {
    this.$store.commit("setPdTop", true);
    this.verifyCodeReq();
    this.form.areaCode = this.area_code[0];

    if (this.$route.query.code) {
      this.form.invitationCode = this.$route.query.code;
    }
  },
};
</script>
<style lang="less" scoped>
.register-page {
  background-color: #050b07;
  min-height: 100vh;
}
.code-btn {
  background-color: transparent !important;
  border-color: transparent !important;
  color: var(--main) !important;
}
.title {
  font-size: 20px;
}
.back-title {
  width: 39px;
  height: 39px;
  border-radius: 11.5px;
  border: solid 1px #232323;
}
.tips {
  color: rgba(255, 255, 255, 0.6);
}
</style>
