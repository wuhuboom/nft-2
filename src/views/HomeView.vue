<template>
  <div class="font12">
    <HomeTopBar />
    <div class="p-x-16">
      <Banner />
    </div>
    <div
      class="m-l-16 m-r-16 m-b-12 search"
      @click="$router.push({ name: 'Message' })"
      v-if="notice.content"
    >
      <div class="field-input-box align-center">
        <p class="m-r-8">
          <van-icon name="volume-o" size="16" />
        </p>
        <div class="flex-1 content">
          <div class="u-notice-content">{{ notice.content }}</div>
        </div>
      </div>
    </div>
    <ul
      @click="$router.push({ name: `gamesGroup` })"
      class="item-title p-b-8 justify-between align-center m-t-16 m-l-16 m-r-16 m-b-12"
    >
      <li class="color-fff font16">{{ $t(`Game.Props`) }}</li>
      <li class="center-center more">
        {{ $t(`user.platform.more`) }}
        <van-icon class="m-l-4 rit-desc" size="12" name="arrow" />
      </li>
    </ul>
    <ul class="sold-game p-l-16 d-flex">
      <li
        class="m-r-16"
        @click="
          $router.push({
            name: 'ToolsDetai',
            query: { id: item.id },
          })
        "
        v-for="(item, i) in sold"
        :key="i"
      >
        <p class="p-x-12">
          <img class="d-img" :src="item.image" alt="" />
        </p>
        <p class="els m-b-8 m-t-8">{{ item.title }}</p>
        <p>{{ item.money }}</p>
      </li>
    </ul>
    <div class="hot-live-stream m-t-24">
      <ul
        @click="$router.push('/pages/live')"
        class="item-title p-b-8 justify-between align-center m-t-16 m-l-16 m-r-16 m-b-12"
      >
        <li class="color-fff font16">{{ $t(`Hot.Live.Stream`) }}</li>
        <li class="center-center more">
          {{ $t(`user.platform.more`) }}
          <van-icon class="m-l-4 rit-desc" size="12" name="arrow" />
        </li>
      </ul>
      <div class="list-box">
        <div
          class="list"
          @click="viewVideo(item)"
          v-for="(item, i) in video"
          :key="i"
        >
          <div class="img-box">
            <img class="d-img" :src="item.imageUrl" alt="" />
            <div></div>
          </div>
          <div class="name app-multi-ellipsis--l2">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <ul
      @click="$router.push({ name: `ItemShop`, query: { tab: 1 } })"
      class="item-title p-b-8 justify-between align-center m-t-24 m-l-16 m-r-16 m-b-12"
    >
      <li class="color-fff font16">{{ $t(`Game.Download`) }}</li>
    </ul>
    <div class="game-download">
      <div class="list-box">
        <div
          class="list flex-wrap"
          @click="open(d)"
          v-for="(d, i) in down"
          :key="i"
        >
          <img :src="d.path" alt="" class="img d-img" />
          <div
            class="info-box justify-between align-center flex-grow1 text-ellipsis"
          >
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
              </div>
            </div>
            <div class="download-box center-center">Download</div>
          </div>
        </div>
      </div>
    </div>

    <VersionDilalog />
  </div>
</template>

<script>
import dayjs from "dayjs";
import userApi from "@/api/user";
import VersionDilalog from "@/views/components/VersionDilalog.vue";
import HomeTopBar from "@/components/home/HomeTopBar.vue";
import Banner from "@/components/global/Banner.vue";
export default {
  name: "HomeView",
  data() {
    return {
      notice: {
        content: "",
      },
      sold: [],
      video: [],
      imgs: [],
      down: [
        {
          name: "CS2",
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
          name: "LEAGUE OF LEGENDS",
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
    open(d) {
      window.open(d.url);
    },
    viewVideo(v) {
      //location.href =v.videoUrl
      window.open(v.videoUrl);
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
  },
  created() {
    this.getNotice();
    this.$store.commit("setPdTop", false);
    this.informationDealSold();
    this.informationVideo();
    this.$store.dispatch("setSafeConfig");
    //更新用户信息
    this.$store.dispatch("getInfo");
  },
  mounted() {
    document.querySelector("body").classList.add("gray-bg-img");
  },
  destroyed() {
    document.querySelector("body").classList.remove("gray-bg-img");
  },
};
</script>
<style lang="less" scoped>
.from-to {
  width: 34px;
}
.money-list {
  //width: 220.5px;
  text-align: center;
  height: 38.2px;
  border-radius: 9.5px;
  border: solid 1px #2c2c2c;
  background-image: linear-gradient(to bottom, #000, #373334);
  font-size: 10px;
  & > div {
    width: 50%;
  }
  & > div:nth-child(1) {
    background-image: linear-gradient(
      to bottom,
      rgba(255, 153, 123, 0) 0%,
      rgba(255, 58, 0, 0.33) 100%
    );
    border-radius: 9px;
  }
}
.live {
  img {
    height: 26px;
  }
}
.serve {
  width: 31px;
  height: 31px;
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #caffde;
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
  .title-box {
    padding: 0 16px;
    .left {
      font-size: 16px;
      font-weight: 600;
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
      width: 166px;
      height: 108px;
      overflow: hidden;
      border-radius: 8px;
      background-color: #fff;
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
  .download-box {
    width: 90px;
    height: 33px;
    padding: 8px 33px;
    border-radius: 9px;
    background-image: linear-gradient(
      89deg,
      #026452 0%,
      rgba(1, 69, 63, 0.46) 49%,
      #02735e 100%
    );
  }
  .title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 14px;
  }
  .list {
    padding-bottom: 21px;
    padding-top: 17px;
    .img {
      width: 66px;
      height: 66px;
      border-radius: 8px;
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

.u-notice-content {
  animation: u-loop-animation 14s linear infinite both;
  text-align: right;
  // 这一句很重要，为了能让滚动左右连接起来
  flex-wrap: nowrap;
  color: #afafaf;
  //不换行
  white-space: nowrap;
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
    height: 30px;
    background-image: linear-gradient(to right, #1f383e 0%, #131b26 100%);
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
.sold-game {
  overflow-x: auto;
  & > li {
    flex-shrink: 0;
    width: 125px;
    & > p:nth-child(1) {
      height: 101px;
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 0.1);
    }
    & > p:nth-child(2) {
      color: #e3e7ec;
    }
  }
}
</style>
