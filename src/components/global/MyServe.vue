<template>
  <img
    class="my-serve"
    @click="$store.dispatch('getServeData', 1)"
    src="@/assets/img/ntf3/129511@2x.png"
    alt=""
  />
</template>

<script>
export default {
  name: "MyServe",
  props: {
    msg: String,
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
</style>
