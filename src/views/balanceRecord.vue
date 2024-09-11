<template>
  <div class="balanceRecord-page font12">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t('property.record.title')"
      :styleObj="{ backgroundColor: 'tra' }"
    ></AppTopBar>
    <!-- <ChoseNav @chosen="chosen" :cur="cur" :navs="navs" /> -->
    <ul class="drop-list p-l-12 p-r-12 justify-between align-center m-b-12">
      <li>
        <el-select v-model="cur" @change="chosen">
          <el-option
            v-for="item in navs"
            :key="item.key"
            :label="item.name"
            :value="item.key"
          >
          </el-option>
        </el-select>
      </li>
      <li>
        <el-select v-model="type" @change="chosen">
          <el-option
            v-for="item in dataArray.filter((item) => item.label !== 11)"
            :key="item.label"
            :label="item.value"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </li>
    </ul>
    <LoadList
      class="p-l-12 p-r-12"
      :onload="balanceChangeReq"
      :finished="finished"
    >
      <ChangeRecord v-if="video.length" :list="video" />
      <NoData v-else />
    </LoadList>
  </div>
</template>

<script>
import i18n from "@/locale";
import userApi from "@/api/user";
import ChangeRecord from "@/components/home/ChangeRecord.vue";
export default {
  name: "balanceRecordView",
  components: {
    ChangeRecord,
  },
  data() {
    return {
      dataArray: [
        { value: i18n.t("dropdown.billing.all.title.text"), label: 0 },
        { value: i18n.t("typeValue1"), label: 1 },
        { value: i18n.t("typeValue2"), label: 2 },
        { value: i18n.t("typeValue3"), label: 3 },
        { value: i18n.t("typeValue4"), label: 4 },
        { value: i18n.t("typeValue5"), label: 5 },
        { value: i18n.t("typeValue6"), label: 6 },
        { value: i18n.t("typeValue8"), label: 8 },
        { value: i18n.t("typeValue9"), label: 9 },

        { value: i18n.t("typeValue1"), label: 11 },

        { value: i18n.t("typeValue12"), label: 12 },
        { value: i18n.t("typeValue21"), label: 21 },
        { value: i18n.t("typeValue24"), label: 24 },
        { value: i18n.t("typeValue25"), label: 25 },
        { value: i18n.t("typeValue26"), label: 26 },
        { value: i18n.t("typeValue27"), label: 27 },
        { value: i18n.t("typeValue28"), label: 28 },
        { value: i18n.t("typeValue33"), label: 33 },
        { value: i18n.t("typeValue34"), label: 34 },
        { value: i18n.t("typeValue36"), label: 36 },
      ],
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
      type: 0,
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
    async chosen() {
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
        type: this.type,
      };
      if (params.type === 0) {
        delete params.type;
      }
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
.drop-list {
  height: 32px;
  border-bottom: 1px solid #484b4c;
  border-top: 1px solid #484b4c;
  .search {
    min-width: 74px;
    height: 18px;
    border-radius: 8px;
    background-color: var(--primary);
    color: #fff;
  }
}
</style>
