<template>
  <van-action-sheet
    class="btm-action-sheet color-fff"
    v-model="show"
    :description="$t(`index.index.lang`)"
  >
    <ul class="content-user-lang font16 p-b-32">
      <li
        @click="onSelect(item)"
        class="align-center m-l-16 m-r-16"
        v-for="(item, idx) in langOptions"
        :key="idx"
      >
        <!-- <img :src="item.icon" alt="" /> -->
        <p class="align-center">
          <img class="d-img m-r-12" :src="item.icon" alt="" /> {{ item.label }}
        </p>
        <p v-if="$store.state.lang == item.value">
          <img class="d-img rit" src="@/assets/img/right-c.webp" alt="" />
        </p>
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
  background-color: #161518;
  ::v-deep {
    .van-action-sheet__item {
      background-color: #161518;
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
    height: 52px;
    padding: 0 30px;
    border-bottom: 1px solid #313038;
    justify-content: space-between;
    img {
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }
    .rit {
      height: 22px;
      width: 22px;
    }
  }
}
</style>
