<template>
  <div class="font14">
    <van-sticky>
      <ul class="nav justify-between align-center">
        <li class="logo center-center">
          <img class="d-img" src="@/assets/img/ntf/home/logo.png" alt="" />
        </li>
        <li class="flex-1 text-center txt">logo.com</li>
        <li class="align-center lef-icon">
          <p class="m-r-16">
            <img class="d-img" src="@/assets/img/ntf/home/nav1.png" alt="" />
          </p>
          <p class="m-r-16">
            <img class="d-img" src="@/assets/img/ntf/home/nav2.png" alt="" />
          </p>
        </li>
      </ul>
    </van-sticky>
    <ul class="p-l-16 p-r-16 center-center els m-t-8 m-b-12">
      <li class="live">
        <img src="@/assets/img/ntf/home/ligth.png" alt="" />
      </li>
      <li class="m-r-8 m-l-8 center-center flex-1 money-list">
        <div class="p-x-4">
          <p class="els">{{ $t(`user.money.available`) }}</p>
          <p class="m-t-4 els">{{ divide(user.balance) }}</p>
        </div>
        <div class="p-x-4">
          <p class="els">{{ $t(`user.money.purchased`) }}</p>
          <p class="m-t-4 els">{{ divide(user.frozenBet) }}</p>
        </div>
      </li>
      <li class="serve">
        <img class="d-img" src="@/assets/img/ntf/home/serve.png" alt="" />
      </li>
    </ul>
    <div class="shop m-l-16 m-r-16 m-b-24">
      <ul class="text-center user-info">
        <li class="username blod">{{ user.username }}</li>
        <li class="vipLevel m-t-4" v-if="user.vipLevel">
          LV.{{ user.vipLevel }}
        </li>
      </ul>
      <ul class="enter justify-between p-l-16 p-r-16">
        <li class="">
          <p class="m-b-8">{{ $t(`user.Item.shop`) }}</p>
          <p><img src="@/assets/img/ntf/home/shop1.png" alt="" /></p>
        </li>
        <li>
          <p class="m-b-8">{{ $t(`user.Item.Asset`) }}</p>
          <p><img src="@/assets/img/ntf/home/shop2.png" alt="" /></p>
        </li>
      </ul>
      <ul class="nav-enter-list justify-between els">
        <li class="els">{{ $t(`deal_deposit`) }}</li>
        <li class="els">{{ $t(`dropdown.billing.income.withdraw.text`) }}</li>
        <li class="els">{{ $t("fuc.safe.text") }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {},
};
</script>
<style lang="less" scoped>
.nav {
  height: 46px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  .logo {
    width: 77px;
    position: relative;
    img {
      width: 34px;
      height: 34px;
    }
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      height: 18px;
      transform: translateY(-50%);
      right: 0;
      border: 1px solid transparent;
      border-image: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0),
          #888 52%,
          rgba(128, 128, 128, 0)
        )
        1;
    }
  }
  .lef-icon {
    img {
      height: 32px;
      width: 32px;
    }
  }
  .txt {
    font-size: 16px;
    font-weight: bold;
  }
}
.money-list {
  //width: 220.5px;
  text-align: center;
  height: 38.2px;
  border-radius: 9.5px;
  border: solid 1px #2c2c2c;
  background-image: linear-gradient(to bottom, #000, #373334);
  font-size: 10px;
  & > div {
    width: 50%;
  }
  & > div:nth-child(1) {
    background-image: linear-gradient(
      to bottom,
      rgba(255, 153, 123, 0) 0%,
      rgba(255, 58, 0, 0.33) 100%
    );
    border-radius: 9px;
  }
}
.live {
  img {
    height: 26px;
  }
}
.serve {
  width: 31px;
  height: 31px;
}
.shop {
  background: url("@/assets/img/ntf/home/shop.png") no-repeat;
  background-size: 100% 100%;
  height: 236px;
  position: relative;
  .vipLevel {
    color: #858585;
  }
  .user-info {
    height: 48px;
  }
  .enter {
    img {
      height: 67px;
      width: 67px;
    }
  }
  .nav-enter-list {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -16px;
    & > li {
      width: 97px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background: url("@/assets/img/ntf/home/desc1.png") no-repeat;
      background-size: 100% 100%;
    }
    & > li:nth-child(2) {
      background-image: url("@/assets/img/ntf/home/desc2.png");
    }
    & > li:nth-child(3) {
      background-image: url("@/assets/img/ntf/home/desc3.png");
    }
    & > li:nth-child(3),
    & > li:nth-child(1) {
      height: 40px;
    }
  }
}
</style>
