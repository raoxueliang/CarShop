<template>
  <div>
    <transition name="el-zoom-in-center">
      <show-normal v-show="active==='-1'"></show-normal>
    </transition>
    <transition name="el-zoom-in-center" v-for="(o,index) in data" :key="index+1">
      <show-table :addFormRules="o.addRules"  :tableType="o.type" :tableKey="o.key" :dataSpread="o.spread" :dataExpand="o.expand" class="table"  v-show="active===index.toString()"></show-table>
    </transition>
  </div>
</template>

<script>
  import rule from "@/utils/rule";
  export default {
    name: "AdminMain",
    props:{
      active:{
        required:true,
        default:0
      },
    },
    components: {
      ShowNormal: resolve => require(["./adminHome"],resolve),
      ShowTable: resolve => require(["@/components/ShowTable"],resolve)
    },
    data(){
      return{
        data:[
          {
            type:"User",
            key:["id"],
            spread:[
              {prop:"avatar",tag:"头像",type:"img"},
              {prop:"id",tag:"账号",type:"label",add:true},
              {prop:"name",tag:"姓名",type:"input",add:true},
              {prop:"sex",tag:"性别",type:"input",add:true},
            ],
            expand:[
              {prop:"phone",tag:"联系电话",type:"input,add:true"},
              {prop:"loc",tag:"地址",type:"input",add:true},
              {prop:"token",tag:"token",type:"label"},
              {prop:"status",tag:"登陆状态",type:"label"}
            ],
            addRules:{
              id:rule.ID
            }
          },
          {
            type:"Brand",
            key:["brandId"],
            spread:[
              {prop:"brandId",tag:"品牌ID",type:"label"},
              {prop:"brandName",tag:"品牌名称",type:"label"},
              {prop:"display",tag:"展示图",type:"img"},
              {prop:"logo",tag:"logo",type:"img"},
            ],
            expand:[

            ]
          },
          {
            type:"Shop",
            key:["shopId"],
            spread:[
              {prop:"shopId",tag:"商户ID",type:"label",add:true},
              {prop:"shopName",tag:"商户名称",type:"label",add:true},
              {prop:"brand",val:'brandId',tag:"品牌ID",type:"label",add:true},
              {prop:"phone",tag:"联系电话",type:"label",add:true},
            ],
            expand:[
              {prop:"brand",val:"display",tag:"品牌展图",type:"img"},
              {prop:"brand",val:"logo",tag:"品牌logo",type:"img"},
              {prop:"brand",val:"brandId",tag:"品牌ID",type:"label",add:true},
              {prop:"brand",val:"brandName",tag:"品牌名称",type:"label"},
            ],
            addRules:{
              shopId:rule.ID
            }
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
    mounted() {
      console.log(this.data[1].spread[2].val)
    }
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
