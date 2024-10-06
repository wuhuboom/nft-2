<template>
  <div>
    <p @click="show = true"></p>
    <van-popup v-model="show" position="top" :style="{ height: '30%' }" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  name: "SelectNav",
  props: {
    className: {
      type: String,
      default: "m-t-12",
    },
    cur: {
      type: Number,
      default: null,
    },
    navs: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    chosen(item) {
      this.$emit("chosen", item);
    },
  },
};
</script>
<style scoped lang="less">
.nvas {
  border-radius: 8.9px;
  background-color: #333335;
  & > li {
    height: 38px;
    border-radius: 8.9px;
  }
  & > li.bg-active {
    color: #fff;
  }
}
</style>
