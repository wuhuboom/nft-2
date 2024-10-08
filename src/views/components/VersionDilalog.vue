<template>
  <van-dialog
    v-model="fromModal2"
    :showConfirmButton="false"
    :showCancelButton="false"
    :closeOnClickOverlay="true"
    class="linear-global-pop vers-global-pop"
  >
    <div class="common-dialog">
      <div class="cont full100 align-center flex-1">
        <ul class="update full100 flex-column center-center">
          <li class="update-text full100 p-l-16">
            <p>{{ $t("version.update") }}</p>
            <p>{{ $t("new.version.update") }}</p>
          </li>
          <li class="full100 p-t-24">
            <p
              class="btns ntf-vant-btn app-ellipsis"
              @click="simulateProgressBar"
              v-if="!progressBarState"
            >
              {{ $t(`update.now`) }}
            </p>
            <div v-else>
              <p class="m-b-20 center-center">{{ $t("Updating.wait") }}</p>
              <van-progress
                track-color="rgba(255, 255, 255, 0.25)"
                :show-pivot="false"
                color="#38ff7e"
                :percentage="progressBar"
                stroke-width="8"
              />
              <p class="p-text m-t-8">{{ `${parseInt(progressBar)}%` }}</p>
            </div>
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
    simulateProgressBar() {
      this.progressBarState = true;
      var duration = Math.floor(Math.random() * 6) + 5; // 生成5到10之间的随机秒数
      var increment = 100 / (duration * 10); // 计算每100毫秒增加的进度

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
.vers-global-pop {
  overflow: visible;
  width: 334px;
}
.common-dialog {
  padding: 0 25px;
  position: relative;
  font-size: 16px;
  color: #fff;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  .btns {
    font-size: 13px;
    height: 36px;
    border-radius: 10px;
    background-color: #fff;
    padding: 0 8px;
    line-height: 36px;
    text-align: center;
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
  .update-text {
    margin-bottom: 35px;
  }
  .sorck {
    width: 56px;
    display: block;
    height: 111px;
  }
  .update-text {
    padding-top: 48px;
    margin-top: -118px;
    width: 313px;
    height: 116px;
    background: url("@/assets/img/ntf3/form/130194@2x.webp") no-repeat center
      center;
    background-size: 100% 100%;
    & > p:first-child {
      font-size: 25px;
    }
    & > p:last-child {
      font-size: 14px;
    }
  }
  .p-text {
    text-align: right;
  }
}
</style>
