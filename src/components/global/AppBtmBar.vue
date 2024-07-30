<template>
  <div class="app-btm-bar">
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
      </li>
    </ul>
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
          icon: require("@/assets/img/ntf/home/icon1.png"),
          icon1: require("@/assets/img/ntf/home/icon1a.png"),
          text: i18n.t("tabar.home"),
          name: "List",
          active: false,
        },
        {
          icon: require("@/assets/img/ntf/home/icon2.png"),
          icon1: require("@/assets/img/ntf/home/icon2a.png"),
          text: i18n.t("tabar.match"),
          name: "home",
          active: false,
        },
        {
          icon: require("@/assets/img/ntf/home/icon3.png"),
          icon1: require("@/assets/img/ntf/home/icon3a.png"),
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
    height: 104px;
  }
  .btm-item {
    flex-direction: column;
  }
  .app-btm-list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 998;
    background: url("@/assets/img/ntf/home/btm-bg.png") no-repeat center center;
    background-size: 100% 100%;
    font-size: 12px;
    color: var(--primary);
    & > li:nth-child(2) {
      img {
        height: 82px;
        width: 82px;
      }
    }
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
