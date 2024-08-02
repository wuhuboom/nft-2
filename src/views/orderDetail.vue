<template>
  <div class="InvestMyDetail-page font12 p-l-16 p-r-16">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t(`invoice.menu3.text`)"
      :styleObj="{ backgroundColor: 'tra' }"
    >
    </AppTopBar>
  </div>
</template>

<script>
import dayjs from "dayjs";
import userApi from "@/api/user";
import i18n from "@/locale";
export default {
  name: "InvestMyDetail",
  components: {},
  data() {
    return {
      finished: false,
      detail: [],
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
      return res ? res.label : "";
    },
    async investMyDetail() {
      let [err, res] = await userApi.investMyDetail({
        id: this.$route.query.id,
      });
      if (err) {
        return;
      }
      this.detail = res.data;
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
.InvestMyDetail-page {
}
</style>
