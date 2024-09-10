<template>
  <div class="focus">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(p, i) in imgsList || imgs" :key="i"
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
      imgs: [],
    };
  },
  props: {
    imgsList: {
      type: Array,
      default: null,
    },
  },
  methods: {
    async getImg() {
      if (this.imgs.length) return;
      //homeswiper
      const [err, res] = await userApi.homeswiper({
        lang: this.$store.state.lang,
      });
      if (err) return;
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
