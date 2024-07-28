<template>
  <van-action-sheet
    class="btm-action-sheet color-fff"
    v-model="show"
    :description="$t(`index.index.lang`)"
  >
    <ul class="content-user-lang">
      <li
        @click="onSelect(item)"
        class="align-center m-l-16 m-r-16"
        v-for="(item, idx) in langOptions"
        :key="idx"
      >
        <!-- <img :src="item.icon" alt="" /> -->
        {{ item.label }}
      </li>
    </ul>
  </van-action-sheet>
</template>

<script>
export default {
  name: "BtmActionLang",
  data() {
    return {
      show: false,
    };
  },
  computed: {
    langOptions() {
      return this.$store.state.langOpt;
    },
  },
  methods: {
    open() {
      this.show = true;
    },
    onSelect(e) {
      this.show = false;
      this.$store.commit("setLang", e.value);
    },
    close() {
      this.show = false;
    },
  },
};
</script>
<style scoped lang="less">
.btm-action-sheet {
  background-color: var(--bg-body);
  ::v-deep {
    .van-action-sheet__item {
      background-color: var(--bg-body);
    }
    .van-action-sheet__description {
      font-size: 16px;
      color: #fff;
      &::after {
        border-color: #313038;
      }
    }
  }
}
.content-user-lang {
  & > li {
    height: 40px;
    padding: 0 30px;
    border-bottom: 1px solid #313038;
    img {
      width: 22px;
      height: 22px;
      margin-right: 8px;
    }
  }
}
</style>
