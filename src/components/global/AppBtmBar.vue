<template>
  <div class="app-btm-bar">
    <div class="app-btm-fix">
      <ul class="app-btm-list max-width750">
        <li
          :class="{
            // active: $router.currentRoute.name == item.name || item.active,
          }"
          class="btm-item center-center"
          v-for="(item, idx) in list"
          @click="goPage(item)"
          :key="idx"
        >
          <p>
            <img
              :src="
                $router.currentRoute.name == item.name || item.active
                  ? item.icon1
                  : item.icon
              "
              alt=""
            />
          </p>
          <p class="text">{{ item.text }}</p>
        </li>
      </ul>
    </div>

    <RootDialog />
  </div>
</template>

<script>
import i18n from "@/locale";
import RootDialog from "@/views/components/RootDialog.vue";
export default {
  name: "AppBtmBar",
  components: {
    RootDialog,
  },
  props: {},
  data() {
    return {
      list: [
        {
          icon: require("@/assets/img/ntf3/130069@2x.png"),
          icon1: require("@/assets/img/ntf3/130070@2x.png"),
          text: i18n.t("tabar.home"),
          name: "home",
          active: false,
        },
        {
          icon: require("@/assets/img/ntf3/130068@2x.png"),
          icon1: require("@/assets/img/ntf3/130071@2x.png"),
          text: i18n.t("investment"),
          name: "investMarket",
          active: false,
        },
        {
          icon: require("@/assets/img/ntf3/130067@2x.png"),
          icon1: require("@/assets/img/ntf3/130072@2x.png"),
          text: i18n.t("user.Contest"),
          name: "ItemShop",
          active: false,
        },
        {
          icon: require("@/assets/img/ntf3/130098@2x.png"),
          icon1: require("@/assets/img/ntf3/130097@2x.png"),
          text: i18n.t("tabar.me"),
          active: false,
          name: "User",
        },
      ],
    };
  },

  watch: {
    $route(to) {
      this.list.forEach((v) => {
        if (v.name == to.name) {
          v.active = true;
        } else {
          v.active = false;
        }
      });
    },
  },
  methods: {
    goPage(v) {
      if (!v.name) return;
      this.$router.push({
        name: v.name,
      });
    },
  },
};
</script>
<style scoped lang="less">
.app-btm-bar {
  &,
  .app-btm-list {
    height: 80px;
    border-radius: 40px;
  }
  .btm-item {
    flex-direction: column;
  }
  .app-btm-fix {
    position: fixed;
    width: 343px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 998;
    &::after {
      -webkit-filter: blur(24.8px);
      filter: blur(24.8px);
      background-color: #040404;
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
  .app-btm-list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    z-index: 999;
    background-color: #171d28;
    background-size: 100% 100%;
    font-size: 12px;
    color: var(--primary);
    .text {
      margin-top: 6px;
    }
    img {
      display: block;
      height: 24px;
      margin: 0 auto;
    }
    .active {
      color: var(--active);
    }
  }
}
</style>
