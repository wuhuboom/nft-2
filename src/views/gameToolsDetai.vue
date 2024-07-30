<template>
  <div class="game-Tools-detai-page font12 p-l-16 p-r-16">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t(`Game.Props`)"
      :styleObj="{ backgroundColor: 'tra' }"
    ></AppTopBar>
    <div class="pic center-center">
      <van-image fit="contain" :src="item.image" />
    </div>
    <p class="m-t-16 m-b-20 font16">{{ item.title }}</p>
    <ul class="align-center justify-between icon-tol m-b-20">
      <li class="align-center justify-between p-x-4">
        <p class="m-r-16 m-l-16 no-grow">
          <img class="d-img" src="@/assets/img/ntf/tool1.png" alt="" />
        </p>
        <div class="flex-1 els">
          <p class="m-b-4 els">{{ $t(`user.Wear.thing`) }}</p>
          <p class="els gray">{{ item.icons }}</p>
        </div>
      </li>
      <li class="align-center justify-between p-x-4">
        <p class="m-r-16 m-l-16 no-grow">
          <img class="d-img font14" src="@/assets/img/ntf/tool2.png" alt="" />
        </p>
        <div class="flex-1 els">
          <p class="m-b-4 els">{{ $t(`user.Wear`) }}</p>
          <p class="els gray font14">{{ item.duality }}</p>
        </div>
      </li>
    </ul>
    <p class="m-b-12 font14">{{ $t(`Property.description`) }}</p>
    <ul class="tag d-flex flex-wrap">
      <li class="p-l-12 p-r-12 m-r-12 m-b-12">
        <span class="gray">{{ $t("home.game.tool.attr.kind") }}:</span>
        {{ item.type }}
      </li>
      <li class="p-l-12 p-r-12 m-r-12 m-b-12">
        <span class="gray">{{ $t("home.game.tool.attr.type") }}:</span>
        {{ item.style }}
      </li>
      <li class="p-l-12 p-r-12 m-r-12 m-b-12">
        <span class="gray">{{ $t("home.game.tool.attr.brand") }}:</span>
        {{ item.quality }}
      </li>
      <li class="p-l-12 p-r-12 m-r-12 m-b-12">
        <span class="gray">{{ $t("home.game.tool.attr.out") }}:</span>
        {{ item.exterior }}
      </li>
    </ul>
    <p class="m-b-12 font14">{{ $t(`Properties`) }}</p>
    <div class="attr-content" v-html="item.desp"></div>
    <div class="game-price center-center font16 p-l-24 p-r-24">
      <p class="price flex-1">{{ $t("home.price") }}: {{ item.money }}</p>
    </div>
  </div>
</template>

<script>
//import i18n from "@/locale";
import userApi from "@/api/user";
export default {
  name: "ItemShop",
  components: {},
  data() {
    return {
      item: {},
    };
  },
  methods: {
    async InformationDeal() {
      const [err, res] = await userApi.InformationDetail(this.$route.query.id);
      if (err) return;
      this.item = res.data;
    },
  },
  created() {
    this.InformationDeal();
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
.game-Tools-detai-page {
  padding-bottom: 92px;
  .game-price {
    height: 92px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .price {
    height: 44px;
    line-height: 44px;
    text-align: center;
    border-radius: 12px;
    box-shadow: 0 3px 6px 0 #78350f;
    background-color: #f5673e;
  }
  .gray {
    color: rgba(246, 246, 246, 0.4);
  }
  .tag {
    & > li {
      height: 38px;
      line-height: 38px;
      border-radius: 16px;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  .pic {
    height: 299px;
    border-radius: 15px;
    background-color: #292929;
    padding: 22px 42px;
  }
  .icon-tol {
    & > li {
      width: 166px;
      height: 75px;
      border-radius: 16px;
      background-color: #282627;
    }
    img {
      height: 36px;
      width: 36px;
    }
  }
  .attr-content {
    ::v-deep {
      p {
        color: #e3e7eb;
      }
    }
  }
}
</style>
