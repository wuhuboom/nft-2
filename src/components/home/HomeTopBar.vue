<template>
  <div>
    <van-sticky @change="change" style="z-index: 999" :offset-top="0">
      <ul
        class="nav justify-between align-center"
        :class="{ 'bg-black': fiexd, 'index-sticky-nav': addClass }"
      >
        <li class="logo center-center" @click="$router.push({ name: 'home' })">
          <img class="d-img" src="@/assets/img/ntf/home/logo.png" alt="" />
        </li>
        <li class="flex-1 text-center txt">
          <slot name="title">
            <div>
              <ul class="text-center center-center user-info">
                <li
                  class="username blod"
                  :class="{ 'm-t-4': !$store.state.shoeName }"
                >
                  {{ $store.state.shoeName ? user.username : "*****" }}
                </li>
                <li class="vipLevel m-t-4" v-if="user.vipLevel">
                  LV.{{ user.vipLevel }}
                </li>
                <li>
                  <i
                    @click="
                      $store.commit('setShowName', !$store.state.shoeName)
                    "
                    class="font-16 m-l-8 iconfont color-active"
                    :class="[
                      $store.state.shoeName
                        ? 'icon-yanjing_xianshi_o'
                        : 'icon-yanjing_yincang_o',
                    ]"
                  ></i>
                </li>
              </ul>
            </div>
          </slot>
        </li>
        <li class="align-center lef-icon">
          <slot name="right">
            <p class="m-r-16" @click="openLang" v-if="showLang">
              <img class="d-img" src="@/assets/img/ntf/home/nav1.png" alt="" />
            </p>
            <p class="m-r-16">
              <img
                class="d-img"
                @click="$router.push({ name: 'Message' })"
                src="@/assets/img/ntf/home/nav2.png"
                alt=""
              />
            </p>
          </slot>
        </li>
      </ul>
      <BtmActionLang ref="BtmActionLang" />
    </van-sticky>
  </div>
</template>

<script>
export default {
  name: "HomeTopBar",
  data() {
    return {
      base: { switch: null },
      fiexd: false,
    };
  },
  props: {
    showLang: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "FOTI.VIP",
    },
  },
  methods: {
    change(status) {
      this.fiexd = status;
    },
    openLang() {
      this.$refs.BtmActionLang.open();
    },
  },
  computed: {
    addClass() {
      //console.log(this.$route.name);
      return ["home", "investMarket", "User"].includes(this.$route.name);
    },
    isHome() {
      return this.$route.name === "home";
    },
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.index-sticky-nav {
  background: url("@/assets/img/130937.webp") no-repeat center bottom;
  background-size: 100% auto;
}
.nav {
  height: 46px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .user-info {
    line-height: 1;
    .username {
      line-height: 1;
    }
  }
  .logo {
    width: 77px;
    position: relative;
    img {
      width: 34px;
      height: 34px;
    }
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      height: 18px;
      transform: translateY(-50%);
      right: 0;
      border: 1px solid transparent;
      border-image: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0),
          #888 52%,
          rgba(128, 128, 128, 0)
        )
        1;
    }
  }
  .lef-icon {
    img {
      height: 32px;
      width: 32px;
    }
  }
  .txt {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
