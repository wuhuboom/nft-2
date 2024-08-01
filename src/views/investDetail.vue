<template>
  <div class="invest-plans-page font12 p-l-16 p-r-16">
    <AppTopBar
      :titleClass="['app-top-black-title']"
      :topBarTitle="$t(`investment`)"
      :styleObj="{ backgroundColor: 'tra' }"
    ></AppTopBar>
  </div>
</template>

<script>
const initFome = () => {
  return {
    planId: "",
    money: "",
    days: "",
    payPwd: "",
    autoInvest: 1,
    invitationCode: "",
  };
};
// /import userApi from "@/api/user";
export default {
  name: "investPlans",
  components: {},
  data() {
    return {
      formData: {
        ...initFome(),
      },
    };
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
  .green {
    color: #defb84;
  }
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
    .desc-art-pop {
      width: 318px;
      padding: 14px 10px;
      border-radius: 14px;
      background-color: #1c1c1e;
    }
  }
  .desc-art-list {
    color: #e3e7eb;
  }
  .red {
    color: #ef3501;
  }
  .h-pic {
    height: 42px;
  }
  .c-pic {
    height: 20px;
    width: 20px;
    flex-shrink: 0;
  }
  .tips-radio {
    align-items: flex-start;
  }
}
</style>
