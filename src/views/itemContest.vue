<template>
  <div class="item-contest-page">
    <ul class="align-center navs">
      <li
        class="els"
        :class="{ cur: status == item.key }"
        v-for="(item, i) in navs"
        @click="chosen(item)"
        :key="i"
      >
        {{ item.name }}
      </li>
    </ul>

    <LoadList :onload="informationGame" :finished="finished">
      <div class="p-l-16 p-r-16 p-t-16">
        <div
          v-for="(item, i) in video"
          :key="i"
          class="contest-item m-b-8 align-center justify-between p-r-16"
        >
          <ul class="time">
            <li v-if="item.startTime">
              {{ date(item.startTime) }}
            </li>
            <li v-if="item.endTime">
              {{ date(item.endTime) }}
            </li>
          </ul>
          <ul class="cont flex-1">
            <li class="align-center main-macth justify-between p-b-8">
              <p class="align-center">
                <span class="pic m-r-8"
                  ><img class="d-img" :src="item.mainImg"
                /></span>
                {{ item.main }}
              </p>
              <p>{{ item.scorea }}</p>
            </li>
            <li class="align-center justify-between p-t-8">
              <p class="align-center">
                <span class="pic m-r-8"
                  ><img class="d-img" :src="item.guestImg"
                /></span>
                {{ item.guest }}
              </p>
              <p>{{ item.scoreb }}</p>
            </li>
          </ul>
        </div>
      </div>
    </LoadList>
  </div>
</template>

<script>
import userApi from "@/api/user";
import i18n from "@/locale";
import dayjs from "dayjs";
export default {
  name: "itemContest",
  data() {
    return {
      finished: false,
      video: [],
      status: 0,
      navs: [
        {
          name: i18n.t("About.to.start"),
          key: 0,
        },
        {
          name: i18n.t(`user.in.progress`),
          key: 1,
        },
        {
          name: i18n.t("user.over"),
          key: 2,
        },
      ],
      query: {
        pageNo: 1,
        pageSize: 20,
      },
    };
  },
  methods: {
    date(tiem) {
      return dayjs.unix(this.$ToSeconds(tiem)).format("MM-DD HH:mm");
    },
    async chosen(item) {
      this.status = item.key;
      this.$toast.loading();
      await this.informationGame({
        pageNo: 1,
      });
      this.$toast.clear();
    },
    async informationGame(obj = {}) {
      Object.assign(this.query, {
        status: this.status,
        ...obj,
      });
      const [err, res] = await userApi.informationGame(this.query);
      if (err) return;
      this.finished = res.data.results.length < this.query.pageSize;

      this.video =
        this.query.pageNo == 1
          ? res.data.results
          : this.video.concat(res.data.results);
      this.query.pageNo++;
    },
  },
};
</script>
<style scoped lang="less">
.item-contest-page {
  .navs {
    & > li {
      height: 46px;
      line-height: 46px;
      width: 33.33%;
      text-align: center;
      position: relative;
    }
    .cur::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px; /* 边框的高度 */
      background-color: var(--main);
    }
    border-radius: 8px 8px 0 0;
    background-image: radial-gradient(
      circle at 11% 8%,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.03) 137%
    );
  }
  .contest-item {
    height: 83px;
    background: url("@/assets/img/ntf/conte.webp") no-repeat center center;
    background-size: 100% 100%;
  }
  .cont {
    .pic {
      height: 22px;
      width: 22px;
    }
  }
  .time {
    width: 84px;
    text-align: center;
    & > li {
      margin: 3px 0;
    }
  }
}
.main-macth {
  position: relative;
  ::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.7px;
    background-image: linear-gradient(
      to right,
      rgba(36, 32, 33, 0) -19%,
      #464646 99%
    );
  }
}
</style>
