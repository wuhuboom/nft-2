<template>
  <div class="lot-page font12">
    <AppTopBar :styleObj="{ backgroundColor: 'transparent' }"> </AppTopBar>
    <ul class="p-t-40">
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
    <!-- <div class="lot-bg" v-if="base.switch">
      <LuckyWheel
        ref="myLucky"
        width="346px;"
        height="346px;"
        :prizes="prizes"
        :blocks="blocks"
        :buttons="buttons"
        @start="startCallback"
        @end="endCallback"
      />
    </div> -->
    <ul class="font14">
      <li class="p-b-16">{{ $t("market.rate.desc") }}</li>
      <li class="p-b-16">{{ $t("backapi.self.wheel.rules.content1.text") }}</li>
      <li class="p-b-16">{{ $t("backapi.self.wheel.rules.content2.text") }}</li>
      <li class="p-b-16">{{ $t("backapi.self.wheel.rules.content3.text") }}</li>
    </ul>
    <van-popup @closed="close" class="lottery-pop" v-model="show">
      <ul class="font14">
        <li class="font16">{{ $t("your.win.le") }}</li>
        <li class="m-b-20 m-t-20 p-x-20 bg-txt flex-column align-center">
          <p class="pic">
            <img class="d-img" :src="curWin.icon" alt="" />
          </p>
          <p class="m-b-t" v-if="!noTxt.includes(winIndx)">
            {{ curWin.text }}{{ base.symbol }}
          </p>
        </li>
        <li class="" @click="$router.push('/page/user')">
          {{ $t("your.win.go") }}
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import { LuckyWheel } from "lucky-canvas";
import userApi from "@/api/user";
import startBg from "@/assets/img/ntf/wheel/2@3x.png";
export default {
  name: "WithdrawView",
  data() {
    return {
      show: false,
      noTxt: [4, 5],
      isFlashing: false,
      isFlashingIdx: null,
      winIndx: null,
      base: {
        quantity: 0,
      },
      loading: false,
      dayDrawMax: 0,
      blocks: [{ padding: "10px", background: "#869cfa" }],

      buttons: [
        {
          imgs: [
            {
              src: startBg,
              width: 84,
              height: 100,
              top: "-60px",
            },
          ],
          pointer: true,
          fonts: [{ text: "开始" }],
        },
      ],
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
    // blocks() {
    //   return [];
    // },
    // buttons() {
    //   return [
    //     {
    //       pointer: true,
    //       fonts: [{ text: "开始", top: "-10px" }],
    //       imgs: [{ src: require("@/assets/img/ntf/wheel/2@3x.png") }],
    //     },
    //   ];
    // },
    prizes() {
      return this.bouns.map((v) => {
        return {
          fonts: [{ text: v, fontColor: "#fff" }],
        };
      });
    },
    bouns() {
      let arr = [];
      if (this.draw.bouns) {
        arr = this.draw.bouns.split(",");
        // arr = arr.map((item, idx) => {
        //   return {
        //     text: item,
        //     icon: !this.noTxt.includes(idx)
        //       ? icon
        //       : require(`@/assets/img/ntf/lot/${idx + 1}.webp`),
        //   };
        // });
      }
      return arr;
    },
    pay() {
      return this.draw.pay || 0;
    },
  },
  methods: {
    // 点击抽奖按钮会触发star回调
    startCallback() {
      // 调用抽奖组件的play方法开始游戏
      this.$refs.myLucky.play();
      // 模拟调用接口异步抽奖
      setTimeout(() => {
        // 假设后端返回的中奖索引是0
        const index = 0;
        // 调用stop停止旋转并传递中奖索引
        this.$refs.myLucky.stop(index);
      }, 3000);
    },
    // 抽奖结束会触发end回调
    endCallback(prize) {
      console.log(prize);
    },
    startFlashing() {
      if (this.dayDrawMax) {
        this.$toast.error(this.$t("backapi.unLotteryDraw"));
        return;
      }
      this.winIndx = null;
      // Clear any previous intervals
      if (this.flashingInterval || this.winIndx !== null)
        clearInterval(this.flashingInterval);

      // Start random flashing
      this.flashingInterval = setInterval(() => {
        // Pick a random index
        const randomIdx = Math.floor(Math.random() * this.bouns.length);
        this.isFlashingIdx = randomIdx;
      }, 200); // Adjust the speed of flashing here
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
      if (this.loading) return;
      this.loading = true;
      const [err, res] = await userApi.bingo({
        model: 0,
        money: this.pay,
      });
      if (err) {
        this.winIndx = null;
        clearInterval(this.flashingInterval);
        this.isFlashingIdx = null;
        this.loading = false;
        return;
      }
      // this.getBase("quantity");
      this.base.quantity = this.base.quantity - 1;
      this.base.quantity = this.base.quantity < 0 ? 0 : this.base.quantity;
      let index = res.data.index;
      setTimeout(() => {
        this.winIndx = index;
        clearInterval(this.flashingInterval);
        this.isFlashingIdx = null;
        this.loading = false;
        this.show = true;
      }, 9000);
    },
    close() {
      this.winIndx = null;
    },
    initGame() {
      const myLucky = new LuckyWheel("#my-lucky", {
        width: "364px",
        height: "364px",
        blocks: [
          {
            padding: "48px",
          },
        ],
        prizes: this.prizes,
        buttons: this.buttons,
        start: () => {
          // 开始游戏
          myLucky.play();
          // 使用定时器模拟接口
          setTimeout(() => {
            // 结束游戏
            myLucky.stop(0);
          }, 3000);
        },
      });
      console.log(myLucky);
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
    background: url("@/assets/img/ntf/wheel/131012@3x.png") no-repeat center
      center;
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
  .bg-txt {
    background: url("@/assets/img/ntf/lot/1@2x.webp");
    width: 231px;
    height: 130px;
    background-size: 100% 100%;
    justify-content: space-around;
    .pic {
      width: 62px;
      height: 62px;
      img {
        object-fit: contain;
      }
    }
  }
}
</style>
