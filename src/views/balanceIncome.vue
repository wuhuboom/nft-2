<template>
  <div class="balanceRecord-page font12 p-l-12 p-r-12">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t('Team.benefits')"
    ></AppTopBar>
    <ChoseNav @chosen="chosen" :cur="cur" :navs="navs" />
    <div v-if="cur === 1">
      <div class="m-t-16 font12 bg-fff-o-1 p-x-16 m-b-16">
        <div class="friends">
          <ul>
            <li class="font14 blod color-fff">
              {{ income.friendsCount }}
            </li>
            <li class="m-t-8">{{ $t("income.team.people") }}</li>
          </ul>
          <ul class="m-t-16">
            <li class="font14 blod color-fff">
              {{ divide(income.friendsBalance) }}
            </li>
            <li class="m-t-8">{{ $t("agency.center.teambalance.text") }}</li>
          </ul>
        </div>
      </div>
      <ul
        v-for="(item, idx) in ranks"
        :key="idx"
        class="grade m-b-12 p-l-8 p-r-8 p-t-16 p-b-16"
      >
        <li class="justify-between my-first align-center p-b-16">
          <div class="align-center">
            <span class="m-r-8"
              ><img class="d-img person" :src="icons[idx]" alt=""
            /></span>
            <div>
              <span class="font14 blod">Grade: lv.{{ idx + 1 }}</span>
              <p class="align-center" style="margin-top: 2px">
                <van-icon name="contact" size="14" />

                <span class="color-fff m-l-4 font14 blod">{{
                  item.friendsCount
                }}</span>
              </p>
            </div>
          </div>
          <p
            class="center-center p-x-4 bill-detail"
            @click="
              $router.push({
                name: 'FriendsList',
                query: { level: idx + 1 },
              })
            "
          >
            {{ $t("backapi.self.safe.bill.detail.text") }}
          </p>
        </li>
        <li class="justify-between align-center m-t-16">
          <p>
            <span class="bgray"> {{ $t("today.reg.num") }}：</span>
            <span class="font14 blod">{{ item.todayReg || 0 }}</span>
          </p>
          <p>
            <span class="bgray"> {{ $t("rechargeNum.Enough") }}：</span>
            <span class="font14 blod">{{ item.todayInvest }}</span>
          </p>
        </li>
      </ul>
    </div>
    <div v-else class="m-t-40">
      <ul class="my-incom center-center flex-column">
        <li class="m-b-16 gray">{{ $t("invest.record.col2.text") }}</li>
        <li class="center-center m-b-32">
          <p><img class="d-img" src="@/assets/img/ntf/rmb.webp" alt="" /></p>
          <p class="my-total bold">{{ divide(myIncome.total) }}</p>
        </li>
      </ul>
      <ul class="m-b-4 d-flex frends-list frends-content">
        <li style="width: 50%" class="p-l-16">
          {{ $t("income.team.level.cur") }}
        </li>
        <li class="p-r-16" style="width: 50%; text-align: right">
          {{ divide(myIncome.today) }}
        </li>
      </ul>
      <div>
        <ul class="m-b-16 d-flex gray frends-list m-t-24 m-b-16">
          <li>{{ $t(`myfriends.list.col4.text`) }}</li>
          <li>
            {{ $t("income.team.level.cur") }}
          </li>
        </ul>
        <ul
          class="m-b-4 d-flex frends-list frends-content"
          v-for="(item, idx) in myStatis"
          :key="idx"
        >
          <li class="p-l-16">{{ date(item.time) }}</li>
          <li>{{ divide(item.total) }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import i18n from "@/locale";
import userApi from "@/api/user";
import ChoseNav from "@/components/global/ChoseNav.vue";
export default {
  name: "balanceRecordView",
  components: {
    ChoseNav,
  },
  data() {
    return {
      income: {},
      icons: [
        require("@/assets/img/HomeView/126927-3@2x.png"),
        require("@/assets/img/HomeView/126927-2@2x.png"),
        require("@/assets/img/HomeView/126927@2x.png"),
      ],
      navs: [
        {
          name: i18n.t("income.tab.team"),
          key: 1,
        },
        {
          name: i18n.t("income.tab.person"),
          key: 2,
        },
      ],
      data: [],
      head: [
        i18n.t("Friend.count"),
        i18n.t("income.team.level.count"),
        i18n.t("income.team.level.cur"),
      ],
      ranks: [],
      cur: 1,
      myIncome: {},
      myStatis: [],
    };
  },
  methods: {
    date(tiem) {
      return dayjs.unix(this.$ToSeconds(tiem)).format("YY-MM-DD");
    },
    chosen(item) {
      this.cur = item.key;
    },
    async investFriendsStatis() {
      const [err, res] = await userApi.investFriendsStatis();
      if (err) {
        return;
      }
      const { times, values } = res.data;
      this.data = times.map((v, idx) => {
        return {
          total: values[idx],
          time: v,
        };
      });
    },
    async investMyStatisFriendsThree() {
      const [err, res] = await userApi.investMyStatisFriendsThree2();
      if (err) {
        return;
      }
      this.ranks = res.data;
    },
    async investMyStatisFriends() {
      const [err, res] = await userApi.investMyStatisFriends2();
      if (err) {
        return;
      }
      this.income = res.data;
    },
    async investMyStatisReq() {
      const [err, res] = await userApi.myStatis2();
      if (err) {
        return;
      }
      this.myIncome = res.data;
    },
    async investMyStatisPost() {
      const [err, res] = await userApi.investMyStatisPost();
      if (err) {
        return;
      }
      const { times, values } = res.data;
      this.myStatis = times.map((v, idx) => {
        return {
          total: values[idx],
          time: v,
        };
      });
    },
    tab2() {
      this.investMyStatisReq();
      this.investMyStatisPost();
    },
    tab1() {
      this.investMyStatisFriends();
      this.investMyStatisFriendsThree();
      this.investFriendsStatis();
    },
  },
  created() {
    this.tab1();
    this.tab2();
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
  .grade {
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.1);
    .my-first {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
  .person {
    height: 45px;
    width: 45px;
  }
  .gray {
    color: rgba(235, 235, 245, 0.6);
  }
  .frends-list {
    text-align: center;
    & > li:nth-child(1) {
      text-align: left;
    }
    & > li:nth-child(3) {
      text-align: right;
    }
    & > li {
      width: 33.3333%;
    }
  }
  .frends-content {
    border-radius: 4px;
    height: 38px;
    line-height: 38px;
    background-color: rgba(255, 255, 255, 0.1);
  }
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
  .friends {
    & > ul:nth-child(1) {
      color: #f79841;
    }
    & > ul:nth-child(2) {
      color: #6f72e2;
    }
    & > ul:nth-child(3) {
      color: #84cb69;
    }
  }
  .my-incom {
    img {
      width: 40px;
      height: 40px;
    }
    .my-total {
      font-size: 40px;
    }
  }
  .bill-detail {
    min-width: 63px;
    height: 29px;
    border-radius: 14.5px;
    border: solid 1px rgba(157, 157, 157, 0.09);
    background-color: #4b4b4b;
  }
  .bgray {
    color: #ebebf5;
  }
}
</style>
