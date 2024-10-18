<template>
  <div class="invoice-page font12 p-l-12 p-r-12">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t(`Settings`)"
    ></AppTopBar>
    <ul class="flex-column center-center">
      <li class="m-t-20">
        <img class="d-img userpic" src="@/assets/img/ntf/userpic.webp" alt="" />
      </li>
      <li class="user-name m-t-16">{{ user.username }}</li>
      <li class="gray font14 m-b-12">{{ phone }}</li>
      <li class="m-t-12 m-b-8" @click="openOut">
        <img class="out-icon d-img" src="@/assets/img/logout.webp" alt="" />
      </li>
      <li class="gray" @click="openOut">{{ $t(`user.menu.title7.text`) }}</li>
    </ul>
    <ul class="m-t-16 font14">
      <li
        @click="goTo(item)"
        class="justify-between nav-item m-b-12 align-center p-l-16 p-r-16"
        v-for="(item, idx) in navs"
        :key="idx"
      >
        <div class="align-center">
          <img class="d-flex m-r-12" :src="item.icon" alt="" />
          <p class="">{{ countTitle(item.title) }}</p>
        </div>
        <van-icon
          size="16"
          name="arrow"
          v-if="['/pages/securityCenter/index', 'service'].includes(item.link)"
        />
      </li>
    </ul>
    <p class="font14 blod p-t-8 p-b-12">{{ $t(`Agent.Contact`) }}</p>
    <ul class="font14">
      <li
        class="justify-between nav-item m-b-12 align-center p-l-16 p-r-16"
        v-for="(item, idx) in contact"
        :key="idx"
      >
        <div class="align-center">
          <img class="d-flex m-r-12" :src="item.icon" alt="" />
          <p class="">{{ countTitle(item.title) }}</p>
        </div>
        <p
          v-if="showContact(item)"
          v-clipboard:copy="onCopy(item)"
          v-clipboard:success="onSuccess"
          v-clipboard:error="onError"
          class="copy center-center p-l-4 p-r-4 font12"
        >
          {{ $t("Agent.Contact.copy") }}
        </p>
      </li>
    </ul>
    <van-popup
      class="linear-global-pop"
      style="width: 75%"
      v-model="show"
      round
      position="center"
    >
      <ul>
        <li class="font16 text-center m-t-24 m-b-24">{{ $t(`now.exit`) }}</li>
        <li class="align-center justify-around">
          <van-button
            @click="show = false"
            class="ntf-vant-btn ntf-btn-cancel m-r-24"
            block
            type="info"
          >
            {{ $t("modal.cancel.text") }}
          </van-button>
          <van-button class="ntf-vant-btn" block type="info" @click="loginOut">
            {{ $t("modal.confirm.text") }}
          </van-button>
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import i18n from "@/locale";
export default {
  name: "balanceRecordView",
  data() {
    return {
      show: false,
      navs: [
        {
          title: i18n.t("user.menu.title1.text"),
          icon: require("@/assets/img/ntf/sc1.png"),
          link: "/pages/securityCenter/index",
        },
        {
          title: i18n.t("backapi.self.home.tool.online.ser.text"),
          icon: require("@/assets/img/ntf/scr2.png"),
          link: "service",
        },
        {
          title: i18n.t("login.down.text"),
          icon: require("@/assets/img/ntf/scr3.png"),
          link: "down",
        },
      ],
      contact: [
        {
          title: "Telegram:",
          icon: require("@/assets/img/ntf/131040@2x.webp"),
          link: "https://t.me/",
        },
        {
          title: "WhatsApp:",
          icon: require("@/assets/img/ntf/131039@2x.webp"),
          link: "https://wa.me/",
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
      // return {
      //   username: "test",
      //   areaCode: "86",
      //   phone: "1234567890",
      //   telegram: "telegram",
      //   wahtsapp: "wahtsapp",
      // };
    },

    phone() {
      return `(${this.user.areaCode}) ${this.phoneNumber(this.user.phone)}`;
    },
  },
  methods: {
    onCopy(item) {
      if (item.title === "Telegram:") {
        return this.user.telegram;
      } else if (item.title === "WhatsApp:") {
        return this.user.wahtsapp;
      }
      return "";
    },
    onSuccess() {
      this.$toast(this.$t("copy.success.text"));
    },
    onError() {
      this.$toast.fail();
    },
    showContact(v) {
      if (v.title === "Telegram:" && this.user.telegram) {
        return true;
      } else if (v.title === "WhatsApp:" && this.user.wahtsapp) {
        return true;
      }
      return false;
    },
    countTitle(v) {
      if (v === "Telegram:") {
        return `${v} ${this.user.telegram || "******"}`;
      } else if (v === "WhatsApp:") {
        return `${v} ${this.user.wahtsapp || "******"}`;
      }
      return v;
    },
    loginOut() {
      this.show = false;
      this.$store.commit("loginOut");
      this.$router.replace({ name: "Login" });
    },
    openOut() {
      this.show = true;
    },
    async download() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      await this.$store.dispatch("appDownload");
      this.$toast.clear();
    },
    goTo(item) {
      if (["Telegram:", "WhatsApp:"].includes(item.title)) {
        if (this.user.telegram) {
          //window.open(item.link + this.user.telegram);
          location.href = item.link + this.user.telegram;
        } else if (this.user.wahtsapp) {
          // window.open(item.link + this.user.wahtsapp);
          location.href = item.link + this.user.wahtsapp;
        }
        return;
      }
      const link = item.link;
      if (link) {
        if (link === "service") {
          this.$store.dispatch("getServeData", 1);
          return;
        }
        if (link === "down") {
          this.download();
          return;
        }
        if (link === "out") {
          this.show = true;
          return;
        }
        this.$router.push({ path: item.link });
      }
    },
    phoneNumber(p) {
      if (!p) return "";
      return p.replace(/^(\d{1,})(\d{3})$/, (match, p1, p2) => {
        return "*".repeat(p1.length) + p2;
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
.invoice-page {
  .copy {
    width: 53px;
    height: 24px;
    border-radius: 9px;
    border: solid 1px #707070;
    line-height: 1;
  }
  .nav-item {
    height: 68px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    img {
      width: 44px;
      height: 44px;
    }
  }
  .user-name {
    font-size: 24px;
  }
  .gray {
    color: #6a6f87;
  }
  .userpic {
    width: 84px;
    height: 84px;
  }
  .out-icon {
    width: 31px;
    height: 31px;
  }
}
</style>
