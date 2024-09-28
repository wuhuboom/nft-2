<template>
  <div class="bank-account-list color-primary font12">
    <AppTopBar
      :styleObj="{ backgroundColor: 'transparent' }"
      :topBarTitle="$t('security.bank.card.text')"
    >
    </AppTopBar>
    <div class="center-center px-16 py-16" v-if="loading">
      <van-loading class="color-primary" />
    </div>
    <div class="px-16 py-16" v-else>
      <div class="card-list d-flex">
        <ul
          class="bank flex-column justify-between p-x-24"
          v-for="(item, idx) in usdtList"
          :key="`${idx}-usdt`"
        >
          <li class="font-14">
            <p class="m-b-8">{{ item.protocol }}</p>
            <p>
              {{ $t("Creation time") }}
              {{ formatDate(item.createdAt, "yyyy-MM-dd") }}
            </p>
          </li>
          <li class="justify-between align-center">
            <p class="number">
              {{ item.addr | usdt_left_addr }} **** ****
              {{ item.addr | usdt_right_addr }}
            </p>
            <p>
              <i
                class="el-icon-edit"
                @click="
                  $router.push({ name: 'AddressUsdt', query: { id: item.id } })
                "
              ></i>
            </p>
          </li>
        </ul>
        <ul
          class="bank flex-column justify-between p-x-24"
          v-for="(item, idx) in bankList"
          :key="`${idx}-bank`"
        >
          <li class="font-14">
            <p class="m-b-8">{{ item.cardName }}</p>
            <p>
              {{ $t("Creation time") }}
              {{ formatDate(item.createdAt, "yyyy-MM-dd") }}
            </p>
          </li>
          <li class="justify-between align-center">
            <p class="number">
              {{ item.cardNumber | leftAddr }} **** ****
              {{ item.cardNumber | rightAddr }}
            </p>
            <p>
              <i
                class="el-icon-edit"
                @click="
                  $router.push({ name: 'AddBankCard', query: { id: item.id } })
                "
              ></i>
            </p>
          </li>
        </ul>

        <ul
          class="bank align-center"
          v-for="(item, idx) in wallwtList"
          :key="`${idx}-wallet`"
        >
          <li class="icon-box center-center"><img :src="udticon3" alt="" /></li>
          <li class="name flex-1 app-ellipsis">
            <p class="app-ellipsis name-title">
              {{ item.address | leftAddr }} **** ****
              {{ item.address | rightAddr }}
            </p>
            <p>{{ item.type }}{{ $t("wallet.list.wallet.text") }}</p>
          </li>
          <li class="rit">
            <i
              class="el-icon-edit active"
              @click="
                $router.push({ name: 'AddressWallet', query: { id: item.id } })
              "
            ></i>

            <p>{{ formatDate(item.createdAt, "yyyy-MM-dd") }}</p>
          </li>
        </ul>
      </div>

      <div class="types-list">
        <p
          class="bank-types"
          v-if="!(usdtList.length && bankList.length && wallwtList.length)"
        >
          {{ $t("bank.types") }}
        </p>
        <ul
          class="add-list align-center"
          v-if="!usdtList.length && listWay.find((item) => item.type === 2)"
          @click="$router.push({ name: 'AddressUsdt' })"
        >
          <li>
            <img class="d-img" src="@/assets/img/ntf/129379@3x.webp" alt="" />
          </li>
          <li>{{ $t("user.Add.usdt.Address") }}</li>
        </ul>
        <ul
          class="add-list align-center"
          v-if="!bankList.length && listWay.find((item) => item.type === 1)"
          @click="$router.push({ name: 'AddBankCard' })"
        >
          <li>
            <img class="d-img" src="@/assets/img/ntf/129379@3x.webp" alt="" />
          </li>
          <li>{{ $t("user.new.bank") }}</li>
        </ul>
        <ul
          class="add-list align-center"
          v-if="!wallwtList.length && listWay.find((item) => item.type === 4)"
          @click="$router.push({ name: 'AddressWallet' })"
        >
          <li>
            <img class="d-img" src="@/assets/img/ntf/129379@3x.webp" alt="" />
          </li>
          <li>{{ $t("user.Add.Wallet") }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import userApi from "@/api/user";
export default {
  name: "BankAccountlist",
  data() {
    return {
      udticon1: require("@/assets/img/udticon1.webp"),
      udticon2: require("@/assets/img/udticon2.webp"),
      udticon3: require("@/assets/img/udticon3.webp"),
      usdtList: [],
      bankList: [],
      wallwtList: [],
      listWay: [],
      loading: false,
    };
  },
  filters: {
    leftAddr(value) {
      return value.substr(0, 4);
    },
    rightAddr(value) {
      return value.substr(-3);
    },
    usdt_left_addr(value) {
      return value.substr(0, 5);
    },
    usdt_right_addr(value) {
      return value.substr(-4);
    },
  },
  methods: {
    async getEwalletData() {
      const [err, res] = await userApi.walletInfo();
      if (err) return;
      res.data = [
        {
          address: "12132",
          type: "ERC20",
          createdAt: 1627584000000,
        },
      ];
      if (res.data && !res.data.length) {
        // this.$router.push({ name: "AddressWallet" });
        return;
      }

      this.wallwtList = res.data;
    },
    async getBankList() {
      const [err, res] = await userApi.bankCardinfo();
      if (err) {
        return;
      }
      res.data = [
        {
          cardNumber: "12132",
          cardName: "中国银行",
          createdAt: 1627584000000,
        },
      ];
      if (res.data) {
        if (Array.isArray(res.data)) {
          this.bankList = res.data;
        } else {
          this.bankList = [res.data];
        }
      }
    },
    async getUsdtList() {
      const [err, res] = await userApi.usdtListReq();
      if (err) {
        return;
      }
      res.data = [
        {
          addr: "12132",
          protocol: "ERC20",
          createdAt: 1627584000000,
        },
      ];
      this.usdtList = res.data;
    },
  },
  async created() {
    this.getUsdtList();
    this.getBankList();
    this.getEwalletData();
    this.loading = true;
    const [err, res] = await userApi.withdrawalPre();
    this.loading = false;
    if (err) {
      return;
    }
    this.listWay = res.data;
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
.bank-account-list {
  .bank-types {
    font-size: 16px;
    font-weight: bold;
    padding: 16px 0;
  }
  .name-title {
    color: #fff;
  }
  .el-icon-edit {
    font-size: 16px;
    margin-bottom: 8px;
  }
  .card-list {
    overflow-x: auto;
    & > ul {
      margin-right: 12px;
      width: 290px;
      height: 153px;
      flex-shrink: 0;
      background: url("@/assets/img/ntf/bank.webp") no-repeat center center;
      background-size: 100% 100%;
      color: #f5f6f8;
      .number {
        font-size: 18px;
      }
      .el-icon-edit {
        font-size: 20px;
      }
    }
  }
  .add-list {
    height: 44px;
    border-radius: 7.5px;
    border: solid 1px #707070;
    justify-content: center;
    margin-bottom: 16px;
    img {
      width: 22px;
      height: 22px;
      margin-right: 8px;
    }
  }
  .bg-yellow {
    background-color: #f79e1b;
  }
  .bg-blue {
    background-color: #0022ff;
  }
}
</style>
