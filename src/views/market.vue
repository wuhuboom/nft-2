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
        @click="
          chose({
            parent: item,
            ...doc,
          })
        "
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
          <van-progress
            track-color="#808080"
            color="#f5673e"
            class="m-t-16 m-b-8"
            :percentage="item.curr"
          />
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
      <AppTopBar
        :back="close"
        :titleClass="['app-top-black-title']"
        :topBarTitle="$t(`investment`)"
        :styleObj="{ backgroundColor: 'tra' }"
      ></AppTopBar>
      <div class="buy-detail gray-bg-img p-l-16 p-r-16">
        <div class="align-center">
          <p class="invest-pic no-shrink m-r-8">
            <img class="d-img" :src="item.header" alt="" />
          </p>
          <ul class="align-center flex-1 space-between">
            <li>
              <p class="font16 m-b-8">{{ item.name }}</p>
              <p class="days">
                {{ item.days }}
                {{
                  item.days == 1 ? $t(`safe.one.days`) : $t(`safe.invite.days`)
                }}
              </p>
            </li>
            <li class="rate-row">
              <p class="font16 rate color-active m-b-8">{{ item.rate }}%</p>
              <p class="gray">{{ $t(`rate.of.return`) }}</p>
            </li>
          </ul>
        </div>
        <p class="m-t-20 m-b-12 font14">{{ $t(`purchase.amount`) }}</p>
        <van-form class="ntf-form" @submit="onSubmit">
          <van-field
            v-model="formData.money"
            type="digit"
            name="money"
            :placeholder="limitTxt"
            :rules="[
              {
                required: true,
                message: this.$t('ruls.xxx.empty', {
                  name: this.$t('rebate.center.list.nav.smount.text'),
                }),
              },
              {
                validator,
                message: limitTxt,
              },
            ]"
          />
          <p class="m-t-8 m-b-20">
            {{ $t(`total.return`) }}:<span class="font14">{{ earnings }}</span>
          </p>
          <ul class="font12 criteria" v-if="popTxt.length">
            <li class="font14 m-b-4">{{ $t("Participation.criteria") }}:</li>
            <li class="gray" v-for="(d, i) in popTxt" :key="i">
              {{ i + 1 }}、{{ d.txt }}
            </li>
          </ul>
          <ul class="m-t-20 m-b-20 align-center justify-between">
            <li class="font14 align-center">
              {{ $t(`market.rate.many`) }}
              <van-icon class="active m-l-8" size="16" name="question-o" />
            </li>
            <li>
              <el-switch
                v-model="formData.autoInvest"
                active-text="Yes"
                active-color="#f5673e"
                inactive-text="No"
              >
              </el-switch>
            </li>
          </ul>
          <van-field
            class="m-b-16"
            v-if="parseInt(item.parent && item.parent.inviteRequire) === 1"
            v-model="formData.invitationCode"
            name="invitationCode"
            :placeholder="`${$t('ruls.xxx.please', {
              name: $t('form.invitecode.text'),
            })}`"
            :rules="[
              {
                required: true,
                message: this.$t('ruls.xxx.empty', {
                  name: this.$t('form.invitecode.text'),
                }),
              },
            ]"
          />
          <van-field
            class="m-b-32"
            v-model="formData.payPwd"
            name="payPwd"
            :placeholder="`${$t('ruls.xxx.please', {
              name: $t('backapi.self.safe.transfer.func.pass.text'),
            })}`"
            :rules="[
              {
                required: true,
                message: this.$t('ruls.xxx.empty', {
                  name: this.$t('backapi.self.safe.transfer.func.pass.text'),
                }),
              },
            ]"
          />
          <van-button
            class="ntf-vant-btn"
            block
            type="info"
            native-type="submit"
            >{{ $t("login.btn.text") }}</van-button
          >
        </van-form>
      </div>
    </van-popup>
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
      formData: {
        planId: "",
        money: "",
        days: "",
        payPwd: "",
        autoInvest: 1,
        invitationCode: "",
      },
      item: {},
      show: false,
      records: {},
    };
  },
  computed: {
    earnings() {
      const val = this.formData.money || 0;
      if (val > 0) {
        //= X * (1 + Y/100)*Z
        const curRate = this.item.rate / 100;
        let num = val * curRate * this.item.days;
        if (+this.formData.autoInvest === 1) {
          num = val * Math.pow(1 + curRate, this.item.days) - val;
        }
        return num.toFixed(2);
      } else {
        return 0;
      }
    },
    popTxt() {
      const arr = [];
      const data = this.item;
      if (data.subPlayer) {
        arr.push({
          key: "groups",
          txt: this.$t("Participation.greater.than", {
            num: `>=${data.subPlayer}`,
          }),
        });
      }
      if (data.inDays) {
        arr.push({
          key: "inDays",
          txt: this.$t("Participation.investment.than", {
            num: `>=${data.inDays}`,
          }),
        });
      }
      return arr;
    },
    addRate() {
      return !(parseInt(this.item.showAuto) === 0);
    },
    limitTxt() {
      return `${this.$t(`deal.buyDetail.387081-5`)}:${this.item.min}-${
        this.item.max
      }`;
    },
  },
  methods: {
    validator(v) {
      return v >= this.item.min && v <= this.item.max;
    },
    onSubmit() {
      console.log("submit");
    },
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
        console.log(item.rateConfig);
        item.close = false;
        return item;
      });
      this.records = this.records.filter((v) => v.rateConfig.length);
      this.test();
    },
    test() {
      this.item = {
        ...this.records[0].rateConfig[1],
        parent: this.records[0],
      };
      this.show = true;
    },
    chose(v) {
      if (v.parent.curr == 100) {
        this.$toast("backapi.planExpired");
        return;
      }
      if (this.addRate) {
        this.formData.autoInvest = 1;
      } else {
        this.formData.autoInvest = 0;
      }
      this.item = v;
      this.show = true;
    },
    close() {
      this.show = false;
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
  }
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
  .buy-detail {
    min-height: 100%;
    padding-top: @navHeight+24px;
  }
  ::v-deep {
    .el-switch__label--left {
      color: #cacbce;
    }
    .el-switch__label--right {
      color: #cacbce;
    }
  }
}
</style>
