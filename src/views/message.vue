<template>
  <div class="message-page color-primary">
    <AppTopBar
      :styleObj="{ backgroundColor: 'transparent' }"
      :topBarTitle="$t('fuc.message.center')"
    >
    </AppTopBar>
    <div class="center-center py-16" v-if="!noticeList">
      <van-Loading color="#1989fa" />
    </div>
    <div v-else class="p-x-12">
      <ul class="msg-list" v-for="(item, index) in noticeList" :key="index">
        <li class="bold">{{ item.title }}</li>
        <li class="cont font12 gray">{{ item.content }}</li>
        <li class="time font12 gray">
          {{ formatDate(item.createdAt, "yyyy-MM-dd hh:mm:ss") }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";
export default {
  name: "MessageView",
  data() {
    return {
      noticeList: null,
    };
  },
  methods: {
    async getMsgList() {
      const params = {
        lang: this.$store.state.lang,
      };
      const [err, res] = await userApi.notice(params);
      if (err) return;
      this.noticeList = res.data;
    },
  },
  created() {
    this.getMsgList();
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
.message-page {
  .msg-list {
    margin-bottom: 10px;
    padding: 10px;
    font-size: 12px;
    border-radius: 12.3px;
    border: solid 1px var(--main);
    background-color: rgba(255, 255, 255, 0.1);
    .cont,
    .time {
      color: #9db1cd;
    }
  }
  .cont {
    margin: 8px 0;
  }
}
</style>
