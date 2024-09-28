<template>
  <div
    class="appp-top-bar align-center justify-between max-width750"
    :class="{ 'bg-black': fiexd }"
    :style="styleObj"
  >
    <div class="appp-top-cont align-center justify-between">
      <van-button
        @click="goback"
        class="icon-button"
        v-if="showLeft"
        :icon="leftIcon"
        type="primary"
      />
      <div
        class="appp-top-bar-title js-appp-top-bar-title"
        :class="titleClass"
        @click.stop.prevent
      >
        {{ titleSolt ? "" : topBarTitle }}
        <slot name="title"></slot>
      </div>
      <div class="right center-center">
        <slot name="right"></slot>
      </div>
    </div>
    <RootDialog />
  </div>
</template>

<script>
import RootDialog from "@/views/components/RootDialog.vue";
export default {
  name: "AppTopBar",
  data() {
    return { fiexd: false };
  },
  components: {
    RootDialog,
  },
  props: {
    titleClass: {
      type: Array,
      default: () => [],
    },
    titleSolt: {
      type: Boolean,
      default: false,
    },
    showLeft: {
      type: Boolean,
      default: true,
    },
    leftIcon: {
      type: String,
      default: "arrow-left",
    },
    styleObj: {
      type: Object,
      default: () => ({
        backgroundColor: "#000",
      }),
    },
    showMsg: {
      type: Boolean,
      default: false,
    },
    topBarTitle: {
      type: String,
      default: "",
    },
    back: {
      type: Function,
      default: null,
    },
  },
  methods: {
    goback() {
      if (this.back) {
        this.back();
      } else {
        this.$router.go(-1);
      }
    },
    handleScroll() {
      if (window.scrollY > 0) {
        this.fiexd = true;
      } else {
        this.fiexd = false;
      }
    },
  },
  //监听滚动条加背景色
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
<style scoped lang="less">
// .appp-top-bar {
//   background: url("@/assets/img/130937.webp") no-repeat center bottom;
//   background-size: 100% auto;
// }

.right {
  min-width: 43px;
}
</style>
