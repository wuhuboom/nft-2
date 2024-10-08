<template>
  <div class="fr-page font12 color-primary">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t('Create.your.PIN')"
    ></AppTopBar>
    <p class="center-center m-t-32 pic">
      <img class="d-img" src="@/assets/img/ntf3/form/130104@2x.webp" alt="" />
    </p>
    <van-password-input
      :value="value"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
    />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import userApi from "@/api/user";
export default {
  name: "FriendsList",
  components: {},
  data() {
    return {
      value: "",
      showKeyboard: false,
    };
  },
  methods: {},
};
</script>
<style scoped lang="less">
.pic {
  img {
    width: 149px;
    height: 149px;
  }
}
</style>
