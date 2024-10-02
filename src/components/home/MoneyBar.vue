<template>
  <ul class="p-l-16 money-bar p-r-16 center-center els p-t-12 p-b-12">
    <li class="live">
      <img src="@/assets/img/ntf/home/homeligth.png" alt="" />
    </li>
    <li class="m-r-8 m-l-8 center-center flex-1 money-list">
      <div class="p-x-4">
        <p class="els">{{ $t(`user.money.available`) }}</p>
        <p class="m-t-4 els">{{ divide(user.balance) }}</p>
      </div>
      <div class="p-x-4">
        <p class="els">{{ $t(`user.money.purchased`) }}</p>
        <p class="m-t-4 els">{{ divide(user.frozenBet) }}</p>
      </div>
    </li>
    <li class="serve" @click="$store.dispatch('getServeData', 1)">
      <img class="d-img" src="@/assets/img/ntf/home/serve.png" alt="" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "MoneyBar",
  data() {
    return {};
  },
  props: {},
  computed: {
    isHome() {
      return this.$route.name === "home";
    },
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    //更新用户信息
    this.$store.dispatch("getInfo");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.money-bar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.money-list {
  //width: 220.5px;

  text-align: center;
  height: 38.2px;
  border-radius: 9.5px;
  border: solid 1px #2c2c2c;
  background-image: linear-gradient(to bottom, #000, #373334);
  font-size: 10px;
  & > div {
    width: 50%;
  }
  & > div:nth-child(1) {
    background-image: linear-gradient(
      to bottom,
      rgba(255, 153, 123, 0) 0%,
      rgba(255, 58, 0, 0.33) 100%
    );
    border-radius: 9px;
  }
}
.live {
  img {
    height: 26px;
  }
}
.serve {
  width: 31px;
  height: 31px;
}
</style>
