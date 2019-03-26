<template>
  <div>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="shops"
              max-height="600"
              header-row-class-name="center"
              height="480"
              border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="品牌 ID">
              <span style="margin-left: 11px">{{ props.row.brandId }}</span>
            </el-form-item>
            <el-form-item label="品牌名称">
              <span>{{ props.row.brandName }}</span>
            </el-form-item>
            <el-form-item label="品牌展图">
              <span>{{ props.row.display }}</span>
            </el-form-item>
            <el-form-item label="品牌logo">
              <span>{{ props.row.logo }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index" label="No." width="50" ></el-table-column>
      <el-table-column prop="shopId" label="商户ID" ></el-table-column>
      <el-table-column prop="shopName" label="商户名" ></el-table-column>
      <el-table-column label="品牌ID">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <el-button style="margin-left: 10px" type="text">{{ scope.row.brandId }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系电话" ></el-table-column>
      <el-table-column label="操作" width="220" align="center" >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-setting" @click="setCurrent(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="removed(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>


    <!--添加订单-->
    <el-dialog title="添加商户" :visible.sync="addFormVisible">
      <el-form id="#create" :model="addForm" ref="create" label-width="100px">
        <el-form-item label="品牌ID" prop="ordernum">
          <el-input v-model="addForm.brandid"></el-input>
        </el-form-item>
        <el-form-item label="品牌名" prop="id">
          <el-input v-model="addForm.branndname"></el-input>
        </el-form-item>
        <el-form-item label="展示图" prop="title">
          <el-input v-model="addForm.display" ></el-input>
        </el-form-item>
        <el-form-item label="商标" prop="sum">
          <el-input v-model="addForm.logo" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑订单信息-->
    <el-dialog
      title="修改商户信息"
      :visible.sync="editFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form id="#update" :model="editForm" ref="update" label-width="100px">
        <el-form-item label="品牌ID" prop="ordernum">
          <el-input disabled v-model="editForm.brandid"></el-input>
        </el-form-item>
        <el-form-item label="品牌名" prop="id">
          <el-input v-model="editForm.brandname"></el-input>
        </el-form-item>
        <el-form-item label="展示图" prop="title">
          <el-input v-model="editForm.display" ></el-input>
        </el-form-item>
        <el-form-item label="商标" prop="sum">
          <el-input v-model="editForm.logo" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import {getShopListPage} from "@/api/admin";
  export default {
    name: "ShowShop",
    data(){
      return{
        filters: {
          name: ''
        },
        shops: [],
        listLoading:false,
        total: 0,
        page: 1,
        sels: [],//列表选中列

        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        //编辑界面数据
        editForm: {
          brandid: 0,
          branndname: '',
          display: '',
          logo: '',
        },

        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        //新增界面数据
        addForm: {
          brandid: 0,
          branndname: '',
          display: '',
          logo: '',
        }
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.getShop();
      },
      getShop(){
        this.listLoading = true;
        //NProgress.start();
        let para = {
          page: this.page,
          name: this.filters.name
        };
        getShopListPage(para).then((data) => {
          console.log(data)
          this.total = data.data.total;
          this.shops = data.data.shops;
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
          let para = { id: row.id };
          removeUser(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getShop();
          });
        }).catch(() => {

        });
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        };
      },
      //编辑
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);
              para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              editUser(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getUsers();
              });
            });
          }
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
              para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              addUser(para).then((res) => {
                this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getUsers();
              });
            });
          }
        });
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //批量删除
      batchRemove: function () {
        var ids = this.sels.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveUser(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getUsers();
          });
        }).catch(() => {

        });
      }
    },
    mounted() {
      //TODO: 加载数据
      this.getShop()
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
