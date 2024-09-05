<template>
  <div class="home-top-bar">
    <ul class="nav justify-between align-center max-width750">
      <li class="logo center-center" @click="$router.push({ name: 'home' })">
        <img class="d-img" src="@/assets/img/ntf/home/logo.png" alt="" />
      </li>
      <li class="flex-1 text-center txt">{{ title }}</li>
      <li class="align-center lef-icon">
        <p class="m-r-16" @click="openLang">
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
      </li>
    </ul>
    <BtmActionLang ref="BtmActionLang" />
  </div>
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
  methods: {
    openLang() {
      this.$refs.BtmActionLang.open();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.home-top-bar {
  &,
  .nav {
    height: 46px;
  }
}
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 998;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: transparent;
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
