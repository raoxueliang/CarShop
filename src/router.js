import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        'topBar': resolve => require(["./components/TopBar.vue"], resolve),
        'sideBar': resolve => require(["./components/SideBar.vue"], resolve),
        'sideBarBlank': resolve => require(["./components/SideBarBlank.vue"], resolve),
        'bottomBar': resolve => require(["./components/BottomBar.vue"], resolve),
        'mainBox': resolve => require(["./components/MainBox.vue"], resolve),
      },
      redirect:'/home',
      children:[
        {
          path:'/home',
          name:'Home',
          component: resolve => require(["./views/Home.vue"], resolve),
        },
        {
          path:'/search',
          name:'search',
          component: resolve => require(["./views/SearchResult.vue"], resolve),
        }
      ]
    },
    {
      path:'/error404',
      name:'404',
      component: resolve => require(["./components/Error404.vue"], resolve),
      meta:{
        title: '404 not found'
      }
    },
    {
      path: "*", // 此处需特别注意置于最底部
      redirect: "/error404"
    }
  ]
})
