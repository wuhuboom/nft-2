<template>
  <van-action-sheet
    :description="description"
    class="btm-action-sheet color-fff"
    v-model="show"
    :actions="list"
    @select="onSelect"
  />
</template>

<script>
export default {
  name: "BtmActionSheet",
  data() {
    return {
      show: false,
    };
  },
  props: {
    text: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "Select country code",
    },
    actions: {
      type: Array,
      default: () => [],
    },
    fix: {
      type: String,
      default: "",
    },
  },
  computed: {
    list() {
      return this.actions.map((item) => {
        return {
          name: `${this.fix}${item}`,
        };
      });
    },
  },
  methods: {
    open() {
      this.show = true;
    },
    onSelect(item) {
      this.$emit("select", {
        ...item,
        name: item.name.replace(this.fix, ""),
      });
      this.close();
    },
    close() {
      this.show = false;
    },
  },
};
</script>
<style scoped lang="less">
.btm-action-sheet {
  background-color: #161518;
  ::v-deep {
    .van-action-sheet__item {
      background-color: #161518;
    }
    .van-action-sheet__description {
      font-size: 12px;
      color: #fff;
      &::after {
        border-color: #313038;
      }
    }
    .van-action-sheet__item {
      text-align: left;
      border-bottom: 1px solid #313038;
    }
    .van-action-sheet__content {
      padding: 0 16px;
    }
    .van-action-sheet__content {
      max-height: 258px;
    }
  }
}
</style>
