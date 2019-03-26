<template>
  <div class="text">
      <el-input type="textarea" resize="none" rows="6" placeholder="按 Ctrl + Enter 发送" v-model="content" @keyup.native="onKeyup"></el-input>
  </div>
</template>

<script>
  import {sendMsg} from "../../api/chat";

  export default {
    data () {
      return {
        content: ''
      };
    },
    methods: {
      onKeyup (e) {
        if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
          sendMsg({sendFrom:this.$store.getters.id,sendTo:this.$store.getters.currentSessionId,msg:this.content}).then((reponse)=>{
            let result=reponse.data!=="success"?reponse.data!=="offline"?-1:0:1;
            this.$store.dispatch("SendMessage",{content:this.content,self:true,status:result}).then(()=>{
              this.content = '';
              let ms=document.getElementsByClassName("message")[0]
              ms.scrollTop = ms.scrollHeight - ms.clientHeight;
            })
          })
        }
      }
    }
  };
</script>

<style lang="less" scoped>
.text {
    height: 160px;
    border-top: solid 1px #ddd;

    textarea {
        padding: 10px;
        height: 100%;
        width: 100%;
        border: none;
        outline: none;
        font-family: "Micrsofot Yahei";
        resize: none;
    }
}
</style>
