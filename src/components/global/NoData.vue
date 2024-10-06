<template>
  <div class="no-data center-center flex-column p-t-40" :class="className">
    <img class="d-img m-b-32" src="@/assets/img/ntf3/template_01.png" alt="" />

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
    width: 100px;

    object-fit: contain;
  }
}
</style>
