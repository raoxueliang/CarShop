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
      <el-table :data="cars"
                header-row-class-name="center"
                height="480"
                v-loading="listLoading"
                border>
        <el-table-column type="index" label="No." width="50px" ></el-table-column>
        <el-table-column prop="title" label="书名" ></el-table-column>
        <el-table-column prop="author" label="作者" ></el-table-column>
        <el-table-column prop="img" label="图片地址"></el-table-column>
        <el-table-column prop="isbn" label="ISBN号" ></el-table-column>
        <el-table-column prop="type" label="类型" ></el-table-column>
        <el-table-column label="操作" width="220" align="center" >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-setting">编辑</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar">
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
        </el-pagination>
      </el-col>

      <!--添加书籍-->
      <el-dialog title="添加书籍" :visible.sync="dialogCreateVisible">
        <el-form id="#create" :model="create" ref="create" label-width="100px">
          <el-form-item label="书名" prop="title">
            <el-input v-model="create.title" ></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="create.author"></el-input>
          </el-form-item>
          <el-form-item label="图片地址" prop="img">
            <el-input v-model="create.img"></el-input>
          </el-form-item>
          <el-form-item label="ISBN号" prop="isbn">
            <el-input v-model="create.isbn" ></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-input v-model="create.type" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogCreateVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </el-dialog>

      <!--编辑书籍信息-->
      <el-dialog
        title="修改订单信息"
        :visible.sync="dialogUpdateVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-form id="#update" :model="update" ref="update" label-width="100px">
          <el-form-item label="书名" prop="title">
            <el-input disabled="true" v-model="update.title" ></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="update.author"></el-input>
          </el-form-item>
          <el-form-item label="图片地址" prop="img">
            <el-input v-model="update.img"></el-input>
          </el-form-item>
          <el-form-item label="ISBN号" prop="isbn">
            <el-input v-model="update.isbn" ></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-input v-model="update.type" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogUpdateVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import {getGoodsListPage} from "@/api/admin";
  export default {
    name: "ShowGoods",
    data(){
      return{
        filters: {
          name: ''
        },
        cars: [],
        dialogCreateVisible:false,
        dialogUpdateVisible:false,
        listLoading:false,
        total: 0,
        page: 1,
        sel:[],
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
    methods:{
      handleCurrentChange(val) {
        this.page = val;
        this.getGoods();
      },
      getGoods(){
        this.listLoading = true;
        //NProgress.start();
        let para = {
          page: this.page,
          name: this.filters.name
        };
        getGoodsListPage(para).then((data) => {
          this.total = data.data.total;
          this.users = data.data.users;
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
            this.getGoods();
          });
        }).catch(() => {

        });
      },
    },
    mounted() {
      console.log("123")
      this.getGoods()
    }
  }
</script>

<style scoped>

</style>
