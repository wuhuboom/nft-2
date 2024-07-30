<template>
  <div class="game-tools-page">
    <LoadList :onload="informationVideo" :finished="finished">
      <div class="list-box">
        <div class="list" v-for="(item, i) in video" :key="i">
          <div class="img-box">
            <img class="d-img" :src="item.image" alt="" />
          </div>
          <div class="name els m-t-8">
            {{ item.title }}
          </div>
          <p class="m-t-8 blob money">{{ item.money }}</p>
        </div>
      </div>
    </LoadList>
  </div>
</template>

<script>
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
    async informationVideo(obj = {}) {
      const params = {
        ...this.query,
        ...obj,
      };
      const [err, res] = await userApi.informationDeal(params);
      if (err) return;
      this.finished = res.data.results.length < this.query.pageSize;
      this.query.pageNo++;
      this.video =
        params.pageNo == 1
          ? res.data.results
          : this.video.concat(res.data.results);
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
  .list-box {
    margin-top: 14px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0 8px;
    .money {
      color: var(--main);
    }
    .list {
      margin-bottom: 20px;
      padding: 0 8px;
      width: 50%;
      .img-box {
        width: 100%;
        height: 133px;
        background: #fff;
        overflow: hidden;
      }
      .name {
        color: #fff;
        font-size: 12px;
      }
    }
  }
}
</style>
