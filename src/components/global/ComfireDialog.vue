<template>
  <van-dialog
    v-model="show"
    :showConfirmButton="false"
    :showCancelButton="false"
    :closeOnClickOverlay="true"
    class="linear-global-pop font12"
    :class="{ 'no-foot-btn': !footBtn }"
    @close="close"
  >
    <ul class="flex-column cancle-dialog">
      <li class="sure-game flex-column center-center p-l-16 p-r-16 m-t-16">
        <p
          :class="{ 'm-b-16': idx !== texts.length - 1 }"
          v-for="(item, idx) in texts"
          :key="idx"
        >
          {{ item }}
        </p>
      </li>
      <li v-if="footBtn" class="align-center m-t-16 justify-around">
        <van-button
          @click="cancle"
          size="small"
          v-if="cancelBtn"
          class="ntf-vant-btn ntf-btn-cancel m-r-24"
          block
          type="info"
        >
          {{ $t("modal.cancel.text") }}
        </van-button>
        <van-button
          class="ntf-vant-btn"
          size="small"
          block
          type="info"
          @click="sure"
        >
          {{ $t("modal.confirm.text") }}
        </van-button>
      </li>
      <!-- <li v-if="footBtn" class="cancle-btns center-center p-l-24 p-r-24">
        <p v-if="cancelBtn" class="ntf-vant-btn" @click="cancle">
          {{ $t("modal.cancel.text") }}
        </p>
        <p class="ntf-vant-btn" @click="sure">
          {{ $t("modal.confirm.text") }}
        </p>
      </li> -->
    </ul>
  </van-dialog>
</template>

<script>
import i18n from "@/locale";
export default {
  name: "ComfireDialog",
  data() {
    return {
      cancelBtn: true,
      show: false,
    };
  },
  props: {
    texts: {
      type: Array,
      default: () => [i18n.t("You.sure.cancel.game")],
    },
    footBtn: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    cancelBtnShow(v) {
      this.cancelBtn = v;
    },
    open() {
      this.show = true;
    },
    sure() {
      this.$emit("sure");
      this.show = false;
    },
    cancle() {
      this.show = false;
      this.$emit("cancle");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style scoped lang="less">
.cancel-dialog-parent {
  background-color: transparent;
  color: var(--primary);
  &.no-foot-btn {
    .cancle-dialog {
      height: auto;
    }
  }
  .sure-game {
    height: 123px;
    width: 100%;
  }
  .cancle-dialog {
    width: 318px;
    height: 194px;
    background: url("@/assets/img/red/canclebg.webp") no-repeat center center;
    background-size: 100% 100%;
  }
  .cancle-btns {
    width: 100%;
    justify-content: space-around !important;
    P {
      width: 76px;
      height: 18px;
      color: #fff;
      border-radius: 9px;
      background-color: var(--primary);
    }
  }
}
</style>
