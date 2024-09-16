<template>
  <div class="login-view-page font14 p-t-16">
    <div class="p-l-16 p-r-16">
      <SelectLang />
      <ul class="flex-column logo-are center-center">
        <li class="logo p--8 p-b-16">
          <img class="d-img" src="@/assets/img/ntf3/reglog.webp" alt="" />
        </li>
      </ul>
      <div class="center-center m-b-40">
        <van-form class="full100 ntf-form" @submit="onSubmit">
          <van-field
            v-model.trim="form.username"
            autocomplete="new-password"
            :placeholder="$t('form.account.text')"
            class="username m-b-32"
            :rules="[{ required: true, message: $t('ruls.accout.empty') }]"
          />
          <!-- showText -->
          <van-field
            class="password m-b-16"
            v-model.trim="form.password"
            autocomplete="new-password"
            :type="showText ? 'text' : 'password'"
            :placeholder="$t('form.password.text')"
            @click-right-icon="openEye"
            :right-icon="`color-fff icon iconfont ${
              showText ? 'icon-yanjing_xianshi_o' : 'icon-yanjing_yincang_o'
            }`"
            :rules="[
              { required: true, message: $t('backapi.passwordIsEmpty') },
            ]"
          />
          <ul class="justify-between align-center m-b-16">
            <li class="color-o6" @click="$router.push({ name: 'LoginForget' })">
              {{ $t("index.login.forget.text") }}
            </li>
            <li>
              <p
                class="login-link color-active flex-wrap"
                @click="
                  $router.push({
                    name: 'Register',
                    query: {
                      backUrl: $route.query.backUrl,
                    },
                  })
                "
              >
                {{ $t("reg.btn.text") }}
              </p>
            </li>
          </ul>
          <van-button
            class="ntf-vant-btn"
            block
            type="info"
            native-type="submit"
            >{{ $t("login.btn.text") }}</van-button
          >
        </van-form>
      </div>
    </div>

    <ul class="flex-column p-b-24 p-t-24 center-center text-center contact">
      <li class="m-b-16">
        <p @click="goServe">{{ $t("index.login.service.text") }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import userApi from "@/api/user";
export default {
  name: "LoginView",
  data() {
    return {
      src: "",
      show: false,
      form: {
        username: "",
        password: "",
        code: "", // 验证码
        verifyKey: "", // 验证码key
      },
      radio: [],
      showText: false,
      emailFix: "@gmail.com",
    };
  },
  computed: {
    isFinish() {
      return this.form.username && this.form.password && this.form.code;
    },
    curLang() {
      return this.langOptions.find((item) => item.value === this.lang) || {};
    },
    serveData() {
      return this.$store.state.serveData;
    },
    langIcon() {
      return this.curLang.icon;
    },
    lang() {
      return this.$store.state.lang;
    },
    langOptions() {
      return this.$store.state.langOpt;
    },
    area_code() {
      return this.$store.state.config.area_code.map((item) => {
        return {
          name: item,
        };
      });
    },
  },
  methods: {
    async download() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      await this.$store.dispatch("appDownload");
      this.$toast.clear();
    },
    sleep(n) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, n * 1000);
      });
    },
    async onSubmit() {
      const data = Object.assign({}, this.form);
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
      });
      const [err, res] = await userApi.login(data);

      if (err) return;
      this.$toast.clear();
      this.$store.commit("setToken", res.data.token);
      this.$store.dispatch("getServeData");
      if (res.data.withdrawalLimitMsg) {
        this.$store.commit(
          "setwithdrawalLimitMsg",
          res.data.withdrawalLimitMsg
        );
      }
      if (this.$route.query.backUrl) {
        this.$router.push(this.$route.query.backUrl);
        return;
      }
      this.$router.push("/");
    },
    change() {},
    leftFn() {
      this.show = true;
    },
    openEye() {
      this.showText = !this.showText;
    },
    select(v) {
      this.$store.commit("setLang", v);
    },
    async verifyCodeReq() {
      // this.form.code = "";
      // const [err, res] = await userApi.verifyCodeReq();
      // console.log("res", err);
      // if (err) {
      //   if (+err.code == 409) {
      //     this.$toast(this.$t("backapi.self.alert.fast.access.tip.text"));
      //   }
      //   return;
      // }
      // this.src = res.data.img;
      // this.form.verifyKey = res.data.verifyKey;
    },
    goServe() {
      this.$store.dispatch("getServeData", 1);
    },
  },
  async created() {
    this.verifyCodeReq();
    this.$store.commit("setPdTop", false);
  },
};
</script>
<style lang="less" scoped>
.custom-option {
  img {
    width: 24px;
    height: 24px;
    border-radius: 14px;
  }
}
.selectd-icon {
  width: 24px;
  height: 24px;
  border-radius: 14px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.login-view-page {
  min-height: 100vh;
  background: #131313 url("@/assets/img/ntf3/regbg.webp") no-repeat center top;
  background-size: 100% auto;
  .lang {
    justify-content: flex-end;
    ::v-deep {
      .el-select {
        width: 78px;
      }
      .el-input {
        .el-input__suffix {
          display: none;
        }
        display: flex;
        align-items: center;
        height: 36px;
        position: relative;
        border-radius: 20px;
        border: solid 1px rgba(55, 251, 124, 0.17);
        background-image: linear-gradient(to bottom, #242a3b, #273b40);
      }
      .el-input__inner {
        padding-left: 32px;
        padding-right: 20px;
        text-align: right;
      }
      .el-select-dropdown__item {
        padding: 0 4px;
      }
    }
    .lang-pic {
      img {
        width: 24px;
        height: 24px;
        display: block;
      }
    }
  }

  .logo-are {
    font-size: 20px;
    padding-bottom: 48px;
    .logo {
      img {
        width: 180px;
        height: 180px;
        display: block;
      }
    }
  }
  .limt-form-with {
    width: 264px;
  }
}
</style>
