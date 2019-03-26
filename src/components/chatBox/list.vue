
<template>
<div class="list">
  <el-input v-model="addTalk" style="width: 70%;display:block;float: left;margin-left: 5px"></el-input>
  <el-button @click="addTalkTo" style="display: block">新增</el-button>
    <ul v-if="sessions">
        <li v-for="item in sessions" :class="{ active: item.key === currentId }">
          <div style="width: 83%;" @click="selectSession(item.key)">
            <img class="avatar"  width="30" height="30" :alt="item.user.name" :src="item.user.avatar">
            <p class="name">{{item.user.name}}</p>
          </div>
          <el-button style="display: inline-block" icon="el-icon-delete" type="danger" circle @click="clearMessages" :id="item.key"></el-button>
        </li>
    </ul>
</div>
</template>

<script>
  export default {
    data(){
      return{
        sessions:this.$store.getters.userSessions,
        currentId:this.$store.getters.currentSessionId,
        addTalk:"",
      }
    },
    methods:{
      selectSession(key){
        this.$store.dispatch("SelectSession",key);
        this.$emit("refresh")
      },
      addTalkTo(){
        this.$store.dispatch("AddSession",this.addTalk)
      },
      clearMessages(){
        let key=event.currentTarget.id
        this.$store.dispatch("ClearMessages",key);
        this.$emit("refresh")
      }
    }
  };
</script>

<style scoped lang="less">
.list {
    li {
        padding: 12px 15px;
        border-bottom: 1px solid #292C33;
        cursor: pointer;
        transition: background-color .1s;

        &:hover {
            background-color: rgba(255, 255, 255, 0.03);
        }
        &.active {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
    .avatar, .name {
      vertical-align: middle;
      width: calc(100% - 51px);
      float: left;
    }
    .avatar {
      display: inline-block;
      float: left;
      width: 36px;
      height: 36px;
    }
    .name {
        display: inline-block;
        margin: 0 0 0 15px;
      padding-top: 8px;
    }
}
</style>
