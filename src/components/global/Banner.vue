<template>
  <div class="focus">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(p, i) in imgs" :key="i"
        ><img class="d-img" :src="p.imageUrl"
      /></van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import userApi from "@/api/user";
export default {
  name: "BannerCom",
  data() {
    return {
      imgs: sessionStorage.getItem("homeSwiper")
        ? JSON.parse(sessionStorage.getItem("homeSwiper"))
        : [],
    };
  },
  methods: {
    async getImg() {
      if (this.imgs.length) return;
      //homeswiper
      const [err, res] = await userApi.homeswiper({
        lang: this.$store.state.lang,
      });
      if (err) return;
      sessionStorage.setItem("homeSwiper", JSON.stringify(res.data));
      this.imgs = res.data;
    },
  },
  created() {
    this.getImg();
  },
};
</script>
<style scoped lang="less">
.my-swipe {
  height: 160px;
  overflow: hidden;
}
</style>
