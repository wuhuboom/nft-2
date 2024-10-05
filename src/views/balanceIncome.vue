<template>
  <div class="balanceRecord-page font12 p-l-12 p-r-12">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t('Team.benefits')"
      :styleObj="{ backgroundColor: 'tra' }"
    ></AppTopBar>
    <ChoseNav @chosen="chosen" :cur="cur" :navs="navs" />
    <div v-if="cur === 1">
      <div class="m-t-16 record-head font12 p-x-16 m-b-16">
        <div class="friends">
          <ul class="justify-between align-center m-b-16">
            <li>{{ $t("income.team.people") }}</li>
            <li class="font14 blod color-fff bold">
              {{ income.friendsCount }}
            </li>
          </ul>
          <ul class="justify-between align-center m-t-16">
            <li>{{ $t("agency.center.teambalance.text") }}</li>
            <li class="font14 blod color-fff bold">
              {{ divide(income.friendsBalance) }}
            </li>
          </ul>
        </div>
      </div>
      <ul
        v-for="(item, idx) in ranks"
        :key="idx"
        class="grade m-b-12 p-l-8 p-r-8 p-t-16 p-b-16"
      >
        <li class="justify-between my-first align-center p-b-16">
          <p class="align-center">
            <span
              ><img class="d-img person m-r-8" :src="icons[idx]" alt=""
            /></span>
            <span>Grade: lv.{{ idx + 1 }}</span>
          </p>
          <p class="align-center">
            <van-icon size="20" name="manager-o" />
            <span class="color-fff m-l-4">{{ item.friendsCount }}</span>
          </p>
        </li>
        <!-- <li class="m-t-16">
          {{ $t("today.reg.num") }}：{{ item.todayReg || 0 }}
        </li> -->
        <li class="justify-between align-center m-t-16">
          <p>{{ $t("today.reg.num") }}：{{ item.todayReg || 0 }}</p>
          <p>{{ $t("rechargeNum.Enough") }}：{{ item.todayInvest }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <div class="m-t-16 record-head font12 p-x-16 m-b-16">
        <div class="friends">
          <ul class="justify-between align-center m-b-16">
            <li>{{ $t("invest.record.col2.text") }}</li>
            <li class="font14 blod color-fff bold">
              {{ divide(myIncome.total) }}
            </li>
          </ul>
          <ul class="justify-between align-center m-t-16">
            <li>{{ $t("income.team.level.cur") }}</li>
            <li class="font14 blod color-fff bold">
              {{ divide(myIncome.today) }}
            </li>
          </ul>
        </div>
      </div>
      <!-- <div>
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
      </div> -->
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
        require("@/assets/img/ntf3/user/126927@2x.png"),
        require("@/assets/img/ntf3/user/126927-2@2x.png"),
        require("@/assets/img/ntf3/user/126927-3@2x.png"),
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
    border-radius: 10px;
    border: solid 2px rgba(106, 224, 195, 0.5);
    background-image: linear-gradient(to bottom, #242a3b, #273b40);
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
  .record-head {
    background-color: #17181c;
    border-radius: 20px;
    position: relative;
    //1px 定位居中
    &::after {
      content: "";
      display: block;
      height: 1px;
      top: 50%;
      transform: translateY(-50%);
      background-color: #242b36;
      position: absolute;
      left: 16px;
      right: 16px;
    }
  }
  .friends {
    & > ul {
      color: #9db1cd;
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
}
</style>
