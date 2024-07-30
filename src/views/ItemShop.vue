<template>
  <div class="item-shop-page font12">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t(`user.Item.shop`)"
      :styleObj="{
        backgroundColor: '#000',
        color: 'red',
      }"
    ></AppTopBar>
    <div class="focus">
      <img class="d-img" src="@/assets/img/ntf/item.webp" />
    </div>
    <ul class="justify-around align-center navs m-t-16 m-b-16">
      <li
        @click="chose(item)"
        :class="{ cur: current === item.key }"
        v-for="(item, i) in navs"
        :key="i"
      >
        {{ item.name }}
      </li>
    </ul>
    <itemGame v-if="current == 0" />
    <itemTrade v-if="current == 1" />
    <itemContest v-if="current == 2" />
  </div>
</template>

<script>
import itemGame from "@/views/itemGame";
import itemTrade from "@/views/itemTrade";
import itemContest from "@/views/itemContest.vue";
import i18n from "@/locale";
import userApi from "@/api/user";
export default {
  name: "ItemShop",
  components: {
    itemGame,
    itemTrade,
    itemContest,
  },
  data() {
    return {
      current: +this.$route.query.tab || 0,
      navs: [
        {
          name: i18n.t(`Game.Props`),
          key: 0,
        },
        {
          name: i18n.t(`tabar.bet`),
          key: 1,
        },
        {
          name: i18n.t(`user.Contest`),
          key: 2,
        },
      ],
    };
  },
  methods: {
    chose(item) {
      this.current = item.key;
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
};
</script>
<style scoped lang="less">
.item-shop-page {
  ::v-deep {
    .app-top-black-title {
      color: #fff !important;
    }
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
