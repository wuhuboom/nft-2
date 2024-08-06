<template>
  <div class="safe-billing font12 color-primary pb-16">
    <AppTopBar
      :styleObj="{ backgroundColor: 'transparent' }"
      :topBarTitle="$t(`wallet.index.explanation.text`)"
    >
    </AppTopBar>
    <ul class="cont-text m-x-16">
      <li class="m-b-16">{{ $t(`backapi.self.safe.rule.content1.text`) }}</li>
      <li class="m-b-16">{{ $t(`backapi.self.safe.rule.content2.text`) }}</li>
      <li class="m-b-16">{{ $t(`backapi.self.safe.rule.content3.text`) }}</li>
    </ul>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import i18n from "@/locale";
export default {
  name: "explanationView",
  mounted() {
    document.querySelector("body").classList.add("gray-bg-img");
  },
  destroyed() {
    document.querySelector("body").classList.remove("gray-bg-img");
  },
};
</script>
<style scoped lang="less">
.safe-billing {
  .cont-text {
    padding: 15px 8px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
