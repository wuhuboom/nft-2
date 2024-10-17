<template>
  <van-popup
    v-model="show"
    :close-on-click-overlay="false"
    overlay-class="weekend-overlay-pvrt"
    class="weekend-global-pop center-center text-center"
  >
    {{ $t("WeekdayWithdrawalNotice") }}
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped lang="less">
.weekend-global-pop {
  min-width: 270px;
  height: 101px;
  border-radius: 14px;
  border: solid 1px rgba(0, 0, 0, 0);
  background-image: linear-gradient(to bottom, #1f2430, #151515);
  padding: 8px 36px;
  font-size: 13px;
  color: #fff;
  line-height: 1.8;
}
</style>
<style>
.weekend-overlay-pvrt {
  top: 44px !important;
  bottom: 0;
  /* height: auto !important; */
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
