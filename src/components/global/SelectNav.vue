<template>
  <div>
    <p @click="show = true" class="align-center title">
      <span class="font14 m-r-4">{{ text }}</span>
      <van-icon name="arrow-down" :size="12" />
    </p>
    <van-popup class="chose-nav-pop" v-model="show" position="bottom">
      <ul>
        <li
          class="font16 blod list center-center"
          @click="chosen(item)"
          :class="{
            active: item.value === cur,
          }"
          v-for="(item, idx) in navs"
          :key="idx"
        >
          {{ item.label }}
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
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
  computed: {
    text() {
      const docs = this.navs.find((item) => item.value === this.cur);
      return docs ? docs.label : "";
    },
  },
  methods: {
    chosen(item) {
      this.show = false;
      this.$emit("chosen", item);
    },
  },
};
</script>
<style scoped lang="less">
.title {
  color: #a6a6a6;
}
.chose-nav-pop {
  background-color: #242b36;
  max-height: 60%;
  overflow-y: auto;
  border-radius: 8px 8px 0 0;
}
.list {
  height: 52px;
}
</style>
