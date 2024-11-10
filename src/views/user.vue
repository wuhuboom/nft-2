<template>
  <div class="p-b-32">
    <div class="page-user font12 p-l-16 p-r-16">
      <ul class="justify-between uesr-head align-center p-t-16 p-b-20">
        <li class="align-center">
          <p class="icon-user m-r-8">
            <img
              class="d-img"
              src="@/assets/img/ntf3/user/126928@2x.png"
              alt=""
            />
          </p>
          <p class="flex-column good-desc">
            <span>{{ $t(`Good.Day`) }}</span>
            <span class="font16 bold">
              {{ user.username }}
            </span>
          </p>
        </li>
        <li>
          <SelectLang />
        </li>
      </ul>
      <ul class="user-balance">
        <li class="center-center m-b-4">
          {{ $t(`home.index.account.balance.text`) }}
        </li>
        <li class="center-center">
          {{ divide(user.balance) }}
        </li>
        <li class="wi-re center-center m-t-20 m-b-24">
          <p
            class="m-r-8 center-center ntf-vant-btn"
            @click="$router.push({ path: '/pages/wallet/onlineRecharge' })"
          >
            <img
              class="d-img m-r-12"
              src="@/assets/img/ntf3/user/130043@2x.png"
              alt=""
            />
            {{ $t("deal.recharge.354498-0") }}
          </p>
          <p
            class="center-center ntf-vant-btn"
            @click="$router.push({ path: '/pages/wallet/withdraw' })"
          >
            <img
              class="d-img m-r-12"
              src="@/assets/img/ntf3/user/157461@2x.png"
              alt=""
            />
            {{ $t(`dropdown.billing.income.withdraw.text`) }}
          </p>
        </li>
      </ul>
      <ul class="navs justify-between m-t-16">
        <li
          v-for="(item, idx) in navs"
          :key="idx"
          @click="gopage(item)"
          class="center-center flex-column text-center"
        >
          <img class="d-img" :src="item.img" alt="" />
          <p class="m-t-8">{{ item.text }}</p>
        </li>
      </ul>

      <p class="font14 bold m-t-24 m-b-16">{{ $t(`Data.Center`) }}</p>
      <ul
        v-if="config.beyShow == 1"
        class="center-list p-x-8 align-center m-b-12"
        @click="$router.push('/pages/user/investDetail')"
      >
        <li class="m-r-12">
          <img
            class="d-img"
            :src="require('@/assets/img/ntf3/user/129984@2x.png')"
            alt=""
          />
        </li>
        <li>
          <p class="title font14 m-b-4">{{ $t(`Yu'ebao`) }}</p>
          <p class="desc">{{ $t(`Demat.Account`) }}</p>
        </li>
      </ul>
      <ul
        class="center-list justify-between p-x-8 align-center m-b-12"
        @click="$router.push('/pages/function/rebate_center')"
      >
        <li class="m-r-12">
          <img
            class="d-img"
            :src="require('@/assets/img/ntf3/user/131068@2x.webp')"
            alt=""
          />
        </li>
        <li class="flex-1">
          <p class="title font14 m-b-4">{{ $t(`fuc.rebate.center`) }}</p>
          <p class="desc">
            {{ $t(`backapi.self.rebate.top.content.today.text`) }}
          </p>
        </li>
        <li>{{ divide(todayNum) }}</li>
      </ul>
      <ul
        class="center-list justify-between p-x-8 align-center m-b-12"
        @click="$router.push('/pages/user/income')"
      >
        <li class="m-r-12">
          <img
            class="d-img"
            :src="require('@/assets/img/ntf3/user/131062@2x.webp')"
            alt=""
          />
        </li>
        <li class="flex-1">
          <p class="title font14 m-b-4">
            {{ $t(`myfriends.rank.team.title`) }}
          </p>
          <p class="desc">{{ $t(`agency.center.teambalance.text`) }}</p>
        </li>
        <li>{{ divide(friendsBalance) }}</li>
      </ul>

      <p class="font14 bold m-t-24 m-b-16">{{ $t(`Agent.Contact`) }}</p>
      <ul class="font14">
        <li
          class="justify-between center-list p-x-8 align-center m-b-12"
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

      <p class="login-out p-l-4 center-center" @click="show = true">
        <img
          class="d-img m-r-4"
          src="@/assets/img/ntf3/user/124545@2x.png"
          alt=""
        />
        {{ $t(`user.menu.title7.text`) }}
      </p>
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
            <van-button
              class="ntf-vant-btn"
              block
              type="info"
              @click="loginOut"
            >
              {{ $t("modal.confirm.text") }}
            </van-button>
          </li>
        </ul>
      </van-popup>
      <img
        class="my-serve"
        @click="$store.dispatch('getServeData', 1)"
        src="@/assets/img/ntf3/129511@2x.webp"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";
