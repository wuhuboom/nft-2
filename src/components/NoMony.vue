<template>
  <van-popup class="no-money-pop" v-model="moneyShow" position="center">
    <ul class="font14 desc-money-list center-center flex-column color-fff">
      <li class="m-b-8">{{ $t(`backapi.balanceNotEnough`) }}</li>
      <li
        class="recharge center-center ntf-vant-btn m-t-16 m-b-16"
        @click="
          $router.push({
            name: 'Recharge',
          })
        "
      >
        {{ $t(`recharge.button.now.text`) }}
      </li>
      <li class="" @click="moneyShow = false">
        {{ $t(`cancel.btn.text`) }}
      </li>
    </ul>
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      moneyShow: false,
    };
  },
  methods: {
    open() {
      this.moneyShow = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.no-money-pop {
  width: 246px;
  height: 162px;
  border-radius: 14px;
  border: solid 1px rgba(0, 0, 0, 0);
  background-image: linear-gradient(to bottom, #1f2430, #151515);
  .desc-money-list {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    padding: 0 20px;
    .recharge {
      width: 181px;
      height: 33px;
      border-radius: 12px;
      // box-shadow: 0 3px 6px 0 #5a3e01;
      // background-color: #f5673e;
    }
  }
}
</style>
