<template>
  <div>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-button v-if="this.$store.getters.tempRoles!==''" type="primary" @click="goBack">返回</el-button>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--显示数据-->
    <el-table :data="tableData"
              max-height="600"
              header-row-class-name="center"
              @selection-change="selItemsChange"
              height="480"
              border>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item v-for="o in dataExpand" :label="o.tag" :key="o.prop">
              <template>
                <label v-if="o.type==='label'" style="margin-left: 11px" >{{props.row[o.prop]}}</label>
                <img v-else-if="o.type==='img'" :src="props.row[o.prop]" :alt="props.row[o.prop]" style="width: 50px;height: 50px">
              </template>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <template v-for="o in dataSpread">
        <el-table-column v-if="o.type==='label'" :prop="o.prop" :label="o.tag"></el-table-column>
        <el-table-column v-else-if="o.type==='img'" :prop="o.prop" :label="o.tag">
          <template slot-scope="scope">
            <img :src="scope.row[o.prop]" :alt="scope.row[o.prop]" style="width: 50px;height: 50px">
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作" width="220" align="center" >
        <template slot-scope="scope">
          <el-button v-if="tableType==='Shop'" type="primary" size="mini" icon="el-icon-setting" @click="handleCheck(scope.$index, scope.row)">查看</el-button>
          <el-button v-else type="primary" size="mini" icon="el-icon-setting" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-button type="danger" :disabled="this.selItems.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item v-for="o in dataType" :label="o.tag" :prop="o.prop" :key="o.prop">
          <el-input v-if="o.type==='label'" v-model="editForm[o.prop]"></el-input>
          <el-upload v-else-if="o.type==='img'" action="" class="avatar-upload">
            <img width="50px" v-if="editForm[o.prop]" :src="editForm[o.prop]" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item v-for="o in dataType" :label="o.tag" :prop="o.prop" :key="o.prop">
          <el-input v-if="o.type==='label'" v-model="addForm[o.prop]"></el-input>
          <el-upload v-else-if="o.type==='img'" action="" class="avatar-upload">
            <img width="50px" v-if="addForm[o.prop]" :src="addForm[o.prop]" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as dataFunc from '@/api/admin'
  import * as dataAdd from '@/utils/object'
  import {unique} from "@/utils";

  export default {
    name: "ShowTable",
    props:{
      tableType:{
        type:String,
        required:true
      },
      tableKey:{
        type:Array,
        required:true
      },
      dataSpread:{
        type:Array,
        required:true
      },
      dataExpand:{
        type:Array,
        required:false
      }
    },
    data(){
      return{
        filters: {//过滤条件
          name: ''
        },
        tableData:[],
        dataType:[],
        getFuc:"",
        editFuc:"",
        removeFuc:"",
        addFuc:"",
        addObject:"",
        listLoading:false,//表格数据加载状态
        total: 0,//总页数
        page: 1,//当前页数
        selItems: [],//列表选中列

        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        //编辑界面数据
        editForm: Object,
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        //新增界面数据
        addForm: Object
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.getData();
      },
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = dataAdd[this.addObject];
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      handleCheck: function (index, row){
        this.$store.dispatch('SetTempRoles',row[this.tableKey]).then(()=>{

        })
      },
      goBack: function (index, row){
        this.$store.dispatch('ClearTempRoles').then(()=>{

        })
      },
      //编辑
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);
              dataFunc[this.editFuc](para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getData();
              });
            });
          }
        });
      },
      getData(){
        this.listLoading = true;
        //NProgress.start();
        let para = {
          page: this.page,
          name: this.filters.name
        };
        dataFunc[this.getFuc](para).then((data) => {
          this.total = data.data.total;
          this.tableData = data.data.datas;
          this.listLoading = false;
          //NProgress.done();
        });
      },
      //删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { };
          this.tableKey.forEach((key)=>{
            para[key]=row[key]
          })
          dataFunc[this.removeFuc](para).then((res) => {
            this.listLoading = false;
            console.log(para);
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getData();
          });
        }).catch(() => {

        });
      },
      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.addForm);
              dataFunc[this.addFuc](para).then((res) => {
                console.log(para)
                this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getData();
              });
            });
          }
        });
      },
      selItemsChange: function (sels) {
        this.selItems = sels;
      },
    },
    mounted() {
      //加载数据
      this.getFuc="get"+this.tableType+"ListPage"
      this.editFuc="edit"+this.tableType
      this.removeFuc="remove"+this.tableType
      this.addFuc=this.addObject="add"+this.tableType
      this.dataType=this.dataType.concat(this.dataSpread).concat(this.dataExpand)
      this.dataType.sort(function (a, b) {
        let order=["img","label"]
        return order.indexOf(a.type) - order.indexOf(b.type);
      })
      this.dataType=unique(this.dataType,"prop")
      if(this.getFuc!=="")
        this.getData()
    },

  }
</script>

<style lang="less" scoped>
  .toolbar{
    position: relative;
    &>button{
      position: absolute;
      left: 0px;
    }
  }
  .demo-table-expand {
    font-size: 0;
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 100%;
      &+label{
        width: 100px!important;
        color: #99a9bf;
      }
    }
  }

</style>