export default {
  name: "pageUser",
  data() {
    return {
      contact: [
        {
          title: "Telegram:",
          icon: require("@/assets/img/ntf3/form/131059@2x.webp"),
          link: "https://t.me/",
        },
        {
          title: "WhatsApp:",
          icon: require("@/assets/img/ntf3/form/131060@2x.webp"),
          link: "https://wa.me/",
        },
      ],
      changs: [],
      todayNum: 0,
      friendsBalance: 0,
      show: false,
    };
  },
  computed: {
    safeConfig() {
      return this.$store.state.safeConfig;
    },
    config() {
      return this.$store.state.config;
    },
    user() {
      return this.$store.state.user;
    },
    navs() {
      const arr = [
        {
          text: this.$t(`user.menu.title1.text`),
          path: "/pages/securityCenter/index",
          img: require("@/assets/img/ntf3/user/130026@2x.png"),
        },
        {
          text: this.$t("user.trade.title4.text"),
          img: require("@/assets/img/ntf3/user/130027@2x.png"),
          path: "/pages/user/invoice",
        },
        {
          img: require("@/assets/img/ntf3/user/130030@2x.png"),
          text: this.$t(`me.my.qr.code.text`),
          path: "/pages/me/share",
        },
        {
          img: require("@/assets/img/ntf3/user/130029@2x.png"),
          text: this.$t(`user.menu.title6.text`),
          path: "down",
        },
      ];
      //this.safeConfig.showH5 === 1
      if (this.safeConfig.showH5 === 1) {
        arr.unshift({
          img: require("@/assets/img/ntf3/user/130028@2x.png"),
          text: this.$t("fuc.safe.text"),
          path: "/pages/wallet/index",
        });
      }
      return arr;
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
    async investMyStatisFriends() {
      const [err, res] = await userApi.investMyStatisFriends2();
      if (err) {
        return;
      }
      this.friendsBalance = res.data.friendsBalance;
    },
    async getStatissticsData() {
      const [err, resR] = await userApi.rebateStatisReq();
      if (err) return;
      this.todayNum = resR.data.today;
    },
    gopage(v) {
      if (v.path == "down") {
        this.download();
        return;
      }
      this.$router.push(v.path);
    },
    async download() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      await this.$store.dispatch("appDownload");
      this.$toast.clear();
    },
    loginOut() {
      this.show = false;
      this.$store.commit("loginOut");
      this.$router.replace({ name: "Login" });
    },
  },
  created() {
    this.$store.dispatch("setSafeConfig");
    this.$store.commit("setPdTop", false);
    this.getStatissticsData();
    this.$store.dispatch("getInfo");
  },
  mounted() {
    document.querySelector("body").classList.add("gray-user-img");
  },
  destroyed() {
    document.querySelector("body").classList.remove("gray-user-img");
  },
};
</script>
<style scoped lang="less">
.my-serve {
  display: block;
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 120px;
  right: 12px;
}
.gray {
  color: #79869b;
}
.green {
  color: #00d91f;
}
.my-qr {
  background: url("@/assets/img/ntf/myqr.webp") no-repeat center center;
  background-size: 100% 100%;
  height: 70px;
  & > li:nth-child(1) {
    color: #faa822;
  }
}
.user-set {
  position: relative;
  .userpic {
    width: 58px;
    height: 58px;
  }
  .edt {
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: 22px;
    height: 22px;
    border-radius: 11px;
    background-image: linear-gradient(to bottom, #1f2430, #21232e);
  }
}
.navs {
  align-items: baseline;

  & > li {
    background: no-repeat center center;
    background-size: 100% 100%;
    width: 56px;
    img {
      height: 26px;
      width: 26px;
    }
  }
}
.trade-list {
  .name {
    width: 135px;
    img {
      height: 24px;
      width: 24px;
      margin-right: 8px;
    }
  }
  .earnings {
    width: 88px;
    margin-left: 39px;
  }
  & > li:nth-child(2),
  & > li:nth-child(3) {
    text-align: right;
  }
  .trade {
  }
}
.uesr-head {
  .icon-user {
    height: 44px;
    width: 44px;
  }
  .good-desc {
    & > span:nth-child(1) {
      color: rgba(255, 255, 255, 0.4);
    }
  }
}
.user-balance {
  & > li:nth-child(1) {
    font-size: 16px;
    color: #8e8e8e;
  }
  & > li:nth-child(2) {
    font-size: 28px;
  }
}
.wi-re {
  & > p {
    min-width: 139px;
    height: 39px;
    padding: 0 4px;
  }
  img {
    height: 20px;
    width: 20px;
  }
}
.center-list {
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.04);
  img {
    height: 43px;
    width: 43px;
  }
  .desc {
    color: #9c9c9c;
  }
}
.login-out {
  width: 113px;
  height: 31px;
  line-height: 31px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.09);
  margin: 20px auto 0;
  img {
    height: 18px;
    width: 18px;
  }
}
.copy {
  min-width: 53px;
  height: 24px;
  padding: 3px 12px 6px;
  border-radius: 9px;
  border: solid 1px #a29f9f;
}
</style>
