<template>
  <van-popup v-model="showErr" class="show-err-dilog">
    <div class="p-x-12 flex-column justify-around">
      <p class="center-center p-t-8 p-b-8 red">
        {{ $t(`Participation.every.day3`) }}
      </p>
      <ul class="m-b-4">
        <li
          v-for="(d, i) in popTxt"
          :key="i"
          :class="{
            red: !result[d.key],
            'm-b-8': i !== popTxt.length - 1,
          }"
        >
          {{ i + 1 }}、{{ d.txt }}
        </li>
      </ul>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: "PrePopDialog",
  data() {
    return {
      showErr: false,
    };
  },
  props: {
    popTxt: {
      type: Array,
      default: () => [],
    },
    result: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    open() {
      this.showErr = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.show-err-dilog {
  width: 270px;
  min-height: 111px;
  background: linear-gradient(180deg, #1f2430 0%, #151515 100%);
  border-radius: 14px 14px 14px 14px;
}
.red {
  color: #ef3501;
}
</style>
