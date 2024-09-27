<template>
  <div class="fr-page font12 color-primary">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t('backapi.self.safe.bill.detail.text')"
      :styleObj="{ backgroundColor: 'tra' }"
    ></AppTopBar>
    <ul class="p-l-8 head justify-around align-center">
      <li class="align-center" v-for="(item, idx) in tabsList" :key="idx">
        <i
          class="doc m-r-8"
          :style="{
            backgroundColor: item.color,
          }"
        ></i>
        {{ item.name }}
      </li>
    </ul>
    <div class="p-l-12 p-r-12">
      <ul class="justify-between align-center art">
        <li>{{ $t("detail.live.4") }}</li>
        <li>{{ $t("detail.live.5") }}</li>
      </ul>
      <ul>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";
import i18n from "@/locale";
export default {
  name: "FriendsList",
  components: {},
  data() {
    return {
      tabsList: [
        {
          name: i18n.t("detail.live.1"),
          value: 1,
          color: "#48d513",
        },
        {
          name: i18n.t("detail.live.2"),
          value: 2,
          color: "#ff0000",
        },
        {
          name: i18n.t("detail.live.3"),
          value: 3,
          color: "#a7a7a7",
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
    async getStatissticsData() {
      const [err1, res1] = await userApi.investMyFriendsList(
        {
          time: this.tabCurrent,
          key: "first",
        },
        1
      );
      if (err1) return;
      this.cumulativeActivity = res1.data.cumulativeActivity;
      this.totalBalance = res1.data.totalBalance;
      this.playerCount = res1.data.playerCount;
      this.newPlayer = res1.data.newPlayer;
      this.teamGroupUnAim = res1.data.groupUnAim;
      this.playerActive = res1.data.playerActive;
      const [err2, res2] = await userApi.dataCenter(
        {
          time: this.tabCurrent,
          key: res1.data.key,
        },
        2
      );
      if (err2) return;
      this.totalRecharge = res2.data.totalRecharge;
      const [err3, res3] = await userApi.dataCenter(
        {
          time: this.tabCurrent,
          key: res2.data.key,
        },
        3
      );
      if (err3) return;
      this.totalWithdrawal = res3.data.totalWithdrawal;
      const [err4, res4] = await userApi.dataCenter(
        {
          time: this.tabCurrent,
          key: res3.data.key,
        },
        4
      );
      if (err4) return;
      this.netProfit = res4.data.netProfit;
      this.totalBetBalance = res4.data.totalBetBalance;
      this.totalBetPlayer = res4.data.totalBetPlayer;
      this.cumulativeWinning = res4.data.cumulativeWinning;
      const [err5, res5] = await userApi.dataCenter(
        {
          time: this.tabCurrent,
          key: res4.data.key,
        },
        5
      );
      if (err5) return;
      this.teamGroupAim = res5.data.groupAim;
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
.head {
  height: 32px;
  background-color: #333335;
  i {
    width: 10px;
    height: 10px;
    border-radius: 5px;
  }
}
.art {
  height: 32px;
}
</style>
