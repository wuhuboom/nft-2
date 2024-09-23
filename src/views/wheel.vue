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
            num: 1,
          })
        }}
      </li>
    </ul>
    <div class="lot-bg" v-if="base.switch">
      <ul class="lot-list">
        <template v-for="(item, idx) in bouns">
          <template v-if="idx == 3">
            <li
              class="center-center"
              :key="idx"
              :class="{ flashing: isFlashingIdx === idx }"
            >
              {{ item }}
            </li>
            <li :key="`${idx}-go`" class="center-center" @click="startFlashing">
              GO
            </li>
          </template>
          <template v-else>
            <li
              class="center-center"
              :key="idx"
              :class="{ flashing: isFlashingIdx === idx }"
            >
              {{ item }}
            </li>
          </template>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";
export default {
  name: "WithdrawView",
  data() {
    return {
      isFlashing: false,
      showModal: false,
      randomPrize: null,
      isFlashingIdx: 0,
      base: {},
    };
  },
  computed: {
    draw() {
      let obj = {};
      if (!Array.isArray(this.base.draw) || this.base.draw.length == 0)
        return obj;

      return this.base.draw[0];
    },
    bouns() {
      if (this.draw.bouns) {
        return this.draw.bouns.split(",");
      }
      return [];
    },
    pay() {
      return this.draw.pay || 0;
    },
  },
  methods: {
    startFlashing() {
      // Clear any previous intervals
      if (this.flashingInterval) clearInterval(this.flashingInterval);

      // Start random flashing
      this.flashingInterval = setInterval(() => {
        // Pick a random index
        const randomIdx = Math.floor(Math.random() * this.bouns.length);
        this.isFlashingIdx = randomIdx;
      }, 200); // Adjust the speed of flashing here
    },
    async getBase() {
      const [err, res] = await userApi.bingoCount();
      if (err) return;
      for (let key in res.data) {
        this.$set(this.base, key, res.data[key]);
      }
      // this.base = res.data;
      // console.log(this.base);
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
  .flashing {
    background-color: yellow;
  }
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
    display: flex;
    flex-wrap: wrap;
    & > li {
      width: 100px;
      text-align: center;
      height: 100px;
    }
  }
}
</style>
