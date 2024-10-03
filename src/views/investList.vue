<template>
  <div class="InvestList-page font12 p-l-16 p-r-16">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t(`user.trade.title4.text`)"
    >
    </AppTopBar>
    <LoadList :onload="informationVideo" :finished="finished">
      <div class="p-t-16">
        <ul
          class="list p-x-12 justify-between align-center m-b-16"
          v-for="(item, index) in video"
          :key="index"
          @click="
            $router.push({
              name: 'InvestOrderDetail',
              query: { id: item.id },
            })
          "
        >
          <li>
            <p class="font14">{{ user.currencySymbol }}</p>
            <p class="m-t-4 prog">
              {{ getType2(item.status) }}
            </p>
            <p class="m-t-4 color-88">
              {{ date(item.createdAt) }}
            </p>
          </li>
          <li class="font14">
            <p class="color-green">{{ divide(item.money) }}</p>
            <p class="green m-t-8">+{{ divide(item.moneyIncome) }}</p>
          </li>
        </ul>
      </div>
      <NoData v-if="finished && !video.length" />
    </LoadList>
  </div>
</template>

<script>
import dayjs from "dayjs";
import userApi from "@/api/user";
import i18n from "@/locale";
export default {
  name: "investPlans",
  components: {},
  data() {
    return {
      finished: false,
      video: [],
      query: {
        pageNo: 1,
        pageSize: 30,
        time: 1,
        type: 2,
      },
      typeOptions2: [
        {
          label: i18n.t("invest.record.status0.text"),
          value: 0,
        },
        {
          label: i18n.t("invest.record.status1.text"),
          value: 1,
        },
        {
          label: i18n.t("invest.record.status2.text"),
          value: 2,
        },
        {
          label: i18n.t("take.it.now"),
          value: 3,
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    date(t) {
      return dayjs.unix(this.$ToSeconds(t)).format("YYYY-MM-DD HH:mm");
    },
    getType2(value) {
      let res = this.typeOptions2.find((item) => item.value == value);
      if (!res) return "";
      return res ? res.label : "";
    },
    async informationVideo(obj = {}) {
      const params = {
        ...this.query,
        ...obj,
      };
      const [err, res] = await userApi.investMy(params);
      if (err) {
        this.finished = true;
        return false;
      }
      this.finished = res.data.results.length < this.query.pageSize;
      //模拟 res.data.results 数据
      // res.data.results = [
      //   {
      //     id: 1,
      //     money: 100,
      //     moneyIncome: 10,
      //     status: 0,
      //     createdAt: 1626950400,
      //   },
      // ];
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
.InvestList-page {
  .color-88 {
    color: #808080;
  }
  .green {
    color: #caffde;
  }
  .list {
    border-radius: 9px;
    background-color: #17181c;
    & > li:last-child {
      text-align: right;
    }
  }
  .prog {
    padding: 0 4px;
    line-height: 1;
    height: 18px;
    line-height: 18px;
    border-radius: 3px;
    background-color: #004021;
    display: inline-block;
  }
  .caff {
    color: #caffde;
  }
}
</style>
