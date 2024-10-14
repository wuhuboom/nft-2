<template>
  <div
    class="appp-top-bar align-center justify-between max-width750"
    :style="styles"
  >
    <div class="appp-top-cont align-center justify-between p-l-16 p-r-16">
      <slot name="left">
        <img
          @click="goback"
          v-if="showLeft"
          class="d-img iocn-left"
          src="@/assets/img/ntf3/group-42@2x.webp"
          alt=""
        />
      </slot>
      <div
        class="appp-top-bar-title js-appp-top-bar-title"
        :class="titleClass"
        @click.stop.prevent
      >
        {{ titleSolt ? "" : topBarTitle }}
        <slot name="title"></slot>
      </div>

      <div class="right center-center">
        <slot name="right"> </slot>
      </div>
    </div>
    <RootDialog />
  </div>
</template>

<script>
import RootDialog from "@/views/components/RootDialog.vue";
export default {
  name: "AppTopBar",
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
        backgroundImage: "linear-gradient(to right, #1f383e 0%, #131b26 100%)",
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
  computed: {
    styles() {
      return {
        backgroundImage: "linear-gradient(to right, #1f383e 0%, #131b26 100%)",
        ...this.styleObj,
      };
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
  },
};
</script>
<style scoped lang="less">
.right {
}
.iocn-left {
  height: 33px;
  width: 33px;
}
</style>
