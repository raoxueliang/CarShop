import router from './router'
import store from './store'
import { Message } from 'element-ui'
import {getToken} from "./utils/auth";
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/home', '/search','/shop','/register','/forgot','/product','/401','/404','/402','/demo']//  whitelist
const blackList= ['/user','/balance']

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken('token')) { // determine if there has token
    /* has token*/
    if (store.getters.roles=== '') { // 判断当前用户是否已拉取完user_info信息
      store.dispatch('GetUserInfo').then(res => { // 拉取user_info
        next({ ...to, replace: true })
      }).catch((err) => {
        store.dispatch('FedLogOut').then(() => { //拉取用户信息失败则清除token信息
          Message.error(err)
        })
      })
    } else {
      if(store.getters.roles==='user'&&to.path==='/admin')//普通用户无权限访问管理员页面则重定向到401
        next('/401')
      else
        next()
    }
  }else{
    /*has no token*/
    store.dispatch('UserInfoInit').then(res => {
      if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next()
      }else if(blackList.indexOf(to.path)!==-1){
        next(`/401`)//无权限访问则重定向到401
      }else {
        next(`/404`) // 否则全部重定向到404
        NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
      }
    })
  }
})


router.afterEach(() => {
  NProgress.done() // finish progress bar
})
