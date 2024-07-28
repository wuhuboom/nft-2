<template>
  <div class="login-view-page font14">
    <div class="p-l-16 p-r-16">
      <div class="lang align-center">
        <p class="lang-pic m-r-8">
          <img src="@/assets/img/ntf/ae.webp" alt="" />
        </p>
        <el-select
          :value="$store.state.lang"
          @change="select"
          :placeholder="$t('index.editor.psd.text')"
        >
          <el-option
            v-for="item in langOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <ul class="flex-column logo-are center-center">
        <li class="logo p--8 p-b-16">
          <img src="@/assets/img/ntf/login.webp" alt="" />
        </li>
        <li>{{ $t(`index.index.login`) }}</li>
      </ul>
      <div class="center-center m-b-40">
        <van-form class="limt-form-with ntf-form" @submit="onSubmit">
          <van-field
            v-model.trim="form.username"
            autocomplete="new-password"
            :placeholder="$t('form.account.text')"
            class="username m-b-32"
            :rules="[{ required: true, message: $t('ruls.accout.empty') }]"
          />
          <!-- showText -->
          <van-field
            class="password m-b-32"
            v-model.trim="form.password"
            autocomplete="new-password"
            :type="showText ? 'text' : 'password'"
            :placeholder="$t('form.password.text')"
            @click-right-icon="openEye"
            :right-icon="`color-fff icon iconfont color-active ${
              showText ? 'icon-yanjing_xianshi_o' : 'icon-yanjing_yincang_o'
            }`"
            :rules="[
              { required: true, message: $t('backapi.passwordIsEmpty') },
            ]"
          />
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
      <li
        class="m-b-16 color-active"
        @click="$router.push({ name: 'LoginForget' })"
      >
        {{ $t("index.login.forget.text") }}
      </li>
      <li class="full100 center-center text-center flex-wrap">
        <p class="tips m-r-8">{{ $t("index.login.no.accout.text") }}</p>
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
      this.form.code = "";
      const [err, res] = await userApi.verifyCodeReq();
      console.log("res", err);
      if (err) {
        if (+err.code == 409) {
          this.$toast(this.$t("backapi.self.alert.fast.access.tip.text"));
        }

        return;
      }
      this.src = res.data.img;
      this.form.verifyKey = res.data.verifyKey;
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
.login-view-page {
  min-height: 100vh;
  background-color: #131313;
  padding-top: 60px;
  .lang {
    justify-content: flex-end;
    ::v-deep {
      .el-select {
        width: 46px;
      }
    }
    .lang-pic {
      img {
        width: 32px;
        height: 32px;
        display: block;
      }
    }
  }
  .logo-are {
    font-size: 20px;
    padding-bottom: 48px;
    .logo {
      img {
        width: 181px;
        height: 181px;
        display: block;
      }
    }
  }
  .limt-form-with {
    width: 264px;
  }
  .contact {
    background: url("@/assets/img/ntf/login-btm-bg.webp");
    background-size: cover;
  }
}
</style>
