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
            v-for="item in dataArray.filter((item) => item.value !== 11)"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
        { value: 0, label: i18n.t("dropdown.billing.all.title.text") },
        { value: 1, label: i18n.t("typeValue1") },
        { value: 2, label: i18n.t("typeValue2") },
        { value: 3, label: i18n.t("typeValue3") },
        { value: 4, label: i18n.t("typeValue4") },
        { value: 5, label: i18n.t("typeValue5") },
        { value: 6, label: i18n.t("typeValue6") },
        { value: 8, label: i18n.t("typeValue8") },
        { value: 9, label: i18n.t("typeValue9") },
        { value: 11, label: i18n.t("typeValue1") },
        { value: 12, label: i18n.t("typeValue12") },
        { value: 21, label: i18n.t("typeValue21") },
        { value: 24, label: i18n.t("typeValue24") },
        { value: 25, label: i18n.t("typeValue25") },
        { value: 26, label: i18n.t("typeValue26") },
        { value: 27, label: i18n.t("typeValue27") },
        { value: 28, label: i18n.t("typeValue28") },
        { value: 33, label: i18n.t("typeValue33") },
        { value: 34, label: i18n.t("typeValue34") },
        { value: 36, label: i18n.t("typeValue36") },
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
