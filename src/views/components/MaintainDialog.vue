<template>
  <div class="main-tain-dialog">
    <van-dialog
      class="tain-upload-dialog"
      :showConfirmButton="false"
      v-model="showDialog"
      :close-on-click-overlay="false"
    >
      <ul class="upload-cont flex-column center-center">
        <li class="tip align-center p-l-12">
          <!-- {{ $t(`UserProfile.Notification`) }} -->
        </li>
        <li class="cont center-center p-l-20 p-r-20 p-b-20">
          {{ msg }}
        </li>
      </ul>
    </van-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import userApi from "@/api/user";
export default {
  name: "MaintainDialog",
  data() {
    return {
      showDialog: true,
      loading: false,
      form: {
        payPwd: "",
        payPwdAgain: "",
      },
      showText: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    show() {
      return this.$store.state.showMain.show;
    },
    msg() {
      return this.$store.state.showMain.msg;
    },
  },
  watch: {
    showDialog(val) {
      this.$store.commit("setMainShow", { show: val });
    },
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "setMainShow") {
        this.showDialog = state.showMain.show;
      }
    });
    this.trimr = setInterval(async () => {
      const [err] = await userApi.authSysconfig();
      if (!err && this.showDialog) {
        location.reload();
      }
    }, 1000 * 5);
  },
  beforeDestroy() {
    clearInterval(this.trimr);
  },
};
</script>
<style lang="less">
.main-tain-dialog {
  .tain-upload-dialog {
    background-color: transparent;
    width: 277px;
    .tip {
      background: url("@/assets/img/ntf/126962@2x.png") no-repeat center center;
      background-size: 100% 100%;
      width: 260px;
      height: 120px;
      font-size: 20px;
      color: #f7dcbe;
      padding-top: 30px;
      position: relative;
    }
    .cont {
      //text-align: center;
      margin-top: -64px;
      padding-top: 72px;
      width: 260px;
      background: linear-gradient(180deg, #1f2430 0%, #151515 100%);
      border-radius: 14px 14px 14px 14px;
      border: 1px solid rgba(0, 0, 0, 0);
    }
  }
}
</style>
