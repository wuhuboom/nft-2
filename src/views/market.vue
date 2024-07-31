<template>
  <div class="invest-plans-page font12 p-l-16 p-r-16">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t(`investment`)"
      :styleObj="{ backgroundColor: 'tra' }"
    ></AppTopBar>
    <div class="plans" v-for="(item, idx) in records" :key="idx">
      <div
        class="plans-item m-b-16"
        v-for="(doc, index) in item.rateConfig"
        :key="index"
      >
        <div class="align-center">
          <p class="invest-pic no-shrink m-r-8">
            <img class="d-img" :src="doc.header" alt="" />
          </p>
          <ul class="align-center flex-1 space-between">
            <li>
              <p class="font16 m-b-8">{{ doc.name }}</p>
              <p class="days">
                {{ doc.days }}
                {{
                  doc.days == 1 ? $t(`safe.one.days`) : $t(`safe.invite.days`)
                }}
              </p>
            </li>
            <li class="rate-row">
              <p class="font16 rate color-active m-b-8">{{ doc.rate }}%</p>
              <p class="gray">{{ $t(`rate.of.return`) }}</p>
            </li>
          </ul>
        </div>
        <div>
          <van-progress class="m-t-16 m-b-8" :percentage="item.curr" />
          <ul class="justify-between align-center">
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import i18n from "@/locale";
import userApi from "@/api/user";
export default {
  name: "investPlans",
  components: {},
  data() {
    return {
      records: {},
    };
  },
  methods: {
    async investPlans() {
      const [err, res] = await userApi.investPlans(this.$route.query.id);
      if (err) return;
      this.records = res.data || [];
      this.records = this.records.map((item) => {
        if (typeof item.rateConfig == "string") {
          item.rateConfig = JSON.parse(item.rateConfig);
          item.rateConfig = item.rateConfig.filter(
            (v) => !(parseInt(v.show) === 0)
          );
        }
        item.close = false;
        return item;
      });
      this.records = this.records.filter((v) => v.rateConfig.length);
    },
  },
  created() {
    this.investPlans();
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
.invest-plans-page {
  .gray {
    color: #cacbce;
  }
  .plans-item {
    border-radius: 14px;
    border: solid 1px #292929;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 24px 8px;
    min-width: 42px;
    .rate-row {
      text-align: right;
    }
    .days {
      height: 18px;
      line-height: 18px;
      padding: 0 10px;
      border-radius: 3px;
      background-color: #bcff2f;
      color: #000;
      display: inline-block;
    }
    .invest-pic {
      height: 20px;
      width: 20px;
      border-radius: 10px;
      overflow: hidden;
    }
  }
}
</style>
