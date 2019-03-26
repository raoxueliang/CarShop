<template>
    <div>
      <el-menu :default-active="active" :collapse-transition="true" :collapse="isCollapse" @select="handleSelect">
        <transition-group name="el-zoom-in-center">
          <el-menu-item v-for="(o,index) in menuItem" :index="index+''" :key="index+1" v-show="showPermission(o.authority)">
            <svg-icon :icon-class="o.icon"></svg-icon>
            <span slot="title">{{o.title}}</span>
          </el-menu-item>
        </transition-group>

      </el-menu>
    </div>
</template>

<script>
  export default {
    name: "AdminAside",
    props:{
      isCollapse:{
        type:Boolean,
        default:true,
      },
      active:{
        type:String,
        required:true
      }
    },
    data() {
      return{
        menuItem:[
          {icon:"user",title:"用户管理",authority:'superAdmin'},
          {icon:"bank",title:"店铺管理",authority:'superAdmin'},
          {icon:"archive",title:"商品管理",authority:'admin'},
          {icon:"shopping-cart",title:"订单管理",authority:'admin'}
        ]
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        this.$emit("switch",{key:key})
      },
      showPermission(authority){
        let roles = this.$store.getters && this.$store.getters.roles
        const tempRoles= this.$store.getters && this.$store.getters.tempRoles
        if(tempRoles && tempRoles.length>0){
          roles="admin"
        }
        return authority===roles
      }
    },
    computed:{

    }
  }
</script>

<style scoped>
  .el-menu{
    border: none;
  }
</style>
