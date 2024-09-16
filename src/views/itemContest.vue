<template>
  <div class="item-contest-page">
    <div class="p-l-4 p-r-4">
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
    </div>
    <LoadList :onload="informationGame" :finished="finished">
      <div class="p-l-16 p-r-16 p-t-16">
        <div
          v-for="(item, i) in video"
          :key="i"
          class="contest-item m-b-8 align-center justify-between p-x-8"
        >
          <ul class="time no-shrink">
            <li v-if="item.startTime">
              {{ date(item.startTime) }}
            </li>
            <li v-if="item.endTime">
              {{ date(item.endTime) }}
            </li>
          </ul>
          <ul class="teem-logo center-center m-r-8">
            <li class="center-center">
              <img class="d-img" :src="item.mainImg" />
            </li>
            <li class="center-center">
              <img class="d-img" :src="item.guestImg" />
            </li>
          </ul>
          <ul class="cont flex-1">
            <li class="align-center main-macth justify-between p-4-8">
              <p class="els">
                {{ item.main }}
              </p>
              <p class="active">{{ item.scorea }}</p>
            </li>
            <li class="align-center justify-between p-t-4">
              <p class="els">
                {{ item.guest }}
              </p>
              <p class="active">{{ item.scoreb }}</p>
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
      height: 38px;
      line-height: 38px;
      border-radius: 19px;
      border: solid 1px rgba(255, 255, 255, 0.05);
      width: 33.33%;
      text-align: center;
      position: relative;
      margin: 0 4px;
    }
    .cur {
      border: 1px solid var(--main);
      background: #fff;
      color: #000;
    }
  }
  .contest-item {
    height: 64px;
    border-radius: 12px;
    background-color: #161616;
  }
  .teem-logo {
    & > li {
      overflow: hidden;
      height: 50px;
      width: 50px;
      border-radius: 25px;
      background-color: #211f21;
      border: solid 1px rgba(255, 255, 255, 0.05);
      img {
        height: 22px;
        width: 22px;
      }
    }
    & > li:first-child {
      position: relative;
      z-index: 2;
    }
    & > li:last-child {
      margin-left: -16px;
    }
  }
  .cont {
    overflow: hidden;
    & > li {
      overflow: hidden;
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
}
</style>
