<template>
  <div class="item-shop-page font12">
    <ul class="justify-between align-center p-x-16">
      <li class="username">
        <p class="align-center">
          Hi
          <span class="m-l-8">{{ user.username }}</span>
        </p>
        <p>Launch the Most Thrilling Top Matches</p>
      </li>
      <li
        class="notice no-shrink center-center"
        @click="$router.push({ name: 'Message' })"
      >
        <van-icon name="volume-o" :size="20" />
      </li>
    </ul>
    <ul class="justify-around align-center navs m-t-16 m-b-16 m-l-8 m-r-8">
      <li
        @click="chose(item)"
        :class="{ cur: current === item.key }"
        v-for="(item, i) in navs"
        :key="i"
        class="ellipsis"
      >
        {{ item.name }}
      </li>
    </ul>
    <itemContest v-if="current == 0" />
    <live :showTab="false" v-if="current == 1" />
    <itemTrade v-if="current == 2" />
  </div>
</template>

<script>
import live from "@/views/live";
import itemTrade from "@/views/itemTrade";
import itemContest from "@/views/itemContest.vue";
import i18n from "@/locale";
import userApi from "@/api/user";
export default {
  name: "ItemShop",
  components: {
    live,
    itemTrade,
    itemContest,
  },
  data() {
    return {
      current: +this.$route.query.tab || 0,
      navs: [
        {
          name: i18n.t(`user.Contest`),
          key: 0,
        },
        {
          name: i18n.t(`Game.Props`),
          key: 1,
        },
        {
          name: i18n.t(`tabar.bet`),
          key: 2,
        },
      ],
    };
  },
  methods: {
    chose(item) {
      //this.current = item.key;
      this.$router.replace({
        query: {
          tab: item.key,
        },
      });
    },
    async informationVideo(obj = {}) {
      const params = {
        ...this.query,
        ...obj,
      };
      const [err, res] = await userApi.informationVideo(params);
      if (err) {
        this.finished = true;
        return;
      }
      this.finished = res.data.results.length < this.query.pageSize;

      this.video =
        params.pageNo == 1
          ? res.data.results
          : this.video.concat(res.data.results);
      this.query.pageNo++;
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    this.$store.commit("setPdTop", false);
    console.log(this.$store.state.setPdTop);
  },
  mounted() {
    document.querySelector("body").classList.add("gray-bg-img");
  },
  destroyed() {
    document.querySelector("body").classList.remove("gray-bg-img");
  },
};
</script>
<style scoped lang="less">
.item-shop-page {
  ::v-deep .my-swipe {
    height: 168px;
  }
  .navs {
    border-bottom: 1px solid var(--main);
    & > li {
      width: 95px;
      text-align: center;
      height: 34px;
      line-height: 34px;
    }
    & > li.cur {
      background: var(--main);
      color: #fff;
    }
  }
  .notice {
    width: 47px;
    height: 47px;
    border-radius: 23.5px;
    border: solid 1px rgba(255, 255, 255, 0.05);
    ::v-deep {
      .van-icon-volume-o {
        transform: rotate(90deg);
      }
    }
  }
  .username {
    font-weight: bold;
    & > p:first-child {
      font-size: 30px;
    }
    & > p:last-child {
      color: rgba(255, 255, 255, 0.6);
    }
  }
}
</style>
