<template>
  <div class="game-Tools-detai-page font12 p-l-16 p-r-16">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t(`Game.Props`)"
      :styleObj="{ backgroundColor: 'tra' }"
    ></AppTopBar>
    <div class="pic d-flex">
      <img class="d-img" :src="item.image" alt="" />
    </div>
    <p class="m-t-16 m-b-20 font16">{{ item.title }}</p>
    <ul class="align-center justify-between icon-tol m-b-20">
      <li class="align-center justify-between p-x-4">
        <p class="m-r-16 m-l-16 no-grow">
          <img class="d-img" src="@/assets/img/ntf/tool1.png" alt="" />
        </p>
        <div class="flex-1 els">
          <p class="m-b-4 els">{{ $t(`user.Wear.thing`) }}</p>
          <p class="els i-text">{{ item.icons }}</p>
        </div>
      </li>
      <li class="align-center justify-between p-x-4">
        <p class="m-r-16 m-l-16 no-grow">
          <img class="d-img font14" src="@/assets/img/ntf/tool2.png" alt="" />
        </p>
        <div class="flex-1 els">
          <p class="m-b-4 els">{{ $t(`user.Wear`) }}</p>
          <p class="els i-text font14">{{ item.duality }}</p>
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
      <p class="price ntf-vant-btn flex-1">
        {{ $t("home.price") }}: {{ item.money }}
      </p>
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
      border: solid 1px rgba(55, 251, 124, 0.17);
      background-color: #040a06;
    }
  }
  .pic {
    align-items: baseline;
    justify-content: center;
    height: 310px;
    border-radius: 15px;
    padding: 0 42px 42px;
    background: url("@/assets/img/ntf3/461@2x.webp") no-repeat center bottom;
    background-size: 100% auto;
    img {
      object-fit: contain;
    }
  }
  .icon-tol {
    & > li {
      width: 166px;
      height: 75px;
      border-radius: 16px;
      border: solid 1px rgba(55, 251, 124, 0.17);
      background-color: #040a06;
    }
    img {
      height: 36px;
      width: 36px;
    }
    .i-text {
      color: #9db1cd;
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
