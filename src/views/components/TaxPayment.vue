<template>
  <van-dialog
    class="tax-payment-dialog p-x-24"
    :showConfirmButton="false"
    v-model="showDialog"
    :close-on-click-overlay="false"
  >
    <div class="tax-payment">
      <ul>
        <li class="justify-between align-center p-t-16">
          <p class="color-pink">
            {{ $t(`backapi.self.already.money.time.text`) }}
          </p>
          <p>
            <van-count-down :time="obj.time" format="DDD:HH:mm:ss" />
          </p>
        </li>
        <li class="justify-between align-center p-t-16">
          <p class="color-pink">{{ $t(`wallet.index.balance.text`) }}</p>
          <p>{{ money1 }}</p>
        </li>
        <li class="justify-between align-center p-t-16">
          <p class="color-pink">{{ $t(`backapi.self.already.money.text`) }}</p>
          <p>{{ money3 }}</p>
        </li>
        <li class="justify-between align-center p-t-16">
          <p class="color-pink">{{ $t(`backapi.self.need.money.text`) }}</p>
          <p
            v-clipboard:copy="getCopyValue()"
            v-clipboard:success="handleCopySuccess"
          >
            {{ moneyCeil }}
            <i class="el-icon-document-copy copy-button active font16 ml-4"></i>
          </p>
        </li>
      </ul>
      <div class="p-t-16 p-b-16 msg text-center">{{ obj.msg }}</div>
      <ul class="align-center desc">
        <li class="m-r-8">
          <img src="@/assets/img/ntf/131056@2x.webp" alt="" />
        </li>
        <li class="font12 color-pink">
          {{ $t(`backapi.self.all.alert.desc`) }}
        </li>
      </ul>
      <ul class="text-center">
        <li class="center-center m-t-20">
          <van-button
            class="pay-res-btn"
            block
            type="info"
            @click.native="
              $router.push({ path: '/pages/wallet/onlineRecharge' })
            "
            native-type="button"
            >{{ $t("Pay.Taxes") }}</van-button
          >
        </li>
      </ul>
    </div>
  </van-dialog>
</template>

<script>
import userApi from "@/api/user";
// const test = {
//   balance: 10501000000,
//   money: 0,
//   msg: "打税1CTER platform orqali mahalliy hukumat talablari asosida to'lovni amalga oshirish talab etiladi. CTERning O'zbekistonda faol bo'lishining qonuniylikka e'tibor bermaslik uchun. Shuning uchun, to'lov muvaffaqiyatli amalga oshirilganidan so'ng, hisobni normallashtirib pulni chiqarishni tiklash",
//   needMoney: 2100200000,
//   recharge: 0,
//   serviceAddr:
//     "https://sc.uunn.org/#/?kefu_id=BHBfootball&ent_id=17&lang=en&visitor_id=fddkogbieohj&visitor_name=yuenan002",
//   time: 378521807,
//   type: 1,
// };

export default {
  name: "TaxPayment",
  data() {
    return {
      showDialog: false,
      obj: {},
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    money1() {
      // this.money1 = options.datas.data.balance / MONEYNUM
      // this.money2 = options.datas.data.needMoney / MONEYNUM
      // this.moneyCeil = Math.ceil(this.money2)
      // this.money3 = options.datas.data.money / MONEYNUM
      // let time1 = options.datas.data.time / 1000
      // let time2 = options.datas.data.time
      let txt =
        this.numToFixed(this.obj.balance, this.$globalUnit.val) /
        this.$globalNum.val;
      return parseInt(txt);
    },
    money3() {
      let txt =
        this.numToFixed(this.obj.money, this.$globalUnit.val) /
        this.$globalNum.val;
      return parseInt(txt);
    },
    moneyCeil() {
      return Math.ceil(this.money2);
    },
    money2() {
      return (
        this.numToFixed(this.obj.needMoney, this.$globalUnit.val) /
        this.$globalNum.val
      );
    },
  },
  methods: {
    getCopyValue() {
      return `${this.moneyCeil}`;
    },
    handleCopySuccess() {
      this.$toast(this.$t(`copy.success.text`));
    },
    async fbConf() {
      const [err] = await userApi.fbConf();
      if (!err && this.showDialog) {
        location.reload();
        return;
      }
      if (err && err.code === 411) {
        this.obj = err.data;
        this.showDialog = true;
      }
    },
  },
  created() {
    this.fbConf();
    this.trimr = setInterval(() => {
      this.fbConf();
    }, 1000 * 4);
  },
  beforeDestroy() {
    this.trimr && clearInterval(this.trimr);
  },
};
</script>
<style lang="less">
.van-dialog.tax-payment-dialog {
  border-radius: 14px;
  border: solid 1px rgba(245, 103, 61, 0.29);
  background-image: linear-gradient(to bottom, #1f2430, #151515);
  font-size: 14px;
  .msg {
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.8);
  }
  .color-pink {
    color: #ef7367;
  }
  .title {
    height: 74px;
    border-bottom: solid 1px #484b4c;
  }
  .desc {
    img {
      display: block;
      width: 28px;
      height: 28px;
    }
  }
  .van-count-down {
    color: #fff;
  }
  .pay-res-btn {
    border-radius: 12px;
    box-shadow: 0 3px 6px 0 #5a3e01;
    background-color: #f5673e;
    border: none;
  }
}
</style>
