<template>
  <div class="font12">
    <van-sticky :offset-top="0">
      <ul class="nav justify-between align-center">
        <li class="logo center-center">
          <img class="d-img" src="@/assets/img/ntf/home/logo.png" alt="" />
        </li>
        <li class="flex-1 text-center txt">logo.com</li>
        <li class="align-center lef-icon">
          <p class="m-r-16" @click="openLang">
            <img class="d-img" src="@/assets/img/ntf/home/nav1.png" alt="" />
          </p>
          <p class="m-r-16">
            <img class="d-img" src="@/assets/img/ntf/home/nav2.png" alt="" />
          </p>
        </li>
      </ul>
    </van-sticky>
    <ul class="p-l-16 p-r-16 center-center els m-t-8 m-b-12">
      <li class="live">
        <img src="@/assets/img/ntf/home/ligth.png" alt="" />
      </li>
      <li class="m-r-8 m-l-8 center-center flex-1 money-list">
        <div class="p-x-4">
          <p class="els">{{ $t(`user.money.available`) }}</p>
          <p class="m-t-4 els">{{ divide(user.balance) }}</p>
        </div>
        <div class="p-x-4">
          <p class="els">{{ $t(`user.money.purchased`) }}</p>
          <p class="m-t-4 els">{{ divide(user.frozenBet) }}</p>
        </div>
      </li>
      <li class="serve">
        <img class="d-img" src="@/assets/img/ntf/home/serve.png" alt="" />
      </li>
    </ul>
    <div class="shop m-l-16 m-r-16 m-b-24">
      <ul class="text-center user-info">
        <li class="username blod">{{ user.username }}</li>
        <li class="vipLevel m-t-4" v-if="user.vipLevel">
          LV.{{ user.vipLevel }}
        </li>
      </ul>
      <ul class="enter justify-between p-l-16 p-r-16">
        <li
          class="flex-column center-center"
          @click="$router.push({ name: `ItemShop`, query: { tab: 0 } })"
        >
          <div class="els desc">
            <p class="m-b-8 els">{{ $t(`user.Item.shop`) }}</p>
          </div>

          <p><img src="@/assets/img/ntf/home/shop1.png" alt="" /></p>
        </li>
        <li
          class="flex-column center-center"
          @click="$router.push({ path: '/pages/function/rebate_center' })"
        >
          <div class="els desc">
            <p class="m-b-8 els">{{ $t(`fuc.rebate.center`) }}</p>
          </div>
          <p><img src="@/assets/img/ntf/home/shop2.png" alt="" /></p>
        </li>
      </ul>
      <ul class="nav-enter-list justify-between els">
        <li
          class="els"
          @click="$router.push({ path: '/pages/wallet/onlineRecharge' })"
        >
          {{ $t(`deal_deposit`) }}
        </li>
        <li class="els" @click="$router.push({ path: '/wallet/withdraw' })">
          {{ $t(`dropdown.billing.income.withdraw.text`) }}
        </li>
        <li class="els" @click="$router.push({ path: '/pages/wallet/index' })">
          {{ $t("fuc.safe.text") }}
        </li>
      </ul>
    </div>
    <div
      class="game-hot"
      @click="$router.push({ name: `ItemShop`, query: { tab: 1 } })"
    >
      <div class="center-center hot-title p-t-8 text-center">
        <p>
          <img src="@/assets/img/ntf/home/rit.png" alt="" />
        </p>
        <ul class="trading m-l-8 m-r-8">
          <li class="els">{{ $t(`user.platform.trading`) }}</li>
          <li class="els">{{ $t(`user.platform.trading.desc`) }}</li>
        </ul>
        <p>
          <img src="@/assets/img/ntf/home/left.png" alt="" />
        </p>
      </div>
      <p class="center-center more color-active">
        {{ $t(`user.platform.more`) }}
        <van-icon class="m-l-4" name="arrow" />
      </p>
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
          <div class="b b-4 text-ellipsis center-center">+{{ item.money }}</div>
          <div class="b b-5 text-ellipsis center-center">
            <p class="text-ellipsis from-to">{{ item.from }}</p>
            /
            <p class="text-ellipsis from-to">{{ item.to }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="hot-live-stream">
      <div class="title-box flex-wrap">
        <div class="left flex-grow1">{{ $t(`Hot.Live.Stream`) }}</div>
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
      <div class="title">{{ $t(`Game.Download`) }}</div>
      <div class="list-box">
        <div class="list flex-wrap" v-for="i in 1" :key="i">
          <img
            src="https://hjduas.xyz/cafephim444585/index.jpg"
            alt=""
            class="img"
          />
          <div class="info-box flex-grow1 text-ellipsis">
            <div class="name text-ellipsis">League of Legends</div>
            <div class="des text-ellipsis">
              3D Multiplayer Online Battle Arena Game
            </div>
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
    <BtmActionLang ref="BtmActionLang" />
  </div>
</template>

<script>
import dayjs from "dayjs";
import userApi from "@/api/user";

export default {
  name: "HomeView",
  data() {
    return {
      sold: [],
      video: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    openLang() {
      this.$refs.BtmActionLang.open();
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
  },
  created() {
    this.$store.commit("setPdTop", false);
    this.informationDealSold();
    this.informationVideo();
  },
};
</script>
<style lang="less" scoped>
.nav {
  height: 46px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: var(--bg-body);
  .logo {
    width: 77px;
    position: relative;
    img {
      width: 34px;
      height: 34px;
    }
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      height: 18px;
      transform: translateY(-50%);
      right: 0;
      border: 1px solid transparent;
      border-image: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0),
          #888 52%,
          rgba(128, 128, 128, 0)
        )
        1;
    }
  }
  .lef-icon {
    img {
      height: 32px;
      width: 32px;
    }
  }
  .txt {
    font-size: 16px;
    font-weight: bold;
  }
}
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
  background: url("@/assets/img/ntf/home/shop.png") no-repeat;
  background-size: 100% 100%;
  height: 236px;
  position: relative;
  .vipLevel {
    color: #858585;
  }
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
    position: absolute;
    left: 0;
    right: 0;
    bottom: -16px;
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
.game-hot {
  width: 375px;
  height: 256px;
  background: url("@/assets/img/ntf/home/gamehot.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .hot-title {
    img {
      height: 24px;
      width: 24px;
    }
  }
  .trading {
    width: 158px;
  }
  .more {
    position: absolute;
    line-height: 1;
    right: 16px;
    top: 16px;
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
        background: url("@/assets/img/HomeView/dao-icon.png") no-repeat;
        width: 35px;
        height: 35px;
        background-size: 35px 35px;
        background-position: center;
      }
    }
  }
}
.hot-live-stream {
  margin-top: 28px;
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
      width: 240px;
      height: 128px;
      overflow: hidden;
      border-radius: 8px;
      background-color: #fff;
      img {
        width: 240px;
        height: 128px;
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
  margin-top: 25px;
  color: #e3e7ec;
  .title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 14px;
  }
  .list {
    padding-bottom: 21px;
    padding-top: 17px;
    border-top: 1px solid #020808;
    .img {
      width: 66px;
      height: 66px;
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
</style>
