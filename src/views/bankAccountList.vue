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
      <p v-if="usdtList.length" class="caff m-b-8">
        {{ $t("withdraw.record.center.show.detail.usdt.bank.text") }}
      </p>
      <ul
        class="bank align-center"
        v-for="(item, idx) in usdtList"
        :key="`${idx}-usdt`"
      >
        <li class="icon-box center-center"><img :src="udticon1" alt="" /></li>
        <li class="name flex-1 app-ellipsis">
          <p class="app-ellipsis name-title">
            {{ item.addr | usdt_left_addr }} **** ****
            {{ item.addr | usdt_right_addr }}
          </p>
          <p class="gary">{{ item.protocol }}</p>
        </li>
        <li class="rit gary">
          <i
            class="el-icon-edit"
            @click="
              $router.push({ name: 'AddressUsdt', query: { id: item.id } })
            "
          ></i>

          <p class="">{{ formatDate(item.createdAt, "yyyy-MM-dd") }}</p>
        </li>
      </ul>
      <p v-if="bankList.length" class="caff m-b-8 m-t-12">
        {{ $t("withdraw.record.center.show.detail.type.bank.text") }}
      </p>
      <ul
        class="bank align-center"
        v-for="(item, idx) in bankList"
        :key="`${idx}-bank`"
      >
        <li class="icon-box center-center"><img :src="udticon2" alt="" /></li>
        <li class="name flex-1 app-ellipsis">
          <p class="app-ellipsis name-title">
            {{ item.cardNumber | leftAddr }} **** ****
            {{ item.cardNumber | rightAddr }}
          </p>
          <p class="gary">{{ item.cardName }}</p>
        </li>
        <li class="rit gary">
          <i
            class="el-icon-edit"
            @click="
              $router.push({ name: 'AddBankCard', query: { id: item.id } })
            "
          ></i>

          <p>{{ formatDate(item.createdAt, "yyyy-MM-dd") }}</p>
        </li>
      </ul>
      <p v-if="wallwtList.length" class="caff m-b-8 m-t-12">
        {{ $t("wallet.list.wallet.text") }}
      </p>
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
          <p class="gary">{{ item.type }}{{ $t("wallet.list.wallet.text") }}</p>
        </li>
        <li class="rit gary">
          <i
            class="el-icon-edit"
            @click="
              $router.push({ name: 'AddressWallet', query: { id: item.id } })
            "
          ></i>

          <p>{{ formatDate(item.createdAt, "yyyy-MM-dd") }}</p>
        </li>
      </ul>
      <div class="types-list">
        <p
          class="bank-types"
          v-if="!(usdtList.length && bankList.length && wallwtList.length)"
        >
          {{ $t("bank.types") }}
        </p>
        <ul
          class="add-list align-center ntf-vant-btn"
          v-if="!usdtList.length && listWay.find((item) => item.type === 2)"
          @click="$router.push({ name: 'AddressUsdt' })"
        >
          <li>
            <i class="el-icon-plus"></i>
          </li>
          <li>{{ $t("user.Add.usdt.Address") }}</li>
        </ul>
        <ul
          class="add-list align-center ntf-vant-btn"
          v-if="!bankList.length && listWay.find((item) => item.type === 1)"
          @click="$router.push({ name: 'AddBankCard' })"
        >
          <li>
            <i class="el-icon-plus"></i>
          </li>
          <li>{{ $t("user.new.bank") }}</li>
        </ul>
        <ul
          class="add-list align-center ntf-vant-btn"
          v-if="!wallwtList.length && listWay.find((item) => item.type === 4)"
          @click="$router.push({ name: 'AddressWallet' })"
        >
          <li>
            <i class="el-icon-plus"></i>
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
      // res.data = [
      //   {
      //     address: "12132",
      //     type: "ERC20",
      //     createdAt: 1627584000000,
      //   },
      // ];
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
      // res.data = [
      //   {
      //     cardNumber: "12132",
      //     cardName: "中国银行",
      //     createdAt: 1627584000000,
      //   },
      // ];
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
      // res.data = [
      //   {
      //     addr: "12132",
      //     protocol: "ERC20",
      //     createdAt: 1627584000000,
      //   },
      // ];
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
  .gary {
    color: #9db1cd;
  }
  .bank {
    height: 73px;
    border-radius: 12px;
    background-color: rgba(106, 103, 103, 0.17);
    margin-bottom: 8px;
    background-size: auto 100%;
    padding-right: 16px;
    .name {
      & > p:first-child {
        margin-bottom: 8px;
      }
    }
    .rit {
      width: 100px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      img {
        width: 24px;
        height: 24px;
        display: block;
        margin-bottom: 4px;
      }
    }
    .icon-box {
      width: 74px;
      img {
        width: 44px;
        height: 44px;
        object-fit: cover;
      }
    }
  }
  .add-list {
    height: 48px;
    border-radius: 15px;
    margin-bottom: 4px;

    color: #fff;
    & > li:first-child {
      padding: 0 8px 0 16px;
    }
    img {
      width: 22px;
      display: block;
      height: 22px;
      object-fit: cover;
    }
  }
  .bg-yellow {
    background-color: #f79e1b;
  }
  .bg-blue {
    background-color: #0022ff;
  }
  .caff {
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    color: #caffde;
  }
}
</style>
