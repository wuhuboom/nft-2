<template>
  <div class="font12 home-index-page">
    <HomeTopBar />
    <MoneyBar class="m-b-20" />
    <Banner class="m-b-16" />
    <div class="shop m-l-16 m-r-16 m-b-16">
      <ul class="nav-enter-list justify-between els">
        <li
          class="els"
          @click="$router.push({ path: '/pages/wallet/onlineRecharge' })"
        >
          {{ $t("deal.recharge.354498-0") }}
        </li>
        <li
          class="els"
          @click="$router.push({ path: '/pages/wallet/withdraw' })"
        >
          {{ $t(`dropdown.billing.income.withdraw.text`) }}
        </li>
        <li class="els" @click="goWeb">
          {{ $t("Website.txt") }}
        </li>
      </ul>
    </div>
    <!-- @click="$router.push({ name: 'Message' })" -->
    <div class="m-l-16 m-r-16 m-b-12 search" v-if="ranking.length">
      <div class="field-input-box align-center">
        <p class="m-r-8">
          <img class="d-block" src="@/assets/img/red/voice.webp" alt="" />
        </p>
        <div class="flex-1 content">
          <div class="u-notice-content align-center">
            <div class="align-center notice-ranking">
              <p
                class="align-center m-r-8"
                v-for="(item, idx) in ranking"
                :key="idx"
              >
                <span class="m-r-4 color-fff"
                  >{{ item.username }} Today income
                </span>
                <span class="active">+{{ parseInt(item.income) }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ul
      @click="$router.push({ name: `ItemShop`, query: { tab: 1 } })"
      class="item-title justify-between align-center m-t-20 m-l-16 m-r-16 m-b-12"
    >
      <li class="color-fff font16 blod">{{ $t(`user.Item.shop`) }}</li>
      <li class="center-center more color-active">
        {{ $t(`user.platform.more`) }}
        <van-icon class="m-l-4 rit-desc" size="12" name="arrow" />
      </li>
    </ul>
    <div
      class="game-hot"
      @click="$router.push({ name: `ItemShop`, query: { tab: 1 } })"
    >
      <div class="center-center hot-title p-t-16 text-center">
        <p>
          <img src="@/assets/img/ntf/home/rit.png" alt="" />
        </p>
        <ul class="trading bold m-l-8 m-r-8">
          <li class="els">{{ $t(`user.platform.trading`) }}</li>
          <li class="els">{{ $t(`user.platform.trading.desc`) }}</li>
        </ul>
        <p>
          <img src="@/assets/img/ntf/home/left.png" alt="" />
        </p>
      </div>

      <div class="content-box">
        <div class="left-top top text-ellipsis">{{ $t(`Date.Time`) }}</div>
        <div class="right-top top text-ellipsis">{{ $t(`From.Arrive`) }}</div>
        <div class="list flex-wrap" v-for="(item, i) in sold" :key="i">
          <div class="b b-1 center-center">
            {{ date(item) }}
          </div>
          <div class="b b-2 text-ellipsis center-center">
            <van-image fit="contain" :src="item.image" />
          </div>
          <div class="b b-3 text-ellipsis center-center">
            <p class="text-ellipsis">
              {{ item.title }}
            </p>
          </div>
          <div class="b b-4 center-center">
            <p class="text-ellipsis">+{{ item.money }}$</p>
          </div>
          <div class="b b-5 text-ellipsis center-center">
            <p class="text-ellipsis from-to">{{ item.from }}</p>
            /
            <p class="text-ellipsis from-to">{{ item.to }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="hot-live-stream m-b-20">
      <div class="title-box flex-wrap">
        <div class="left flex-grow1 blod">{{ $t(`Hot.Live.Stream`) }}</div>
        <div class="right" @click="$router.push('/pages/live')">
          {{ $t(`user.platform.more`) }}
          <van-icon class="m-l-4" name="arrow" />
        </div>
      </div>
      <div class="list-box">
        <div
          class="list"
          @click="viewVideo(item)"
          v-for="(item, i) in video"
          :key="i"
        >
          <div class="img-box">
            <img :src="item.imageUrl" alt="" />
            <div></div>
          </div>
          <div class="name app-multi-ellipsis--l2">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>

    <div class="game-download">
      <div class="title blod m-b-16">{{ $t(`Game.Download`) }}</div>
      <div class="list-box">
        <div
          class="list m-b-16 flex-wrap"
          @click="open(d)"
          v-for="(d, i) in down"
          :key="i"
        >
          <img :src="d.path" alt="" class="img d-img" />
          <div class="info-box align-center flex-grow1 text-ellipsis">
            <div class="">
              <div class="name text-ellipsis">{{ d.name }}</div>
              <div class="c-box flex-wrap">
                <div class="star-box center-center">
                  <van-icon
                    class="icon"
                    name="star"
                    color="#f4d144"
                    size="12px"
                  />
                  4.8
                </div>
                <div class="line">|</div>
                <div class="download-box center-center">
                  <van-icon
                    class="icon download-icon"
                    name="back-top"
                    color="#fff"
                    size="14px"
                  />
                  Download
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <VersionDilalog />
    <ComfireDialog
      :texts="[$store.state.withdrawalLimitMsg]"
      ref="dangers"
      @close="confirm"
    />
    <p
      class="lot-icon js-lot-icon-app lot-icon-app"
      v-draggable
      v-if="base.switch"
      @click="goLot"
    ></p>
  </div>
</template>

<script>
import dayjs from "dayjs";
import userApi from "@/api/user";
import VersionDilalog from "@/views/components/VersionDilalog.vue";
import HomeTopBar from "@/components/home/HomeTopBar.vue";
import MoneyBar from "@/components/home/MoneyBar.vue";
import Banner from "@/components/global/Banner.vue";
export default {
  name: "HomeView",
  data() {
    return {
      ranking: [],
      base: { switch: null },
      notice: {
        content: "",
      },
      sold: [],
      video: [],
      imgs: [],
      down: [
        {
          name: "Genshin",
          path: require("@/assets/img/HomeView/10028.png"),
          url: "https://genshin.hoyoverse.com/en",
        },
        {
          name: "World of Warcraft",
          path: require("@/assets/img/HomeView/10029.png"),
          url: "https://worldofwarcraft.blizzard.com/en-us/",
        },
        {
          name: "Grand Theft Auto V",
          path: require("@/assets/img/HomeView/10030.png"),
          url: "https://store.steampowered.com/agecheck/app/271590/",
        },
        {
          name: "Dota 2",
          path: require("@/assets/img/HomeView/10031.png"),
          url: "https://www.dota2.com/home?l=english",
        },
      ],
    };
  },
  components: {
    VersionDilalog,
    HomeTopBar,
    Banner,
    MoneyBar,
  },
  computed: {
    safeConfig() {
      return this.$store.state.safeConfig;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async getRanking() {
      const [err, res] = await userApi.playerInvestRanking();
      if (err) return;
      this.ranking = res.data;
    },
    goLot() {
      this.$router.push({ name: "Wheel" });
    },
    open(d) {
      window.open(d.url);
    },
    viewVideo(v) {
      //location.href =v.videoUrl
      window.open(v.videoUrl);
    },
    goWeb() {
      if (window.Website) {
        location.href = window.Website;
      }
    },
    date(item) {
      return dayjs.unix(this.$ToSeconds(item.createTime)).format("YYYY-MM-DD");
    },
    async informationVideo() {
      const [err, res] = await userApi.informationVideo({
        pageNo: 1,
        pageSize: 8,
      });
      if (err) return;
      this.video = res.data.results;
    },
    async informationDealSold() {
      //pageNo  pageSize
      const [err, res] = await userApi.informationDealSold({
        pageNo: 1,
        pageSize: 4,
      });
      if (err) return;
      this.sold = res.data.results;
    },
    async getNotice() {
      const [err, res] = await userApi.notice();
      if (err) return;
      this.notice = res.data[0] || {};
    },
    confirm() {
      this.$store.commit("setwithdrawalLimitMsg", "");
    },
    async getBase() {
      const [err, res] = await userApi.bingoCount();
      if (err) return;
      for (let key in res.data) {
        this.$set(this.base, key, res.data[key]);
      }
    },
  },
  created() {
    this.getRanking();
    this.getBase();
    this.getNotice();
    this.$store.commit("setPdTop", false);
    this.informationDealSold();
    this.informationVideo();
    this.$store.dispatch("setSafeConfig");
  },
  mounted() {
    if (this.$store.state.withdrawalLimitMsg) {
      this.$refs.dangers.cancelBtnShow(false);
      this.$refs.dangers.open();
    }
  },
};
</script>
<style lang="less" scoped>
.lot-icon-app {
  position: fixed;
  right: 4px;
  bottom: 180px;
  height: 60px;
  width: 60px;
  background: url("@/assets/img/ntf/home/126947@2x.webp") no-repeat center
    center;
  background-size: 100% 100%;
}
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
}
.from-to {
  width: 34px;
}

.shop {
  .user-info {
    height: 48px;
  }
  .enter {
    .desc {
      max-width: 97px;
    }
    img {
      height: 67px;
      width: 67px;
    }
  }
  .nav-enter-list {
    & > li {
      width: 97px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background: url("@/assets/img/ntf/home/desc1.png") no-repeat;
      background-size: 100% 100%;
    }
    & > li:nth-child(2) {
      background-image: url("@/assets/img/ntf/home/desc2.webp");
    }
    & > li:nth-child(3) {
      background-image: url("@/assets/img/ntf/home/desc3.webp");
    }
  }
}
.item-title {
  .more {
    .rit-desc {
      margin-top: 2px;
    }
  }
}
.game-hot {
  width: 375px;
  height: 256px;
  background: url("@/assets/img/ntf/home/gamehot.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  .hot-title {
    img {
      height: 24px;
      width: 24px;
    }
  }
  .trading {
    width: 158px;
    color: #0ecaf6;
  }

  .content-box {
    width: 343px;
    margin: 0 auto;
    color: #e3e7ec;
    padding-top: 26px;
    position: relative;
    .top {
      position: absolute;
      color: #808080;
      font-size: 9px;
      top: 16px;
      width: 54px;
      &.left-top {
        left: 9.5px;
      }
      &.right-top {
        right: 9.5px;
      }
    }
    .list {
      height: 45.8px;
      padding: 0 12px;
      border-bottom: 1px solid rgba(242, 242, 242, 0.06);
      align-items: center;
      &:last-child {
        border-bottom: none;
      }
      .b {
        flex: 1;
        margin-right: 10px;
        width: 50px;
        justify-content: normal !important;
        &:last-child {
          margin-right: 0;
        }
      }
      .b-1 {
        text-align: center;
        width: 50px;
        flex: none;
      }
      .b-4 {
        color: #f5673e;
      }
      .b-2 {
        width: 35px;
        height: 35px;
        background-size: 35px 35px;
        background-position: center;
      }
    }
  }
}
.hot-live-stream {
  margin-top: 20px;
  .title-box {
    padding: 0 16px;
    .left {
      font-size: 16px;
    }
    .right {
      color: #f5673e;
      font-size: 10px;
    }
  }
  .list-box {
    margin-top: 15px;
    display: flex;
    overflow: auto;
    padding: 0 16px;
    .img-box {
      width: 240px;
      height: 128px;
      overflow: hidden;
      border-radius: 8px;
      background-color: #fff;
      img {
        width: 240px;
        height: 128px;
        object-fit: cover;
      }
    }
    .list {
      margin-right: 16px;
      width: 240px;
      &:last-child {
        margin-right: 0;
      }
    }
    .name {
      margin-top: 14px;
      color: #e3e7ec;
      font-size: 14px;
    }
  }
}
.game-download {
  padding: 0 16px;
  color: #e3e7ec;
  .title {
    font-size: 16px;

    margin-bottom: 14px;
  }
  .list {
    border-top: 1px solid #020808;
    .img {
      width: 66px;
      height: 66px;
      border-radius: 8px;
      object-fit: cover;
    }
    .info-box {
      margin-left: 16px;
    }
    .name {
      font-size: 14px;
    }
    .des {
      margin-top: 8px;
      color: #858585;
    }
    .c-box {
      margin-top: 5px;
    }
    .line {
      margin: 0 10px;
    }
    .download-icon {
      transform: rotate(180deg);
    }
    .icon {
      margin-right: 5px;
    }
  }
}

.notice-ranking {
  white-space: nowrap; /* Prevent line breaks */
  animation: u-loop-animation 38s linear infinite;
}
@keyframes u-loop-animation {
  0% {
    transform: translate3d(0, 0, 0);
  }

  100% {
    transform: translate3d(-100%, 0, 0);
  }
}
.search {
  .field-input-box {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 12px;
    height: 30px;
    font-size: 12px;
    border-radius: 9.5px;
    border: solid 1px #2c2c2c;
    height: 30px;
    background-image: linear-gradient(to bottom, #000, #373334);
    img {
      height: 16px;
    }
    .content {
      overflow: hidden;
    }
  }
  @searchColor: #737b8c;
  .van-icon-search {
    font-size: 24px;
    color: var(--active);
  }
  ::-webkit-input-placeholder,
  ::placeholder {
    color: @searchColor;
  }
}
</style>
