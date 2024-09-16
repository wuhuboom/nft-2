<!-- eslint-disable no-unused-vars -->
<template>
  <div class="invite-friends font14 color-primary">
    <AppTopBar
      :styleObj="{ backgroundColor: 'transparent' }"
      :topBarTitle="$t(`me.my.qr.code.text`)"
    >
    </AppTopBar>
    <div>
      <div class="cont">
        <p class="center-center gray long-text">{{ $t(`ercode.Long.QR`) }}</p>
        <div class="center-center">
          <QrcodeVue :value="link" :size="146" />
        </div>
        <div
          class="hrefs center-center m-b-12 m-t-32 copy-button"
          @click="copy(invitationCode)"
        >
          {{ $t(`ercode.referral.code`) }}:
          {{ invitationCode }}
        </div>
        <div class="hrefs center-center copy-button m-b-20" @click="copy(link)">
          <span class="href-link flex-1 app-ellipsis">{{ link }}</span
          ><i class="iconfont icon-copy color-active"></i>
        </div>
        <ul class="justify-between">
          <li>
            <p
              class="btn ntf-vant-btn copy-button"
              @click="copy(invitationCode)"
            >
              {{ $t("invite.code.copy.text") }}
            </p>
          </li>
          <li>
            <p class="btn ntf-vant-btn copy-button" @click="copy(link)">
              {{ $t("invite.link.copy.text") }}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <van-dialog
      class="promotion-upload-dialog linear-global-pop"
      :showConfirmButton="false"
      v-model="showDialog"
      :close-on-click-overlay="true"
    >
      <ul class="promotion-cont font14">
        <li></li>
        <li class="center-center tip color-active font16 p-t-24 p-b-24">
          {{ $t(`WARNING`) }}!
        </li>
        <li class="center-center">
          <img src="@/assets/img/red/share1.png" alt="" />
        </li>
        <li class="center-center tip colorfff p-t-24">
          {{ $t(`WARNING.desc`) }}
        </li>
      </ul>
      <div class="center-center p-b-24 p-t-24">
        <van-button
          class="ntf-vant-btn"
          block
          type="info"
          @click="showDialog = false"
          >{{ $t("modal.confirm.text") }}</van-button
        >
      </div>
    </van-dialog>
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
  mounted() {
    document.querySelector("body").classList.add("gray-bg-img");
  },
  destroyed() {
    document.querySelector("body").classList.remove("gray-bg-img");
  },
};
</script>
<style scoped lang="less">
.invite-friends {
  text-align: center;
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
    .promotion-cont {
      & > li:nth-child(1) {
        margin-bottom: 10px;
        img {
          height: 48px;
          width: 48px;
          object-fit: cover;
          display: block;
        }
      }
      & > li {
        margin-bottom: 12px;
      }
      & > li:nth-child(1) {
        img {
          height: 48px;
          width: 48px;
          object-fit: cover;
          display: block;
        }
      }
      & > li:nth-child(3) {
        img {
          height: 40px;
          object-fit: cover;
          display: block;
        }
      }
    }
  }
}
</style>
