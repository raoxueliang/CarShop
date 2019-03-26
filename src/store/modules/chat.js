import {  getUserInfo } from '@/api/user'

const now = new Date();
const chat = {
  state: {
    // 会话列表
    sessions: [
      {
        key:'admin',
        user:{
          id:'admin',
          name:'admin',
          avatar:'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png'
        },
        messages:[
          {
            content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
            date: now,
            self:false,
            status:1
          }, {
            content: '项目地址: https://github.com/coffcer/vue-chat',
            date: now,
            self:false,
            status:1
          }
        ]
      },
      {
        key:'superAdmin',
        user:{
          id:'superAdmin',
          name:'superAdmin',
          avatar:'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png'
        },
        messages:[
          {
            content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
            date: now,
            self:false,
            status:1
          }, {
            content: '项目地址',
            date: now,
            self:false,
            status:1
          }
        ]
      },
    ],
    // 当前选中的会话
    currentSessionId: 'admin',
    // 过滤出只包含这个key的会话
    filterKey: ''
  },
  mutations: {
    INIT_DATA (state) {
      let data = localStorage.getItem(this.state.user.id);
      if (data) {
        state.sessions = JSON.parse(data);
      }
    },
    // 发送消息
    SEND_MESSAGE ({ sessions, currentSessionId }, data) {
      let session = sessions.find(item => item.key === currentSessionId);
      session.messages.push({
        content: data.content,
        date: new Date(),
        self: data.self,
        status:data.status
      });
      let obj=JSON.stringify(this.state.chat.sessions)
      localStorage.setItem(this.state.user.id,obj)
    },
    // 选择会话
    SELECT_SESSION (state, key) {
      state.currentSessionId = key;
    } ,
    // 搜索
    SET_FILTER_KEY (state, value) {
      state.filterKey = value;
    },
    ADD_SESSION(state,id){
      let session = state.sessions.find(item => item.key === id);
      if(typeof(session)!=="undefined"){
        throw "该用户已存在对话中"
      }else{
        getUserInfo(id).then(response => {
          let to=response.data
          state.sessions.push({
            key:id,
            user:to,
            messages:[]
          })
          state.currentSessionId=id
        })
        let obj=JSON.stringify(this.state.chat.sessions)
        localStorage.setItem(this.state.user.id,obj)
      }
    },
    CLEAR_MESSAGES(state,key){
      let session = state.sessions.findIndex(item => item.key === key);
      state.sessions.splice(session,1);
      let obj=JSON.stringify(this.state.chat.sessions)
      localStorage.setItem(this.state.user.id,obj)
    }
  },

  actions:{
    InitData({commit}){
      return new Promise(resolve => {
        commit('INIT_DATA')
        resolve()
      })
    },
    SendMessage({commit},data){
      return new Promise(resolve => {
        commit('SEND_MESSAGE',data)
        resolve()
      })
    },
    SelectSession({commit},key){
      return new Promise(resolve => {
        commit('SELECT_SESSION',key)
        resolve()
      })
    },
    Search({commit},value){
      return new Promise(resolve => {
        commit('SET_FILTER_KEY',value)
        resolve()
      })
    },
    AddSession({commit},id){
      return new Promise(resolve => {
        commit('ADD_SESSION',id)
        resolve()
      })
    },
    ClearMessages({commit},key){
      return new Promise(resolve => {
        commit('CLEAR_MESSAGES',key)
        resolve()
      })
    }
  }
}

export default chat
