<template>
  <div class="balanceRecord-page font12 p-l-12 p-r-12">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t('property.record.title')"
      :styleObj="{ backgroundColor: 'tra' }"
    ></AppTopBar>
    <ChoseNav @chosen="chosen" :cur="cur" :navs="navs" />

    <LoadList :onload="balanceChangeReq" :finished="finished">
      <ChangeRecord v-if="video.length" :list="video" />
      <NoData v-else />
    </LoadList>
  </div>
</template>

<script>
import i18n from "@/locale";
import userApi from "@/api/user";
import ChangeRecord from "@/components/home/ChangeRecord.vue";
import ChoseNav from "@/components/global/ChoseNav.vue";
export default {
  name: "balanceRecordView",
  components: {
    ChangeRecord,
    ChoseNav,
  },
  data() {
    return {
      navs: [
        {
          name: i18n.t(`property.record.search.time1.text`),
          key: 1,
        },
        {
          name: i18n.t(`property.record.search.time2.text`),
          key: 2,
        },
        {
          name: i18n.t(`property.record.search.time3.text`),
          key: 3,
        },
      ],
      cur: 1,
      finished: false,
      video: [],
      query: {
        pageNo: 1,
        pageSize: 20,
      },
    };
  },
  methods: {
    async chosen(item) {
      this.cur = item.key;
      this,
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
        });
      await this.balanceChangeReq({
        pageNo: 1,
      });
      this.$toast.clear();
    },
    async balanceChangeReq(obj = {}) {
      const params = {
        ...this.query,
        ...obj,
        time: this.cur,
      };
      const [err, res] = await userApi.balanceChangeReq(params);
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
  mounted() {
    document.querySelector("body").classList.add("gray-bg-img");
  },
  destroyed() {
    document.querySelector("body").classList.remove("gray-bg-img");
  },
};
</script>
<style scoped lang="less">
.balanceRecord-page {
  .nvas {
    border-radius: 8.9px;
    background-color: #333335;
    & > li {
      height: 32px;
      border-radius: 8.9px;
    }
    & > li.bg-active {
      background-color: var(--main);
      color: #fff;
    }
  }
}
</style>
