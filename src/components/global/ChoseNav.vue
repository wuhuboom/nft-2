<template>
  <ul class="justify-between nvas" :class="className">
    <li
      class="center-center flex-1"
      :class="{ 'bg-active': item.key == cur || item.value == cur }"
      v-for="(item, idx) in navs"
      @click="chosen(item)"
      :key="idx"
    >
      {{ item.name || item.text }}
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    chosen(item) {
      console.log("disabled", this.disabled);
      if (this.disabled) return;
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
