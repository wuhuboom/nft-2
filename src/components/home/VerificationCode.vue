<template>
  <div class="g-dialog-component">
    <ul class="enter-code" @click="focusFn">
      <li
        v-for="(item, idx) in codes"
        :key="idx"
        :class="{ 'code-after': !item.focus, 'code-active': item.focus }"
      >
        <el-input
          @focus="countCocut(idx)"
          @blur="clearActive"
          class="js-txt-input"
          :ref="`codeinput${idx}`"
          @keyup.delete.native="del(idx)"
          v-model.trim="item.text"
        ></el-input>
      </li>
    </ul>
  </div>
</template>

<script>
const initCode = () => {
  return [
    { text: "", ref: "", focus: false },
    { text: "", ref: "", focus: false },
    { text: "", ref: "", focus: false },
    { text: "", ref: "", focus: false },
    { text: "", ref: "", focus: false },
    { text: "", ref: "", focus: false },
  ];
};
export default {
  name: "VerificationCode",
  data() {
    return {
      emitCode: false,
      dialogCode: false,
      codes: initCode(),
    };
  },
  props: {
    title: {
      type: String,
      default: "请输入你的2步认证验证码",
    },
  },
  computed: {
    finish() {
      return this.codes.filter((item) => item.text).length === 6;
    },
    value() {
      return this.codes.map((item) => item.text).join("");
    },
  },
  watch: {
    codes: {
      handler: function (val) {
        let idx, v, num;
        val.forEach((value, key) => {
          if (value.text) {
            idx = key;
            v = value.text;
          }
        });
        if (v) {
          num = parseInt(v);
          if (Number.isInteger(num) && `${v}`.length === 1) {
            this.codes[idx].text = `${num}`;
            if (this.codes[idx + 1]) {
              this.codes[idx + 1].ref.focus();
            }
          } else {
            this.codes[idx].text = "";
          }
          if (!this.codes[idx].text) return;
          const docs = this.codes.filter((item) => !item.text);
          if (docs.length === 0) {
            this.$emit(
              "updateCode",
              this.codes.map((item) => item.text).join("")
            );
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    countCocut(idx) {
      console.log("countCocut", idx);
      this.codes.forEach((item, index) => {
        if (index === idx) {
          item.focus = true;
        } else {
          item.focus = false;
        }
      });
    },
    clearActive() {
      this.codes.forEach((item) => {
        item.focus = false;
      });
    },
    del(idx) {
      if (this.codes[idx - 1] && this.codes[[idx - 1]].text) {
        this.codes[[idx - 1]].text = "";
        this.codes[idx - 1].ref.focus();
      }
    },
    focusFn() {
      if (this.finish) {
        //追后一个处于焦点
        this.codes[5].ref.focus();
        return;
      }
      let idx;
      this.codes.forEach((value, key) => {
        if (value.text) {
          idx = key;
        }
      });
      if (!this.codes[idx]) {
        this.codes[0].ref.focus();
        return;
      }
      if (this.codes[idx] && this.codes[idx + 1]) {
        this.codes[idx + 1].ref.focus();
      }
    },
    resCode() {
      this.codes = initCode();
      this.$nextTick(() => {
        for (let i = 0; i < this.codes.length; i++) {
          this.codes[i].ref = this.$refs[`codeinput${i}`][0].$refs.input;
          if (i === 0) {
            this.codes[i].ref.focus();
          }
        }
        console.log(this.codes);
      });
    },

    close() {
      this.dialogCode = false;
    },
  },
  mounted() {
    console.log("mounted-------");
    this.dialogCode = true;
    this.emitCode = false;
    this.resCode();
  },
};
</script>
<style scoped lang="less">
.enter-code {
  margin-top: 20px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ::v-deep {
    input {
      color: #fff;
      width: 46px;
      height: 46px;
      border-radius: 9px;
      border: solid 1px #1c3023;
      background-color: #17181c;
    }
  }
  .code-active {
    ::v-deep {
      input {
        border: solid 0.5px #37fb7c;
        background-color: rgba(54, 54, 54, 0.69);
      }
    }
  }
}

// .code-after {
//   position: relative;
//   &::before {
//     content: "";
//     display: flex;
//     position: absolute;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     top: 0;
//     z-index: 3;
//   }
// }
</style>
