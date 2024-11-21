<template>
  <van-popup
    v-model="show"
    overlay-class="overlay-active-code"
    :close-on-click-overlay="false"
    class="linear-global-pop font14 activation-code ntf-form"
  >
    <img
      class="close d-img"
      @click="show = false"
      src="@/assets/img/ntf3/user\close.png"
      alt=""
    />
    <p class="center-center">
      <img class="d-img pic" src="@/assets/img/ntf/628@2x.webp" alt="" />
    </p>
    <p class="center-center m-t-4">{{ $t(`product.activation.code`) }}</p>
    <van-field
      v-model.trim="activeCode"
      autocomplete="new-password"
      :placeholder="$t('enter.code')"
      class="username m-b-12 m-t-12"
    />
    <van-button
      class="ntf-vant-btn m-b-20"
      block
      type="info"
      @click.native="send"
      native-type="button"
      >{{
        $t("backapi.self.security.bind.mail.input.code.comfirm.text")
      }}</van-button
    >
  </van-popup>
</template>

<script>
import userApi from "@/api/user";
export default {
  name: "ActivationCode",
  data() {
    return {
      activeCode: "",
      show: false,
    };
  },
  methods: {
    async send() {
      if (!this.activeCode) return;
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      const [err] = await userApi.postDayActive({
        activeCode: this.activeCode,
      });

      if (err) {
        return;
      }
      //this.$toast.clear();
      this.show = false;
      this.$toast.success({
        className: "toast-success-activa",
      });
    },
    async open() {
      const [err, res] = await userApi.investDayActive();
      if (err) {
        return;
      }
      if (res.data.required) {
        this.show = true;
        return;
      }
      this.show = false;
    },
  },
  created() {
    this.open();
  },
};
</script>
<style>
.overlay-active-code {
  top: 44px !important;
}
.toast-success-activa {
  color: green;
}
</style>
<style scoped lang="less">
.activation-code {
  width: 270px;
  .pic {
    width: 81px;
    height: 81px;
  }
  .close {
    width: 18px;
    height: 18px;
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
