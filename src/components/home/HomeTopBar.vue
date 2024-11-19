<template>
  <van-sticky style="z-index: 999" :offset-top="0">
    <ul class="nav justify-between align-center p-r-32">
      <li
        class="logo p-l-16 center-center"
        @click="$router.push({ name: 'home' })"
      >
        <img class="d-img" src="@/assets/img/ntf3/130105@2x.webp" alt="" />
      </li>
      <li class="align-center">
        <img
          class="my-serve m-r-16"
          @click="$store.dispatch('getServeData', 1)"
          src="@/assets/img/ntf3/129511@2x.png"
          alt=""
        />
        <div class="lef-icon align-center">
          <p @click="$router.push('/pages/wallet/onlineRecharge')">
            <img class="d-img" src="@/assets/img/ntf3/129447@2x.webp" alt="" />
          </p>
          <p class="balance p-l-8 p-r-8">{{ divide(user.balance) }}</p>
          <p class="">
            <img
              class="d-img"
              @click="$router.push({ name: 'Message' })"
              src="@/assets/img/ntf3/129496@2x.webp"
              alt=""
            />
          </p>
        </div>
      </li>
    </ul>

    <BtmActionLang ref="BtmActionLang" />
  </van-sticky>
</template>

<script>
export default {
  name: "HomeTopBar",
  props: {
    title: {
      type: String,
      default: "FOTI.VIP",
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    openLang() {
      this.$refs.BtmActionLang.open();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.my-serve {
  display: block;
  width: 40px;
  height: 40px;
}
.nav {
  height: 46px;
  background-image: linear-gradient(to right, #1f383e 0%, #131b26 100%);
  .user-info {
    line-height: 1;
    .username {
      line-height: 1;
    }
  }
  .logo {
    position: relative;
    img {
      width: 75px;
      height: 35px;
    }
  }
  .balance {
  }
  .lef-icon {
    height: 27px;
    border-radius: 13px;
    background-image: linear-gradient(
      to bottom,
      #026452,
      rgba(1, 69, 63, 0.46) 49%,
      #02735e
    );
    & > p:nth-child(1) {
      margin-left: -11px;
    }
    & > p:nth-child(3) {
      margin-right: -11px;
    }
    img {
      height: 26px;
      width: 26px;
    }
  }
  .txt {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
