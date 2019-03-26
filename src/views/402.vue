<template>
  <div>
    <show-table tableType="Shop" :tableKey="shopKey" :dataSpread="shopDataType" :dataExpand="shopExpand"></show-table>
    <show-table tableType="User" :tableKey="userKey" :dataSpread="userDataType" :dataExpand="userExpand"></show-table>
  </div>
</template>

<script>
  import {getShopListPage,getUserListPage} from "@/api/admin";
  export default {
    name: "402",
    components:{
      'ShowTable':resolve => require(["@/components/ShowTable.vue"], resolve),
    },
    data(){
      return{
        shopDataType:[
          {prop:"shopId",tag:"商户ID",type:"label"},
          {prop:"shopName",tag:"商户名称",type:"label"},
          {prop:"brandId",tag:"品牌ID",type:"label"},
          {prop:"phone",tag:"联系电话",type:"label"},
        ],
        shopExpand:[
          {prop:"display",tag:"品牌展图",type:"img"},
          {prop:"logo",tag:"品牌logo",type:"img"},
          {prop:"brandId",tag:"品牌ID",type:"label"},
          {prop:"brandName",tag:"品牌名称",type:"label"},
        ],
        shopKey:["shopId"],
        userKey:["name"],
        userDataType:[
          {prop:"name",tag:"姓名",type:"label"},
          {prop:"sex",tag:"性别",type:"label"},
          {prop:"age",tag:"年龄",type:"label"},
          {prop:"birth",tag:"生日",type:"label"},
          {prop:"avatar",tag:"头像",type:"img"}
        ],
        userExpand:[
          {prop:"addr",tag:"地址",type:"label"}
        ]
      }
    },
    methods:{
      getShops(){
        //NProgress.start();
        let para = {
          page: 1,
          name: ''
        };
        getShopListPage(para).then((data) => {
          this.shops = data.data.shops;
          //NProgress.done();
        });
      },
      getUsers() {
        //NProgress.start();
        let para = {
          page: 1,
          name: ''
        };
        getUserListPage(para).then((data) => {
          this.users = data.data.users;
          //NProgress.done();
        });
      },
    },
    mounted() {
      /*this.getUsers()
      this.getShops()*/
    }
  }
</script>

<style scoped>

</style>
