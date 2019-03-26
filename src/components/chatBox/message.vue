<template>
<div class="message">
    <ul v-if="session">
        <li v-for="item in session.messages">
            <p class="time">
                <span>{{ item.date | time }}</span>
            </p>
            <div class="main" :class="{ self: item.self }">
                <img class="avatar" width="30" height="30" :src="item.self ? user.avatar : session.user.avatar" />
                <div class="text">{{ item.content }}</div>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
  export default {
    data(){
      return{
        session:this.$store.getters.nowSession,
        user:this.$store.getters.user
      }
    },
    filters: {
      // 将日期过滤为 hour:minutes
      time (date) {
        if (typeof date === 'string') {
          date = new Date(date);
        }
        return date.getHours() + ':' + date.getMinutes();
      }
    },
    methods:{
      refreshMsg(){
        this.session=this.$store.getters.nowSession
        let ms=document.getElementsByClassName("message")[0]
        ms.scrollTop = ms.scrollHeight - ms.clientHeight;
      }
    },
    mounted() {
      let ms=document.getElementsByClassName("message")[0]
      ms.scrollTop = ms.scrollHeight - ms.clientHeight;
    }
  };
</script>

<style lang="less" scoped>
.message {
  padding: 10px 15px;
  overflow-y: scroll;

  li {
    margin-bottom: 15px;
  }
  .time {
    margin: 7px 0;
    text-align: center;

    > span {
      display: inline-block;
      padding: 0 18px;
      font-size: 12px;
      color: #fff;
      border-radius: 2px;
      background-color: #dcdcdc;
    }
  }
  .avatar {
    float: left;
    margin: 0 10px 0 0;
    width: 36px;
    height: 36px;
  }
  .text {
    display: table;
    position: relative;
    padding: 0 10px;
    max-width: ~'calc(100% - 70px)';
    min-height: 30px;
    line-height: 2.5;
    font-size: 12px;
    text-align: left;
    word-break: break-all;
    background-color: #fafafa;
    border-radius: 4px;

    &:before {
      content: " ";
      position: absolute;
      top: 9px;
      right: 100%;
      border: 6px solid transparent;
      border-right-color: #fafafa;
    }
  }

  .self {
    text-align: right;

    .avatar {
        float: right;
        margin: 0 0 0 10px;
    }
    .text {
        background-color: #b2e281;
      display: inline-block;
        &:before {
            right: inherit;
            left: 100%;
            border-right-color: transparent;
            border-left-color: #b2e281;
        }
    }
  }
}
</style>
