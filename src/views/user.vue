<template>
  <div class="page-user font12 p-l-16 p-r-16">
    <HomeTopBar :title="user.username" />
    <div class="align-center justify-between m-t-8">
      <ul>
        <li class="gray">{{ $t(`property.header.title`) }}</li>
        <li class="m-t-8 m-b-8 bold font18">{{ divide(invest.total) }}</li>
        <li class="green">+{{ divide(invest.today) }}</li>
      </ul>
      <ul class="user-set">
        <li>
          <img
            class="d-img userpic"
            src="@/assets/img/ntf/userpic.webp"
            alt=""
          />
        </li>
        <li class="edt center-center">
          <van-icon name="edit" class="font14" />
        </li>
      </ul>
    </div>
    <ul class="navs justify-between m-t-16">
      <li
        v-for="(item, idx) in navs"
        :key="idx"
        @click="item.path && $router.push(item.path)"
        class="center-center flex-column text-center"
      >
        <img class="d-img" :src="item.img" alt="" />
        <p class="m-t-12">{{ item.text }}</p>
      </li>
    </ul>
    <p class="font14 bold m-t-24 m-b-16">{{ $t(`property.navbar.title`) }}</p>
  </div>
</template>

<script>
import userApi from "@/api/user";
import HomeTopBar from "@/components/home/HomeTopBar.vue";
export default {
  name: "pageUser",
  components: {
    HomeTopBar,
  },
  data() {
    return {
      invest: {},
    };
  },
  computed: {
    config() {
      return this.$store.state.config;
    },
    user() {
      return this.$store.state.user;
    },
    navs() {
      const arr = [
        {
          text: this.$t("fuc.rebate.center"),
          img: require("@/assets/img/ntf/user2.png"),
          path: "/pages/function/rebate_center",
        },
        {
          text: this.$t("Team.benefits"),
          img: require("@/assets/img/ntf/user3.png"),
        },
        {
          text: this.$t("user.trade.title4.text"),
          img: require("@/assets/img/ntf/user4.png"),
        },
      ];
      if (this.config.beyShow == 1) {
        arr.push({
          img: require("@/assets/img/ntf/user1.png"),
          text: this.$t(`Yu'ebao`),
          path: "/pages/user/investDetail",
        });
      }
      return arr;
    },
  },
  methods: {
    async investMyStatisItems() {
      const [err] = await userApi.investMyStatisItems();
      if (err) return;
      // this.invest = res.data;
    },
    async investMyStatis() {
      const [err, res] = await userApi.investMyStatis();
      if (err) return;
      this.invest = res.data;
    },
  },
  created() {
    this.$store.commit("setPdTop", false);
    this.investMyStatisItems();
    this.investMyStatis();
    this.$store.getInfo("getMyInvestList");
  },
};
</script>
<style scoped lang="less">
.gray {
  color: #79869b;
}
.green {
  color: #00d91f;
}
.user-set {
  position: relative;
  .userpic {
    width: 58px;
    height: 58px;
  }
  .edt {
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: 22px;
    height: 22px;
    border-radius: 11px;
    background-image: linear-gradient(to bottom, #1f2430, #21232e);
  }
}
.navs {
  & > li {
    background: no-repeat center center;
    background-size: 100% 100%;
    &,
    img {
      width: 57px;
    }
    img {
      height: 57px;
    }
  }
}
</style>
