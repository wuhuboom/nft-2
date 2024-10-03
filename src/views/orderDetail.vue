<template>
  <div class="InvestMyDetail-page font12 p-l-16 p-r-16">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t(`invoice.menu3.text`)"
    >
    </AppTopBar>
    <div v-if="detail.imgUrl">
      <ul class="m-t-32 m-b-12">
        <li class="font14 m-b-4 align-center">
          {{ $t("Total.asset.value") }}
          <p class="prog m-l-16">
            {{ getType2(detail.status) }}
          </p>
        </li>
        <li class="total">{{ divide(detail.investTotal) }}</li>
      </ul>
      <!-- <ul class="m-t-12 head">
        <li class="align-center plan-name">
          <p class="m-r-8">
            <img class="d-img" :src="detail.imgUrl" alt="" />
          </p>
          <p class="m-t-4">{{ detail.plan.name }}</p>
        </li>
        <li class="monney-totel d-flex m-t-8">
          <p class="blod m-r-8">{{ divide(detail.investTotal) }}</p>
          <p class="blod green">{{ detail.moneyIncome }}</p>
        </li>
      </ul> -->
      <div class="p-l-12 p-r-12 p-t-12 m-t-24 order-msg">
        <ul class="justify-between row m-b-12">
          <li class="color-blue">{{ $t(`order.type`) }}</li>
          <li>{{ $t(`buy.take`) }}</li>
        </ul>
        <ul class="justify-between row m-b-12">
          <li class="color-blue">{{ $t(`order.say`) }}</li>
          <li>{{ $t(`buy.desc.tip`) }}</li>
        </ul>
        <ul class="justify-between row m-b-12">
          <li class="color-blue">{{ $t(`recharge.Status`) }}</li>
          <li class="align-center">
            {{ getType2(detail.status) }}
          </li>
        </ul>
        <ul class="justify-between row m-b-12">
          <li class="color-blue">{{ $t(`fundsRecords.orderNo.text`) }}</li>
          <li
            class="align-center"
            v-clipboard:copy="detail.orderNo"
            v-clipboard:success="handleCopySuccess"
          >
            {{ detail.orderNo }}
            <i class="el-icon-copy-document m-l-4 font16"></i>
          </li>
        </ul>
        <ul class="justify-between row m-b-12">
          <li class="color-blue">{{ $t(`make.order.time`) }}</li>
          <li>{{ date(detail.createdAt) }}</li>
        </ul>

        <ul class="justify-between row m-b-12">
          <li class="color-blue">{{ $t(`manege.product`) }}</li>
          <li v-if="detail.plan" class="align-center">
            {{ detail.plan.name }}
          </li>
        </ul>
        <ul class="justify-between row m-b-12">
          <li class="color-blue">{{ $t(`hoe.much.money`) }}</li>
          <li class="caff">{{ divide(detail.money) }}</li>
        </ul>
        <ul class="justify-between row m-b-12">
          <li class="color-blue">{{ $t(`invest.money.text`) }}</li>
          <li class="active">{{ divide(detail.money) }}</li>
        </ul>

        <ul class="justify-between row p-b-12">
          <li class="color-blue">{{ $t(`order.pays`) }}</li>
          <li>{{ $t(`backapi.self.safe.balance.text`) }}</li>
        </ul>
      </div>
      <p class="explanation font14 m-t-16">
        {{ $t("wallet.index.explanation.text") }}
      </p>
      <div class="rules-desc m-b-16">
        <van-steps
          direction="vertical"
          class="l34"
          :active="20"
          active-color="#F6B123"
        >
          <van-step>
            <ul class="color-fff font12 justify-between align-center">
              <li class="color-fff m-b-4">{{ $t("buy.time") }}</li>
              <li>{{ date(detail.profitTimeStart) }}</li>
            </ul>
          </van-step>
          <van-step>
            <ul class="color-fff justify-between align-center">
              <li class="color-fff font12 color-fff m-b-4">
                {{ $t("give.money.time") }}
              </li>
              <li>{{ date(detail.profitTime) }}</li>
            </ul>
          </van-step>
          <van-step>
            <ul class="color-fff font12 justify-between align-center">
              <li class="color-fff color-fff m-b-4">
                {{ $t("return.time") }}
              </li>
              <li>{{ detail.orderCancelTime }}{{ $t(`return.money.time`) }}</li>
            </ul>
          </van-step>
        </van-steps>
        <div class="m-t-24" v-if="detail.status == 0">
          <van-button
            @click="showDesc = true"
            class="ntf-vant-btn"
            block
            type="info"
            native-type="button"
            >{{ $t("yu.e.bao.take.back") }}</van-button
          >
        </div>
      </div>
    </div>
    <van-popup
      style="width: 80%"
      class="linear-global-pop font14"
      v-model="showDesc"
      position="center"
    >
      <ul class="text-center">
        <li class="m-b-16">{{ $t(`money.sure.back`) }}</li>
        <li class="m-b-16">{{ $t(`money.sure.back.tip`) }}</li>
      </ul>
      <ul class="center-center m-b-12">
        <li class="m-r-16">
          <van-button
            class="ntf-vant-btn wit101"
            @click="(showPay = true), (showDesc = false)"
            type="info"
            size="small"
            >{{ $t("backapi.self.notice.alert.okbtn.text") }}</van-button
          >
        </li>
        <li>
          <van-button
            style="
              background-color: #344756;
              border-color: transparent;
              background-image: none;
            "
            class="ntf-vant-btn wit101"
            @click="showDesc = false"
            type="info"
            size="small"
            >{{ $t("btn.caancle.text") }}</van-button
          >
        </li>
      </ul>
    </van-popup>
    <van-popup
      style="width: 80%"
      class="linear-global-pop font14"
      v-model="showPay"
      position="center"
    >
      <van-form class="ntf-form" @submit="onSubmit">
        <van-field
          class="m-b-32"
          v-model="formData.payPwd"
          name="payPwd"
          type="password"
          autocomplete="new-password"
          :placeholder="`${$t('ruls.xxx.please', {
            name: $t('Payment.password'),
          })}`"
          :rules="[
            {
              required: true,
              message: this.$t('ruls.xxx.empty', {
                name: this.$t('Payment.password'),
              }),
            },
          ]"
        />
        <van-button
          class="ntf-vant-btn"
          block
          type="info"
          native-type="submit"
          >{{ $t("modal.confirm.text") }}</van-button
        >
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import yuIcon from "@/assets/img/ntf/yue.png";
import dayjs from "dayjs";
import userApi from "@/api/user";
import i18n from "@/locale";
export default {
  name: "InvestMyDetail",
  components: {},
  data() {
    return {
      showDesc: false,
      showPay: false,
      yuIcon,
      finished: false,
      detail: [],
      formData: {
        payPwd: "",
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
    getType2(value) {
      let res = this.typeOptions2.find((item) => item.value == value);
      if (!res) return "";
      return res ? res.label : "";
    },
    async onSubmit() {
      const [err] = await userApi.investMyStopYeb({
        id: this.$route.query.id,
        payPwd: this.formData.payPwd,
      });
      if (err) {
        return;
      }
      this.$toast.success();
      this.investMyDetail();
    },
    handleCopySuccess() {
      this.$toast.success();
    },
    date(t) {
      return dayjs.unix(this.$ToSeconds(t)).format("YYYY-MM-DD HH:mm");
    },

    async investMyDetail() {
      let [err, res] = await userApi.investMyDetail({
        id: this.$route.query.id,
      });
      if (err) {
        return;
      }
      //模拟 res.data 数据
      // res.data = {
      //   id: 1,
      //   plan: {
      //     name: "余额宝",
      //   },
      //   investTotal: 1000,
      //   moneyIncome: 100,
      //   status: 0,
      //   orderNo: "20210719123456789",
      //   createdAt: 1626662400,
      //   profitTimeStart: 1626662400,
      //   profitTime: 1626662400,
      //   orderCancelTime: 1626662400,
      //   money: 1000,
      // };
      this.detail = res.data || {};
      if (!this.detail.imgUrl) {
        this.detail.imgUrl = yuIcon;
      }
    },
  },
  created() {
    this.investMyDetail();
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
  .plan-name {
    img {
      width: 32px;
      height: 32px;
    }
  }
  .green {
    color: #1fb759;
  }
  .monney-totel {
    align-items: baseline;
    & > :nth-child(1) {
      font-size: 24px;
    }
  }
  .head {
    background: url("@/assets/img/ntf/goldbox.webp") no-repeat right center;
    background-size: contain;
  }
  .order-msg {
    border-radius: 9px;
    background-color: #17181c;
  }
  .l34 {
    margin-left: -12px;
  }
  .rules-desc {
    ::v-deep {
      .van-steps {
        border-radius: 8px;
        background-color: transparent;
        font-size: 12px;
      }
      .van-hairline {
        &::after {
          border-color: transparent;
        }
      }
    }
  }
  .wit101 {
    width: 101px;
    height: 33px;
  }
  .row {
    & > li:first-child {
      color: #9fa0a2;
    }
    & > li:last-child {
      color: #cacbce;
    }
  }
  .total {
    font-size: 24px;
    font-weight: bold;

    color: #fff;
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
}
</style>
