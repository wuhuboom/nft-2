<template>
  <div class="change-password-view font12 p-l-12 p-r-12">
    <AppTopBar :topBarTitle="$t('security.mail.text')"> </AppTopBar>
    <div>
      <van-form class="ntf-form m-t-16" @submit="onSubmit">
        <p class="lable-text">{{ $t("security.update.oldemail.text") }}</p>
        <van-field
          class="m-b-16 icon-input"
          disabled
          :value="user.email"
          :placeholder="$t('updata.email.success.text')"
        >
          <template #left-icon>
            <img
              class="d-img icon-img"
              src="@/assets/img/124614@2x.webp"
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
        <p class="lable-text">{{ $t("security.update.newemail.text") }}</p>
        <van-field
          v-model.trim="form.email"
          :placeholder="$t('form.email.text')"
          class="left-icon-box m-b-16"
          autocomplete="new-password"
          :rules="[
            { required: true, message: $t('ruls.email.empty') },
            {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: this.$t(
                'backapi.self.login.reg.page.email.input.format.text'
              ),
            },
          ]"
        >
          <template #left-icon>
            <img
              class="d-img icon-img"
              src="@/assets/img/124614@2x.webp"
              alt=""
            />
          </template>
        </van-field>

        <div class="sumit-section center-center">
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
      emailFix: "",
      countdown: 0,
      loading: false,
      showText: false,
      form: {
        vercode: "",
        email: "",
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    editImportantLogout() {
      return this.$store.state.config.editImportantLogout || "";
    },
    textContent() {
      return this.$t("edit.tip.text", {
        time: this.editImportantLogout,
        name: this.$t("form.email.text"),
      });
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
      userApi.emailCodeReq({
        email: this.user.email,
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
    validateTwo(value) {
      return value === this.form.password;
    },
    openEye() {
      this.showText = !this.showText;
    },
    comfirm() {
      return new Promise((resolve) => {
        this.$dialog
          .confirm({
            message: this.textContent,
            confirmButtonText: this.$t("wallet.index.order.state.text"),
            cancelButtonText: this.$t("wallet.index.order.state.cancel.text"),
          })
          .then(() => {
            resolve(1);
          })
          .catch(() => {
            resolve(0);
          });
      });
    },
    async onSubmit() {
      const status = await this.comfirm();
      if (!status) return;
      let reqParam = {
        email: this.form.email + this.emailFix,
        code: this.form.vercode,
      };
      this.loading = true;
      const [err] = await userApi.emailBindReq(reqParam);
      this.loading = false;
      if (err) {
        const currMsgKey = err.data && err.data[0] && err.data[0].msgKey;
        if (currMsgKey) {
          this.$toast(this.$t(`backapi.${currMsgKey}`));
        }
        return;
      }
      //this.$store.commit("loginOut");
      this.$toast.success();
      this.$store.dispatch("getInfo");
      this.$router.back();
      //this.$router.replace({ name: "Login" });
    },
  },
  created() {
    this.$store.dispatch("getCodeList");
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
}
</style>
