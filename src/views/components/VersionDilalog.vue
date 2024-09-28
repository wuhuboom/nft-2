<template>
  <van-dialog
    class="VersionDilalog"
    v-model="fromModal2"
    :showConfirmButton="false"
    :showCancelButton="false"
    :closeOnClickOverlay="false"
    @close="close"
  >
    <div class="common-dialog">
      <p class="center-center"><i class="iconfont icon-jingti-copy"></i></p>
      <van-icon name="cross" @click="fromModal2 = false" class="cross" />
      <div class="cont align-center flex-1">
        <ul class="update flex-column center-center">
          <li class="update-text">{{ $t("version.update") }}</li>
          <li class="">
            <p
              class="btns app-ellipsis center-center"
              @click="simulateProgressBar"
              v-if="!progressBarState"
            >
              {{ $t(`update.now`) }}
            </p>
            <van-progress
              v-else
              track-color="rgba(255, 255, 255, 0.25)"
              :show-pivot="false"
              color="#f5673d"
              :percentage="progressBar"
              stroke-width="8"
            />
          </li>
        </ul>
      </div>
    </div>
  </van-dialog>
</template>

<script>
import userApi from "@/api/user";
import auth from "@/plugins/auth";
export default {
  name: "VersionDilalog",
  data() {
    return {
      version: "",
      progressBarState: false,
      fromModal2: false,
      progressBar: 0,
      key: "storageVersion",
    };
  },
  methods: {
    close() {
      this.interval && clearInterval(this.interval);
    },
    simulateProgressBar() {
      this.progressBarState = true;
      var duration = Math.floor(Math.random() * 6) + 5;
      var increment = 100 / (duration * 10);

      var progress = 0;

      this.interval = setInterval(() => {
        progress += increment;
        this.progressBar = progress;
        if (progress >= 100) {
          console.log("done");
          auth.setToken(this.version, this.key);
          location.reload();
          clearInterval(this.interval);
        }
      }, 100);
    },
    isNumber(val) {
      return typeof val === "number" && !isNaN(val);
    },
    async getVersion() {
      const [err] = await userApi.versionReq();
      if (!this.isNumber(+err)) {
        return;
      }
      const res = +err;
      console.log(this.version, this.key);
      let storageVersion = auth.getToken(this.key);
      if (storageVersion && storageVersion != res) {
        this.fromModal2 = true;
        this.version = res;
      } else {
        auth.setToken(res, this.key);
      }
    },
  },
  created() {
    this.getVersion();
  },
  beforeDestroy() {
    this.interval && clearInterval(this.interval);
  },
};
</script>
<style lang="less" scoped>
.cross {
  position: absolute;
  top: 8px;
  right: 8px;
  opacity: 0.9;
}
.van-progress {
  width: 188px;
}
.VersionDilalog {
  width: 270px;
  height: 136px;
  border-radius: 14px;
  border: solid 1px rgba(0, 0, 0, 0);
  background-image: linear-gradient(to bottom, #1f2430, #151515);
}
.common-dialog {
  position: relative;
  font-size: 16px;

  color: #fff;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  .btns {
    font-size: 13px;
    color: #222;
    width: 202px;
    height: 33px;
    border-radius: 12px;
    box-shadow: 0 3px 6px 0 #5a3e01;
    background-color: #f5673e;
    padding: 0 8px;
    line-height: 36px;
    text-align: center;
    color: #fff;
  }
  .close {
    position: absolute;
    right: 15px;
    top: 13px;
    font-size: 12px;
    height: 24px;
    width: 24px;
    border-radius: 12px;
    background-color: rgba(0, 0, 0, 0.55);
  }
  .cont {
    height: 152px;
  }
  .update {
    width: 100%;
    height: 100%;
  }
  .update-text {
    margin-bottom: 24px;
    color: rgba(255, 255, 255, 0.8);
  }
  .sorck {
    width: 56px;
    display: block;
    height: 111px;
  }
}
</style>
