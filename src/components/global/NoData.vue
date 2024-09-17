<template>
  <div class="no-data center-center flex-column p-t-40" :class="className">
    <!-- <img class="d-img" src="@/assets/img/ntf/nodata.webp" alt="" /> -->
    <div class="enter-center m-b-20 p-t-16">
      <van-icon name="description-o" size="62" />
    </div>
    <div class="center-center font14 m-t-4">No Data</div>
  </div>
</template>

<script>
export default {
  name: "NoData",
  props: {
    className: {
      type: String,
      default: "m-t-16",
    },
  },
};
</script>
<style scoped lang="less">
.no-data {
  color: #fff;
  img {
    width: 79px;
    height: 79px;
    object-fit: contain;
  }
}
</style>
