<template>
  <div class="invoice-page font12 p-l-12 p-r-12">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t(`Settings`)"
      :styleObj="{ backgroundColor: 'transparent' }"
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
          <p class="">{{ item.title }}</p>
        </div>
        <van-icon size="16" name="arrow" />
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
          title: i18n.t("user.help.center.contact.us.text"),
          icon: require("@/assets/img/ntf/scr2.png"),
          link: "service",
        },
        {
          title: i18n.t("login.down.text"),
          icon: require("@/assets/img/ntf/scr3.png"),
          link: "down",
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },

    phone() {
      return `(${this.user.areaCode}) ${this.phoneNumber(this.user.phone)}`;
    },
  },
  methods: {
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
