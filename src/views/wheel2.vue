<template>
  <div class="lot-page font12">
    <AppTopBar :styleObj="{ backgroundColor: 'transparent' }">
      <template #right>
        <p
          @click="$router.push({ name: `LotteryRecord` })"
          class="m-r-16 align-center"
          style="line-height: 1"
        >
          <img
            class="d-img record"
            src="@/assets/img/ntf/market/130992@2x.webp"
            alt=""
          />
          {{ $t("lottery.order1") }}
        </p>
      </template>
    </AppTopBar>
    <ul class="p-t-40 m-b-16">
      <li class="center-center p-t-16">
        <img
          class="d-img ligt"
          src="@/assets/img/ntf/wheel/invalid-name@2x.webp"
          alt=""
        />
      </li>
      <li class="font14 center-center p-x-4">
        {{
          $t("Number.of.draws", {
            num: base.quantity,
          })
        }}
      </li>
    </ul>
    <div
      id="my-lucky"
      :style="{
        width: '364px',
        height: '364px',
      }"
      class="lot-bg"
    ></div>
    <ul class="font14 btm-text">
      <li class="p-b-16 text-center blod title">
        {{ $t("market.rate.desc") }}
      </li>
      <li class="p-b-16 m-t-12">
        {{ $t("backapi.self.wheel.rules.content1.text") }}
      </li>
      <li class="p-b-16">2.{{ $t("lottery.my.frend") }}</li>
    </ul>
    <van-popup @closed="close" class="lottery-pop" v-model="show">
      <ul class="font14">
        <li class="m-b-20 m-t-20 p-x-20 bg-txt flex-column align-center">
          <p class="pic">
            <img
              class="d-img"
              :src="
                !noTxt.includes(winIndx)
                  ? require('@/assets/img/ntf/wheel/126965@3x.png')
                  : require('@/assets/img/ntf/wheel/126968@3x.png')
              "
              alt=""
            />
          </p>
          <p class="m-b-t font16">
            {{ isNaN(curWin) ? curWin : `${curWin}${base.symbol}` }}
          </p>
        </li>
        <li class="p-l-16 p-r-16" @click="$router.push('/page/user')">
          {{ $t("your.win.go") }}
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import { LuckyWheel } from "lucky-canvas";
import userApi from "@/api/user";
// eslint-disable-next-line no-unused-vars
import startBg from "@/assets/img/ntf/wheel/131010@3x.png";
const bgWheel = require("@/assets/img/ntf/wheel/131012@3x.png");
export default {
  name: "WithdrawView",
  data() {
    return {
      show: false,
      noTxt: [7],
      isFlashing: false,
      isFlashingIdx: null,
      winIndx: null,
      base: {
        quantity: 0,
      },
      loading: false,
    };
  },
  computed: {
    draw() {
      let obj = {};
      if (!Array.isArray(this.base.draw) || this.base.draw.length == 0)
        return obj;

      return this.base.draw[0];
    },
    curWin() {
      if (!this.bouns[this.winIndx]) {
        return {};
      }
      return this.bouns[this.winIndx];
    },
    prizes() {
      return this.bouns.map((v) => {
        return {
          fonts: [
            {
              text: isNaN(v) ? v : `${v}${this.base.symbol}`,
              fontColor: "#fff",
            },
          ],
        };
      });
    },
    bouns() {
      let arr = [];
      if (this.draw.bouns) {
        arr = this.draw.bouns.split(",");
      }
      return arr;
    },
    pay() {
      return this.draw.pay || 0;
    },
  },
  methods: {
    startFlashing() {
      if (!this.base.quantity) {
        this.close();
        this.$toast(this.$t("backapi.unLotteryDraw"));
        return;
      }
      this.winIndx = null;
      this.bingo();
    },
    async getBase(key) {
      const [err, res] = await userApi.bingoCount();
      if (err) return;
      if (key === "quantity") {
        this.base.quantity = res.data.quantity;
        return;
      }
      for (let key in res.data) {
        this.$set(this.base, key, res.data[key]);
      }
    },
    async bingo() {
      const [err, res] = await userApi.bingo({
        model: 0,
        money: this.pay,
      });
      if (err) {
        this.close();
        return;
      }
      // this.getBase("quantity");
      this.base.quantity = this.base.quantity - 1;
      this.base.quantity = this.base.quantity < 0 ? 0 : this.base.quantity;

      this.winIndx = res.data.index;
      this.myLucky.stop(this.winIndx);
    },
    close() {
      this.winIndx = null;
      this.myLucky.init();
    },
    initGame() {
      this.myLucky = new LuckyWheel("#my-lucky", {
        width: "364px",
        height: "364px",
        prizes: this.prizes,
        blocks: [
          {
            padding: "48px",
            imgs: [
              {
                rotate: true,
                src: bgWheel,
                width: "364px",
                height: "364px",
              },
            ],
          },
        ],
        buttons: [
          {
            radius: "50px",
          },
          {
            radius: "45px",
          },
          {
            imgs: [
              {
                src: startBg,
                top: "-60px",
                width: "84px",
                height: "100px",
              },
            ],
          },
        ],
        start: () => {
          this.myLucky.play();
          this.startFlashing();
        },
        end: () => {
          if (this.winIndx !== null) {
            this.show = true;
          }
        },
      });
    },
  },
  async mounted() {
    this.$store.commit("setPdTop", false);
    await this.getBase();
    this.initGame();
  },
};
</script>
<style scoped lang="less">
.lot-page {
  min-height: 100vh;
  background: url("@/assets/img/ntf/wheel/126967@3x.png") no-repeat center top;
  background-size: 100% auto;
  .gold {
    color: #fad32b;
  }
  .logo {
    height: 55px;
    width: 55px;
  }
  .ligt {
    height: 58px;
  }
  .lot-bg {
    margin: 0 auto;

    background-size: 100% 100%;
  }
  .lot-list {
    padding: 16px 10px 0 6px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    & > li {
      color: #721515;
      font-size: 16px;
      font-weight: bold;
      width: 100px;
      text-align: center;
      height: 100px;
      background: url("@/assets/img/ntf/130905@2x.webp") no-repeat center center;
      background-size: 100% 100%;
      img {
        width: 62px;
        height: 62px;
      }
      &.go-txt {
        font-size: 30px;
        font-weight: 500;
        background-image: url("@/assets/img/ntf/130911@2x.webp");
        //color: #fff;
      }
      &.flashing {
        background-image: url("@/assets/img/ntf/130904@2x.webp");
      }
    }
  }
}
.lottery-pop {
  background-color: transparent;
  text-align: center;
  background: url("@/assets/img/ntf/wheel/131007@3x.png");
  width: 276px;
  height: 288.5px;
  background-size: 100% 100%;
  .bg-txt {
    justify-content: space-around;
    .pic {
      width: 90px;
      height: 90px;
      img {
        object-fit: contain;
      }
    }
  }
}
.btm-text {
  background: url("@/assets/img/ntf/wheel/131011@3x.png");
  min-height: 265px;
  background-size: 100% 100%;
  padding: 22px 16px 0 16px;
  .title {
    color: #fad32b;
  }
}
.record {
  height: 25px;
  width: 25px;
}
</style>
