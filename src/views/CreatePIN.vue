<template>
  <div class="fr-page font12 color-primary">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t('Create.your.PIN')"
    ></AppTopBar>
    <p class="center-center m-t-32 pic">
      <img class="d-img" src="@/assets/img/ntf3/form/130104@2x.webp" alt="" />
    </p>
    <div v-if="finished" class="m-t-24 text-center">
      <ul class="p-l-16 p-r-16 finished-txt">
        <li>{{ $t("Your.PIN.set!") }}</li>
        <li>{{ $t("Your.PIN.already") }}</li>
      </ul>
    </div>
    <div v-else>
      <p class="p-l-16 m-t-32 p-r-16 center-center pin-text">
        {{ $t("Set.PIN6") }}
      </p>
      <div>
        <VerificationCode ref="VerificationCode" />
      </div>
    </div>

    <div class="ntf-form button-box p-l-16 p-r-16">
      <van-button
        class="ntf-vant-btn linear-btn"
        block
        type="info"
        native-type="button"
        @click="comfire"
        >{{ $t("btn.continue.text") }}</van-button
      >
    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";
import VerificationCode from "@/components/home/VerificationCode.vue";
export default {
  name: "FriendsList",
  components: {
    VerificationCode,
  },
  data() {
    return {
      finished: false,
    };
  },
  methods: {
    comfire() {
      if (this.finished) {
        this.$router.replace("/");
        return;
      }
      if (!this.$refs.VerificationCode.finish) {
        this.$toast(this.$t("Set.PIN6"));
        return;
      }
      this.onSubmit();
    },
    async onSubmit() {
      const text = this.$refs.VerificationCode.value;
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      const [err] = await userApi.setPwdPay({
        payPwd: text,
        payPwdAgain: text,
      });

      if (err) {
        return;
      }
      this.$toast(this.$t("backapi.setPaySuccess"));
      this.$store.commit("changepaySet", 1);
      this.finished = true;
    },
  },
};
</script>
<style scoped lang="less">
.pic {
  img {
    width: 149px;
    height: 149px;
  }
}
.button-box {
  padding-top: 148px;
  //首字母大写
  text-transform: capitalize;
}
.pin-text {
  font-size: 15px;

  color: #caffde;
}
.finished-txt {
  font-size: 15px;
  & > li:first-child {
    font-size: 22px;
    font-weight: bold;
  }
  & > li:last-child {
    padding-top: 24px;
  }
}
</style>
