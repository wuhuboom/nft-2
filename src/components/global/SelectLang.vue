<template>
  <div class="lang align-center">
    <el-select
      :value="$store.state.lang"
      @change="select"
      :placeholder="$t('index.editor.psd.text')"
    >
      <template #prefix>
        <img class="selectd-icon d-img m-r-8" :src="langIcon" alt="" />
      </template>
      <el-option
        v-for="item in langOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <div class="custom-option align-center m-t-8">
          <img class="d-img m-r-8" :src="item.icon" alt="" />
          <span class="custom-label">{{ item.label }}</span>
        </div>
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "SelectLang",
  computed: {
    curLang() {
      return this.langOptions.find((item) => item.value === this.lang) || {};
    },
    langIcon() {
      return this.curLang.icon;
    },
    lang() {
      return this.$store.state.lang;
    },
    langOptions() {
      console.log(this.$store.state.langOpt, "---");
      return this.$store.state.langOpt;
    },
  },
  methods: {
    select(val) {
      this.$store.commit("setLang", val);
    },
  },
};
</script>
<style scoped lang="less">
.lang {
  justify-content: flex-end;
  ::v-deep {
    .el-select {
      width: 78px;
    }
    .el-input {
      .el-input__suffix {
        display: none;
      }
      display: flex;
      align-items: center;
      height: 36px;
      position: relative;
      border-radius: 20px;
      border: solid 1px rgba(55, 251, 124, 0.17);
      background-image: linear-gradient(to bottom, #242a3b, #273b40);
    }
    .el-input__inner {
      padding-left: 32px;
      padding-right: 20px;
      text-align: right;
    }
    .el-select-dropdown__item {
      padding: 0 4px;
    }
  }
  .lang-pic {
    img {
      width: 24px;
      height: 24px;
      display: block;
    }
  }
}

.custom-option {
  img {
    width: 24px;
    height: 24px;
    border-radius: 14px;
  }
}
.selectd-icon {
  width: 24px;
  height: 24px;
  border-radius: 14px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
