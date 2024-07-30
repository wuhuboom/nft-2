<template>
  <div class="game-tools-page">
    <div class="head">
      <div class="content-box">
        <div class="list flex-wrap">
          <div class="b b-1 center-center">
            <p class="els">{{ $t(`Date.Time`) }}</p>
          </div>
          <div class="b b-2 text-ellipsis center-center">
            <p class="els">{{ $t(`user.Game`) }}</p>
          </div>
          <div class="b b-3 text-ellipsis center-center">
            <p class="text-ellipsis">{{ $t(`user.Game.thing`) }}</p>
          </div>
          <div class="b b-4 text-ellipsis center-center">
            <p class="els">{{ $t(`rebate.center.list.nav.smount.text`) }}</p>
          </div>
          <div class="b b-5 text-ellipsis center-center">
            <p class="text-ellipsis from-to">{{ $t(`From.Arrive`) }}</p>
          </div>
        </div>
      </div>
    </div>
    <LoadList :onload="informationVideo" :finished="finished">
      <div class="content-box">
        <div class="list flex-wrap" v-for="(item, i) in video" :key="i">
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
    </LoadList>
  </div>
</template>

<script>
import dayjs from "dayjs";
import userApi from "@/api/user";
export default {
  name: "ItemGame",
  data() {
    return {
      finished: false,
      video: [],
      query: {
        pageNo: 1,
        pageSize: 20,
      },
    };
  },
  methods: {
    date(item) {
      return dayjs
        .unix(this.$ToSeconds(item.createTime))
        .format("YYYY-MM-DD HH:mm");
    },
    async informationVideo(obj = {}) {
      const params = {
        ...this.query,
        ...obj,
      };
      const [err, res] = await userApi.informationDealSold(params);
      if (err) {
        this.finished = true;
        return false;
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
.game-tools-page {
  ::v-deep {
    .app-top-black-title {
      color: #fff !important;
    }
  }
  .content-box {
    color: #e3e7ec;
    position: relative;
    text-align: center;
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
      & > div {
        width: 25% !important;
        text-align: center;
      }
    }
  }
  .head {
    .content-box {
      &,
      .b-4 {
        color: #808080;
      }
      border-radius: 8px 8px 0 0;
      background-image: radial-gradient(
        circle at 11% 8%,
        rgba(255, 255, 255, 0.3),
        rgba(255, 255, 255, 0.03) 137%
      );
    }
  }
}
</style>
