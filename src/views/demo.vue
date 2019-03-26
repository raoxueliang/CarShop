<template>
  <div>
    <div style="width: 400px;height: 500px;background-color: blue">

    </div>
    <el-input type="textarea" v-model="msgData"></el-input>
    <el-input v-model="sendMsg"></el-input>
    <el-input v-model="sendTo"></el-input>
    <el-button @click="send">发送消息</el-button>
  </div>
</template>

<script>
  import {sendMsg} from "../api/chat";

  export default {
    name:"demo",
    data() {
      return {
        msgData: '',
        sendMsg:'',
        id:this.$store.getters.id,
        sendTo:''
      }
    },
    created() {
      this.initWebSocket()
    },
    destroyed: function () {
      this.websocketclose();
    },
    methods: {
      initWebSocket: function () {
        let con="ws://192.168.3.8:8080/websocket/".concat(this.id.toString())
        console.log(con)
        this.websock = new WebSocket(con);
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen: function () {
        console.log("WebSocket连接成功");
      },
      websocketonerror: function (e) {
        console.log("WebSocket连接发生错误");
      },
      websocketonmessage: function (e) {
        var da = e.data;
        console.log(da);
        this.msgData=da.toString();
      },
      websocketclose: function (e) {
        console.log("connection closed (" + e.code + ")");
      },
      send(){
        sendMsg({sendFrom:this.id,sendTo:this.sendTo,msg:this.sendMsg})
      }
    }
  }
</script>

<style scoped>

</style>
