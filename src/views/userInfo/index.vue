<template>
  <div class="all-container" style="margin-top: 40px">
    <div style="width: 70%;margin-left: 15%;height: 100%">
      <el-tabs type="border-card" v-model="tabNow">
        <el-tab-pane label="基本信息" name="user">
          <el-form id="user-form" :model="userInfo" :rules="userInfoRule" :label-width="formLabelWidth" status-icon label-position="left">
            <el-form-item label="头像" prop="avatar_url">
              <el-upload action="" class="avatar-upload">
                <img width="100px" v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-col :span="8"><el-input v-model="userInfo.id" disabled class="user-input"></el-input></el-col>
            </el-form-item>
            <el-form-item label="用户角色" prop="full_name">
              <el-col :span="8"><el-input v-model="userInfo.roles" disabled class="user-input"></el-input></el-col>
            </el-form-item>
            <el-form-item label="昵称" prop="username">
              <el-col :span="8"><el-input v-model="userInfo.name" class="user-input"></el-input></el-col>
            </el-form-item>
            <el-form-item label="性别" prop="username">
              <el-select v-model="userInfo.sex" id="user-sex">
                <el-option label="未知" value="-1" disabled></el-option>
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-col :span="8"><el-input v-model="userInfo.phone" placeholder="请输入电话" class="user-input"></el-input></el-col>
            </el-form-item>
            <el-form-item label="收货地址" prop="username">
              <area-select id="area-select" v-model="area" type="text" :placeholders='placeholders' :level="2" :data="pcaa"></area-select>
              <el-col :span="8"><el-input v-model="userInfo.loc" class="user-input" style="margin-top: 20px"></el-input></el-col>
            </el-form-item>
          </el-form>
          <div class="grid-content bg-purple">
            <el-button type="primary"  @click="EditorUserClick('userlist')" >保存</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="password">
          <el-form :model="changePwd" :rules="changePwdRule" :label-width="formLabelWidth" status-icon label-position="left">
            <el-form-item label="原密码" prop="pass">
              <el-col :span="8"><el-input class="user-input" v-model="changePwd.old" placeholder="请输入原密码" type="password"></el-input></el-col>
            </el-form-item>
            <el-form-item label="新密码" prop="newpass">
              <el-col :span="8"><el-input class="user-input" v-model="changePwd.new" placeholder="请输入新密码" id="newkey" type="password"></el-input></el-col>
            </el-form-item>
            <el-form-item label="重复新密码" prop="checknewpass">
              <el-col :span="8"><el-input class="user-input" v-model="changePwd.checkNew" placeholder="请再次输入新密码" id='newkey1' type="password"></el-input></el-col>
            </el-form-item>
          </el-form>
          <div class="grid-content bg-purple">
            <el-button type="primary"  @click="EditorUserClick('userlist')" >保存</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import { pca, pcaa } from "area-data";
  export default {
    data(){
      return{
        userInfo:this.$store.getters.user,
        tabNow:'user',
        changePwd:{
          old:'',
          new:'',
          checkNew:''
        },
        formLabelWidth:"150px",
        area:[],
        placeholders: ['选择省','选择市','选择区'],
        pcaa:pcaa,
        userInfoRule:[],
        changePwdRule:[]
      }
    }
  }
</script>
<style lang="less" scoped>
  .avatar-upload{
    display: flex;
    margin-left: 160px;
  }
  .el-select{
    display: flex;
    width: 475px;
  }
  .user-input{
    width: 475px;
  }
  #user-info{
    margin: auto;
  }
</style>
