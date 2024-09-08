<template>
  <div class="item-shop-page font12">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t(`Game.Props`)"
    ></AppTopBar>
    <itemGame />
  </div>
</template>

<script>
import itemGame from "@/views/itemGame";
import i18n from "@/locale";
import userApi from "@/api/user";
export default {
  name: "ItemShop",
  components: {
    itemGame,
  },
  data() {
    return {
      current: +this.$route.query.tab || 0,
      navs: [
        {
          name: i18n.t(`user.Contest`),
          key: 0,
        },
        {
          name: i18n.t(`Game.Props`),
          key: 1,
        },
        {
          name: i18n.t(`tabar.bet`),
          key: 2,
        },
      ],
    };
  },
  methods: {
    chose(item) {
      //this.current = item.key;
      this.$router.replace({
        query: {
          tab: item.key,
        },
      });
    },
    async informationVideo(obj = {}) {
      const params = {
        ...this.query,
        ...obj,
      };
      const [err, res] = await userApi.informationVideo(params);
      if (err) {
        this.finished = true;
        return;
      }
      this.finished = res.data.results.length < this.query.pageSize;

      this.video =
        params.pageNo == 1
          ? res.data.results
          : this.video.concat(res.data.results);
      this.query.pageNo++;
    },
  },
  mounted() {
    document.querySelector("body").classList.add("gray-bg-img");
  },
  destroyed() {
    document.querySelector("body").classList.remove("gray-bg-img");
  },
};
</script>
<style scoped lang="less">
.item-shop-page {
  ::v-deep .my-swipe {
    height: 168px;
  }
  .navs {
    & > li {
      width: 95px;
      text-align: center;
      height: 34px;
      line-height: 34px;
      background: url("@/assets/img/ntf/shopnav.png") no-repeat center center;
      background-size: 100% 100%;
    }
    & > li.cur {
      // background: url("@/assets/img/ntf/shopnav-active.png") no-repeat center center;
      // background-size: 100% 100%;
      background: #e4704a;
      color: #fff;
      border-radius: 10px;
    }
  }
}
</style>
