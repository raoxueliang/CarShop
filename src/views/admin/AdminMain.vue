<template>
  <div>
    <transition-group name="el-zoom-in-center">
      <show-table v-for="(o,index) in data" :tableType="o.type" :tableKey="o.key" :dataSpread="o.spread" :dataExpand="o.expand" class="table" :key="index+1" v-show="active===index.toString()"></show-table>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name: "AdminMain",
    props:{
      active:{
        required:true,
        default:0
      },
    },
    components: {
      ShowMessage: resolve => require(["./ShowMessage.vue"], resolve),
      ShowShop: resolve => require(["./ShowShop.vue"], resolve),
      ShowCar: resolve => require(["./ShowCar.vue"],resolve),
      ShowUser: resolve => require(["./ShowUser.vue"],resolve),
      ShowTable: resolve => require(["@/components/ShowTable"],resolve)
    },
    data(){
      return{
        data:[
          {
            type:"User",
            key:["name"],
            spread:[
              {prop:"name",tag:"姓名",type:"label"},
              {prop:"sex",tag:"性别",type:"label"},
              {prop:"age",tag:"年龄",type:"label"},
              {prop:"birth",tag:"生日",type:"label"},
              {prop:"avatar",tag:"头像",type:"img"}
            ],
            expand:[
              {prop:"addr",tag:"地址",type:"label"}
            ]
          },
          {
            type:"Shop",
            key:["shopId"],
            spread:[
              {prop:"shopId",tag:"商户ID",type:"label"},
              {prop:"shopName",tag:"商户名称",type:"label"},
              {prop:"brandId",tag:"品牌ID",type:"label"},
              {prop:"phone",tag:"联系电话",type:"label"},
            ],
            expand:[
              {prop:"display",tag:"品牌展图",type:"img"},
              {prop:"logo",tag:"品牌logo",type:"img"},
              {prop:"brandId",tag:"品牌ID",type:"label"},
              {prop:"brandName",tag:"品牌名称",type:"label"},
            ]
          },
          {
            type:"Car",
            key:["name"],
            spread:[
              {prop:"name",tag:"姓名",type:"label"},
              {prop:"sex",tag:"性别",type:"label"},
              {prop:"age",tag:"年龄",type:"label"},
              {prop:"birth",tag:"生日",type:"label"},
              {prop:"avatar",tag:"头像",type:"img"}
            ],
            expand:[
              {prop:"addr",tag:"地址",type:"label"}
            ]
          },
          {
            type:"Order",
            key:["name"],
            spread:[
              {prop:"name",tag:"姓名",type:"label"},
              {prop:"sex",tag:"性别",type:"label"},
              {prop:"age",tag:"年龄",type:"label"},
              {prop:"birth",tag:"生日",type:"label"},
              {prop:"avatar",tag:"头像",type:"img"}
            ],
            expand:[
              {prop:"addr",tag:"地址",type:"label"}
            ]
          },
        ],
      }
    },

  }
</script>

<style scoped>
  .table{
    position: absolute;
    top:10px;
    left: 0;
    width: 100%;
    transition-duration: 0.3s;
    transition-property: all
  }
</style>
