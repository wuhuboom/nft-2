<template>
  <div class="live-page">
    <AppTopBar
      v-if="showTab"
      :titleClass="['app-top-black-title']"
      topBarTitle="Live"
      :styleObj="{
        backgroundColor: '#000',
        color: 'red',
      }"
    ></AppTopBar>
    <LoadList :onload="informationVideo" :finished="finished">
      <div class="list-box">
        <div
          class="list"
          @click="viewVideo(item)"
          v-for="(item, i) in video"
          :key="i"
        >
          <div class="img-box">
            <img :src="item.imageUrl" alt="" />
          </div>
          <div class="name app-multi-ellipsis--l2">
            {{ item.title }}
          </div>
        </div>
      </div>
    </LoadList>
  </div>
</template>

<script>
import userApi from "@/api/user";
export default {
  name: "LiveView",
  props: {
    showTab: {
      type: Boolean,
      default: true,
    },
  },
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
    viewVideo(v) {
      //location.href =v.videoUrl
      window.open(v.videoUrl);
    },
    async informationVideo(obj = {}) {
      const params = {
        ...this.query,
        ...obj,
      };
      const [err, res] = await userApi.informationVideo(params);
      if (err) return;
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
.live-page {
  ::v-deep {
    .app-top-black-title {
      color: #fff !important;
    }
  }
  .list-box {
    margin-top: 14px;
    .list {
      margin: 0 auto;
      margin-bottom: 20px;
      width: 343px;
      .img-box {
        width: 343px;
        height: 185.4px;
        border-radius: 10px;
        background: #fff;
        overflow: hidden;
        img {
          width: 343px;
          height: 185.4px;
        }
      }
      .name {
        color: #fff;
        margin-top: 11px;
        font-size: 12px;
      }
    }
  }
}
</style>
