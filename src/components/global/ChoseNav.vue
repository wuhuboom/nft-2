<template>
  <ul class="justify-between nvas m-t-12">
    <li
      class="center-center flex-1"
      :class="{ 'bg-active': item.key == cur }"
      v-for="(item, idx) in navs"
      @click="chosen(item)"
      :key="idx"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "ChoseNav",
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
    height: 32px;
    border-radius: 8.9px;
  }
  & > li.bg-active {
    background-color: var(--main);
    color: #fff;
  }
}
</style>
