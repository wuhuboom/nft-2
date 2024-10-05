<!-- eslint-disable no-unused-vars -->
<template>
  <div class="invite-friends font14 color-primary">
    <AppTopBar :topBarTitle="$t(`me.my.qr.code.text`)"> </AppTopBar>
    <div class="page-cont p-t-12" style="width: 351px">
      <div>
        <div class="qr-bg" style="height: 451px">
          <div style="padding-top: 81px">
            <QrcodeVue :value="link" :size="176" />
            <ul style="margin-top: 39px">
              <li class="blod">{{ $t(`ercode.referral.code`) }}:</li>
              <li
                class="blod"
                style="font-size: 20px; margin-bottom: 15px; margin-top: 10px"
              >
                {{ invitationCode }}
              </li>
              <li>
                <img
                  @click="copy(invitationCode)"
                  class="d-img copy-button"
                  style="width: 129px; height: 41px; margin: 0 auto"
                  src="@/assets/img/ntf3/130056@2x.webp"
                  alt=""
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="p-l-12 p-r-12">
      <ul>
        <li class="blod p-t-24 p-b-16">{{ $t("Share.Link") }}</li>
        <li class="txt els p-l-8 p-r-8">{{ link }}</li>
        <li class="m-t-20">
          <img
            class="d-img copy-button"
            @click="copy(link)"
            style="width: 129px; height: 41px; margin: 0 auto"
            src="@/assets/img/ntf3/130057@2x.webp"
            alt=""
          />
        </li>
      </ul>
      <ul class="promotion-cont font14">
        <li class="tip font16 blod p-t-24 p-b-12">
          {{ $t(`Promotion.Internet.rules`) }}!
        </li>
        <li class="tip colorfff p-b-16">
          {{ $t(`WARNING.desc`) }}
        </li>
      </ul>
      <li class="center-center p-b-32">
        <img
          class="d-img"
          style="max-width: 100%"
          src="@/assets/img/red/share1.png"
          alt=""
        />
      </li>
    </div>
  </div>
</template>

<script>
import ClipboardJS from "clipboard";
import QrcodeVue from "qrcode.vue";
export default {
  name: "AebateView",
  components: {
    QrcodeVue,
  },
  data() {
    return {
      showDialog: false,
    };
  },
  computed: {
    invitationCode() {
      return this.$store.state.user.invitationCode;
    },
    link() {
      return `${window.location.protocol}//${window.location.host}/#/login/register?code=${this.invitationCode}`;
    },
  },
  methods: {
    copy(t) {
      const clipboard = new ClipboardJS(".copy-button", {
        text: () => t,
      });
      clipboard.on("success", () => {
        this.$toast(this.$t(`copy.success.text`));
        // if (+window.shareDialogConfig === 1) {

        // }
        this.showDialog = true;
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        this.$toast("error");
        clipboard.destroy();
      });
    },
  },
};
</script>
<style scoped lang="less">
.invite-friends {
  text-align: center;
  background-color: #0a101b;
  min-height: 100vh;
  .page-cont {
    margin: 0 auto;
  }
  .qr-bg {
    background: url("@/assets/img/ntf3/130110@2x.webp") no-repeat center center;
    background-size: 100% 100%;
  }
  .gray {
    color: #8a929a;
  }
  .btn {
    padding: 0 4px;
    width: 159.5px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    border-radius: 12px;
  }
  .cont {
    padding: 24px 12px 45px;
  }
  .long-text {
    padding: 0 30px 20px;
  }
  .referral {
    padding: 20px 0 12px;
  }
  .your-code {
    width: 219px;
    height: 55px;
    border-radius: 16px;
    font-size: 20px;
    font-weight: bold;
    margin: 0 auto;
    color: var(--active);
  }
  .icon-copy {
    margin-left: 8px;
  }
  .referral-link {
    padding: 15px 0 13px;
  }
  .hrefs {
    height: 48px;
    border-radius: 16px;
    padding: 0 16px;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--color-fff);
  }
  .href-link {
    font-size: 16px;
  }
  .promotion-upload-dialog {
    background-size: 100% 100%;
    color: #474747;
    padding: 10px 20px 20px;
    ::v-deep {
      .van-dialog__content {
        //padding: 0;
      }
    }
  }
}
.txt {
  height: 39px;
  line-height: 39px;
  border-radius: 7px;
  border: solid 1px #37ff7e;
}
.promotion-cont {
  text-align: left;
}
</style>
