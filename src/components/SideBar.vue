<template>
  <div style="height:100%;background-color: #222">
    <div>
      <el-tooltip class="item" transition="el-zoom-in-left" effect="dark" :content="sideBarItems[i-1].tag" placement="left" v-for="i in 3" :key="i">
        <i :class="sideBarItems[i-1].fa"></i>
      </el-tooltip>
    </div>
    <div style="height: calc(100% - 120px * 2)"></div>
    <div>
      <el-tooltip class="item" transition="el-zoom-in-left" effect="dark" placement="left"  key="4">
        <div slot="content">客服电话：<span style="font-size: 20px">XXXXXXXX</span><br/>服务时段：周一至周日9:00~21:00</div>
        <i class="fa fa-phone fa-lg"></i>
      </el-tooltip>
      <el-tooltip class="item" transition="el-zoom-in-left" effect="dark" :content="sideBarItems[i-1].tag" placement="left" v-for="i in [5,6]" :key="i">
        <i :class="sideBarItems[i-1].fa"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          //侧边栏项
          sideBarItems:[
            {fa:"fa fa-user fa-lg",tag:"我的"},
            {fa:"fa fa-shopping-cart fa-lg",tag:"购物车"},
            {fa:"fa fa-wrench fa-lg",tag:"工具箱"},
            {fa:"fa fa-phone fa-lg",tag:"客服电话"},
            {fa:"fa fa-map-marker fa-lg",tag:"定位"},
            {fa:"fa fa-angle-up fa-lg",tag:"返回顶部"},
          ],
          scrollTop: "",
          goTopShow: false
        }
      },
      methods:{
        toggleState(){
          // console.log(event.target);
          this.$emit('toggleSideBarBlank');
        },
        handleScroll() {
          this.scrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop;
          if (this.scrollTop > 500) {
            this.goTopShow = true;
          }
        },
        goTop() {
          let timer = null,
            _that = this;
          cancelAnimationFrame(timer);
          timer = requestAnimationFrame(function fn() {
            if (_that.scrollTop > 0) {
              _that.scrollTop -= 50;
              document.body.scrollTop = document.documentElement.scrollTop =
                _that.scrollTop;
              timer = requestAnimationFrame(fn);
            } else {
              cancelAnimationFrame(timer);
              _that.goTopShow = false;
            }
          });
        },
      },
      mounted() {
        window.addEventListener("scroll", this.handleScroll);
        document.getElementsByClassName("fa fa-angle-up")[0].addEventListener("click",this.goTop);
        document.getElementsByClassName("fa fa-wrench")[0].addEventListener("click",this.toggleState);
      },
      destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
      }
    }
</script>

<style scoped>
  .fa{
    float: top;
    width: 100%;
    margin-top: 20px;
  }
  i{
    color: #fff;
  }
  i:hover{
    color: red;
  }
</style>
