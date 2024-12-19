<template>
  <div class="change-password-view font12 p-l-12 p-r-12">
    <AppTopBar :topBarTitle="$t('security.phone.text')"> </AppTopBar>
    <div>
      <van-form class="ntf-form m-t-16 squere-form" @submit="onSubmit">
        <p class="lable-text">{{ $t("Update.phone.org") }}</p>
        <van-field
          class="m-b-16 icon-input"
          disabled
          :value="user.phone"
          :placeholder="$t('password.setting.phone.old.phone.text')"
        >
          <template #left-icon>
            <img
              class="d-img icon-img"
              src="@/assets/img/124605@2x.webp"
              alt=""
            />
          </template>
        </van-field>
        <p class="lable-text">{{ $t("Update.phone.vaild.code") }}</p>
        <van-field
          class="field-inlude-code m-b-16 p-x-0"
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
        <p class="lable-text">{{ $t("Update.phone.new") }}</p>
        <van-field
          v-model.trim="form.phone"
          :placeholder="$t('form.phoneNum.text')"
          autocomplete="new-password"
          type="digit"
          class="left-icon-box m-b-24 align-center phone-input"
          :rules="[
            { required: true, message: $t('ruls.phone.empty') },
            {
              validator: validatePhone,
              message: errphone,
            },
          ]"
        >
          <template #left-icon>
            <p @click="leftFn" class="align-center area-code color-primary">
              <span>+{{ form.areaCode }}</span> <van-icon name="arrow-down" />
            </p>
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
      <BtmActionSheet
        :text="`+${form.areaCode}`"
        ref="BtmActionSheet"
        :actions="area_code"
        fix="+"
        @select="onSelect"
      />
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
      emailFix: "@gmail.com",
      countdown: 0,
      loading: false,
      showText: false,
      form: {
        vercode: "",
        phone: "",
        areaCode: "",
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
        name: this.$t("form.phoneNum.text"),
      });
      //this.$t('edit.tip.text', { time: this.$editImportantLogout.val, name: this.$t('form.phoneNum.text') }),
    },

    area_code() {
      return this.$store.state.config.area_code;
    },
    errphone() {
      if (this.form.areaCode == 63) {
        return this.$t("Must.11.digits");
      }
      return this.$t("vaid.phone", {
        num: this.form.phone.startsWith("0") ? 11 : 10,
      });
    },
  },
  methods: {
    validatePhone(v) {
      if (this.form.areaCode == 63) {
        return v.length === 11;
      }
      if (this.form.areaCode != 91) return true;

      if (v.startsWith("0")) {
        return v.length === 11;
      } else {
        return v.length === 10;
      }
    },
    onSelect(item) {
      this.form.areaCode = item.name;
    },
    leftFn() {
      this.$refs.BtmActionSheet.open();
    },
    clearTimer() {
      this.timer && clearInterval(this.timer);
      this.countdown = 0;
    },
    sendCode() {
      this.$toast(this.$t("form.verift.going.text"));
      // 模拟发送验证码的操作
      userApi.phoneCode();
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
      if (!this.form.areaCode) {
        this.$toast(this.$t("backapi.areaCodeIsEmpty"));
        if (!this.area_code.length) {
          this.$store.dispatch("getCodeList");
        }
        return;
      }
      let reqParam = {
        phone: this.form.areaCode + this.form.phone,
        code: this.form.vercode,
        areaCode: this.form.areaCode,
      };
      this.loading = true;
      const [err] = await userApi.phoneBindReq(reqParam);
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
    },
  },
  async created() {
    await this.$store.dispatch("getCodeList");
    this.form.areaCode = this.area_code[0];
  },
  beforeDestroy() {
    this.clearTimer();
  },
};
</script>
<style scoped lang="less">
.change-password-view {
  // ::v-deep {
  //   .chose-verification {
  //     .van-field__body {
  //       padding: 0;
  //       border: none;
  //     }
  //     .van-dropdown-menu__bar {
  //       border-radius: 10px;
  //     }
  //   }
  //   .van-field--disabled {
  //     .van-field__label {
  //       color: #646566;
  //     }
  //   }
  //   .area-code {
  //     padding-right: 8px;
  //   }
  //   .left-icon-box {
  //     position: relative;
  //     @wid: 60px;
  //     .van-field__left-icon {
  //       position: absolute;
  //       top: 54px;
  //       left: 32px;
  //       z-index: 2;
  //       width: @wid;
  //     }
  //     .van-field__control {
  //       padding-left: @wid;
  //     }
  //   }
  // }
}
</style>
