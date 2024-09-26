<template>
  <div class="lot-page font12 p-l-12 p-r-12">
    <AppTopBar :styleObj="{ backgroundColor: 'transparent' }"> </AppTopBar>
    <ul>
      <li class="center-center p-t-20">
        <img class="d-img logo" src="@/assets/img/ntf/home/logo.png" alt="" />
      </li>
      <li class="center-center">
        <img class="d-img ligt" src="@/assets/img/ntf/126942@2x.webp" alt="" />
      </li>
      <li class="font14 center-center p-x-4">
        {{
          $t("Number.of.draws", {
            num: base.quantity,
          })
        }}
      </li>
    </ul>
    <div class="lot-bg" v-if="base.switch">
      <ul class="lot-list">
        <template v-for="(item, idx) in bouns">
          <template v-if="idx == 3">
            <li
              class="center-center flex-column"
              :key="idx"
              :class="{ flashing: isFlashingIdx === idx }"
            >
              <p>
                <img class="d-img" :src="item.icon" alt="" />
              </p>
              <p v-if="!noTxt.includes(idx)">
                {{ item.text }}{{ base.symbol }}
              </p>
            </li>
            <li
              :key="`${idx}-go`"
              class="center-center go-txt"
              @click="startFlashing"
            ></li>
          </template>
          <template v-else>
            <li
              class="center-center flex-column"
              :key="idx"
              :class="{ flashing: isFlashingIdx === idx }"
            >
              <p>
                <img class="d-img" :src="item.icon" alt="" />
              </p>
              <p v-if="!noTxt.includes(idx)">
                {{ item.text }}{{ base.symbol }}
              </p>
            </li>
          </template>
        </template>
      </ul>
    </div>
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
import userApi from "@/api/user";
import icon from "@//assets/img/ntf/home/126948@2x.webp";
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
    bouns() {
      let arr = [];
      if (this.draw.bouns) {
        arr = this.draw.bouns.split(",");
        arr = arr.map((item, idx) => {
          return {
            text: item,
            icon: !this.noTxt.includes(idx)
              ? icon
              : require(`@/assets/img/ntf/lot/${idx + 1}.webp`),
          };
        });
      }
      return arr;
    },
    pay() {
      return this.draw.pay || 0;
    },
  },
  methods: {
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
  },
  created() {
    this.$store.commit("setPdTop", false);
    this.getBase();
  },
};
</script>
<style scoped lang="less">
.lot-page {
  min-height: 100vh;
  background: url("@/assets/img/ntf/home/lot.webp") no-repeat center top;
  background-size: 100% auto;

  .logo {
    height: 55px;
    width: 55px;
  }
  .ligt {
    width: 318px;
    height: 38px;
  }
  .lot-bg {
    background: url("@/assets/img/ntf/130903@2x.webp") no-repeat center top;
    background-size: 100% 100%;
    width: 330px;
    height: 331px;
    margin: 24px auto;
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
