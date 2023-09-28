<template>
    <div class="table-container">
      <div class="filter-container">
        <el-input
          v-model="listQuery.name"
          placeholder="name"
          clearable
          style="width: 200px"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        ></el-input>
        <el-select
          v-model="listQuery.region"
          clearable
          placeholder="区域"
          style="width: 90px"
          class="filter-item"
        >
          <el-option
            v-for="item in regions"
            :label="item"
            :key="item"
            :value="item"
          ></el-option>
        </el-select>
        <el-select
          v-model="listQuery.classification"
          clearable
          placeholder="类型"
          style="width: 130px"
          class="filter-item"
        >
          <el-option
            v-for="item in types"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <el-select
          v-model="listQuery.sort"
          style="width: 140px"
          clearable
          class="filter-item"
          @change="handleFilter"
        >
          <el-option
            v-for="item in sortOptions"
            :key="item.key"
            :value="item.key"
            :label="item.label"
          ></el-option>
        </el-select>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
          >搜索</el-button
        >
        <el-button
          type="primary"
          class="filter-item"
          style="margin-left: 10px"
          icon="el-icon-edit"
          @click="handleCreate"
          >添加</el-button
        >
        <el-button
          :loading="downloadLoading"
          class="filter-item"
          icon="el-icon-download"
          @click="handleDownload"
          >导出</el-button
        >
      </div>
     
      <el-table
       max-height="500"
       ref="multipleTable"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
        @sort-change="sortChange"
        @selection-change="handleSelectChange"
      >
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column
          label="序号"
          prop="id"
          sortable="custom"
          align="center"
          width="50"
          :class-name="getSortClass('id')"
        >
          <template slot-scope="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="矿区名" width="150px" align="center">
          <template slot-scope="{ row }">
            <span class="link-type" @click="handleImg(row)">{{
              row.name
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="行政区" width="150px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.region }}</span>
          </template>
        </el-table-column>
        <el-table-column label="面积(Km²)" width="100px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.area }}</span>
          </template>
        </el-table-column>
        <el-table-column label="主要矿产" width="120px" align="center">
          <template slot-scope="{ row }">
            <span class="link-type" @click="handleProductShow(row)">{{
              row.products
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" min-width="150px">
          <template slot-scope="{ row }">
            <span>{{ row.notes }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" class-name="state-col" width="100">
          <template slot-scope="{ row }">
            <el-tag :type="row.state | stateFilter">
              {{ row.state }}
            </el-tag>
          </template>
        </el-table-column>
  
        <el-table-column
          label="操作"
          align="center"
          width="230"
          class-name="small-padding fixed-width"
          fixed="right"
        >
          <template slot-scope="{ row, $index }">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button
              v-if="row.state != 'published'"
              size="mini"
              type="success"
              @click="handleModifystate(row, 'published')"
            >
              发布
            </el-button>
            <el-button
              v-if="row.state != 'draft'"
              size="mini"
              @click="handleModifystate(row, 'draft')"
            >
              草稿
            </el-button>
            <el-button
              v-if="row.state != 'deleted'"
              size="mini"
              @click="handleDelete(row, $index)"
              type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 页尾 -->
      <el-pagination
        :total="total"
        :current-page.sync="listQuery.page"
        :page-sizes="pageSizes"
        :page-size="listQuery.limit"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
      <!-- 添加数据 -->
      <el-dialog :title="textMap[dialogstate]" :visible.sync="dialogFormVisible">
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="temp"
          label-position="left"
          label-width="70px"
          style="width: 400px; margin-left: 50px"
        >
          <el-form-item label="类型" prop="classification">
            <el-select v-model="temp.classification" placeholder="请选择">
              <el-option
                v-for="item in types"
                :key="item"
                :value="item"
                :label="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="矿区名" prop="name">
            <el-input v-model="temp.name" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              v-model="temp.state"
              placeholder="请选择"
              class="filter-item"
            >
              <el-option
                v-for="item in stateOptions"
                :key="item.key"
                :value="item.key"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面积">
            <el-input v-model="temp.area" />
          </el-form-item>
          <el-form-item label="主要矿产">
            <el-input v-model="temp.products" />
          </el-form-item>
          <el-form-item label="钨" size="mini">
            <el-input v-model="temp.tungsten" placeholder="请输入产量"/>
          </el-form-item>
          <el-form-item label="铁" size="mini">
            <el-input v-model="temp.cutter" />
          </el-form-item>
          <el-form-item label="铜" size="mini">
            <el-input v-model="temp.copper" />
          </el-form-item>
          <el-form-item label="银" size="mini">
            <el-input v-model="temp.silver" />
          </el-form-item>
          <el-form-item label="铅" size="mini">
            <el-input v-model="temp.lead" />
          </el-form-item>
          <el-form-item label="锌" size="mini">
            <el-input v-model="temp.zinc" />
          </el-form-item>
          <el-form-item label="钽" size="mini">
            <el-input v-model="temp.tantalum" />
          </el-form-item>
          <el-form-item label="铌" size="mini">
            <el-input v-model="temp.niobium" />
          </el-form-item>
          <el-form-item label="稀土" size="mini">
            <el-input v-model="temp.tombarthite" />
          </el-form-item>
          <el-form-item label="萤石" size="mini">
            <el-input v-model="temp.fluorite" />
          </el-form-item>
          <el-form-item label="其它" size="mini">
            <el-input v-model="temp.other" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="temp.notes"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
              placeholder="请输入"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="dialogstate == 'create' ? createData() : updateDate()"
            >确定</el-button
          >
        </div>
      </el-dialog>

      <el-dialog title="矿山开采图片" :visible.sync="dialogUploadVisible">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8888/table/img"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div slot="footer" class="dialog-footer">
            <el-button @click="uploadImgQ">取消</el-button>
            <el-button type="primary" @click="uploadImgQ">确定</el-button>
          </div>
      </el-dialog>
      <!-- 详细矿区储量 -->
      <el-dialog title="矿区产量" :visible.sync="dialogProVisual">
        <el-table
          :data="productsData"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column prop="name" label="矿产"></el-table-column>
          <el-table-column prop="value" label="产量"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogProVisual = false"
            >确定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { HttpManager } from '../../api/index';
  export default {
    name: "Table",
    filters:{
      stateFilter(state){
          const stateMap = {
              published:'success',
              draft:'info',
              deleted:'danger',
          }
          return stateMap[state]
      }
    },
    data() {
      return {
        multipleSelection:[],
        downloadLoading:false,
        dialogUploadVisible:false,
        imageUrl: '',
        filename:'',
        page: 1,
        pageSizes: [5, 10, 20, 30],
        listLoading: true,
        total:0,
        listQuery: {
          page: 1,
          limit: 10,
          name: '',
          region: '',
          classification: '',
          sort: "+id",
        },
        regions: [
          "南昌市",
          "新余市",
          "赣州市",
          "九江市",
          "鹰潭市",
          "景德镇市",
          "宜春市",
          "上饶市",
          "萍乡市",
          "抚州市",
          "吉安市",
        ],
        types: ["重点开采区", "限制开采区", "鼓励开采区", "矿产资源储备区"],
        sortOptions: [
          { label: "ID Ascendeing", key: "+id" },
          { label: "ID Descendeing", key: "-id" },
        ],
        
        dialogProVisual: false,
        list: [
          {
            id: 1,
            name: "矿区1",
            region: "新余市",
            area: 12,
            products: "铁|铜",
            notes: "今年产量较低",
            state: "published",
            tungsten: 1,
            cutter: 1,
            copper: 0,
            silver: 0,
            lead: 0,
            zinc: 0,
            tantalum: 1,
            niobium: 2,
            tombarthite:1,
            fluorite: 1,
            other: 12,
          },
        ],
        productsData: [
          {name:'铁',value:12},
          {name:'铜', value:12},
        ],
        
        textMap: {
          update: "编辑",
          create: "添加",
        },
        dialogstate: "",
        dialogFormVisible: false,
        rules: {
          name: [
            { required: true, message: "name is required", trigger: "blur" },
          ],
          classification: [
            {
              required: true,
              message: "classification is required",
              trigger: "change",
            },
          ],
        },
        stateOptions: [
          { key: "published", label: "发布" },
          { key: "draft", label: "草稿" },
          { key: "deleted", label: "删除" },
        ],
        temp: {
          id: undefined,
          number:'',
          name: "",
          region: "",
          classification:'',
          area: 0,
          lon:115,
          lat:33,
          products: "",
          notes: "",
          state: "published",
          tungsten: 0,
          cutter: 0,
          copper: 0,
          silver: 0,
          lead: 0,
          zinc: 0,
          tantalum: 0,
          niobium: 0,
          tombarthite: 0,
          fluorite: 0,
          other: 0,
        },
      };
    },
    computed: {
      currentPage: {
        get() {
          return this.page;
        },
        set(value) {
          this.$emit("update:page", value);
        },
      },
      pageSize: {
        get() {
          return this.limit;
        },
        set(value) {
          this.$emit("update:limit", value);
        },
      },
    },
    methods: {
      handleSizeChange(val) {
        // console.log("页数大小改变触发",val);
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        // console.log("页面改变触发",val);
        this.listQuery.page = val;
        this.getList();
      },
      //todo 处理详细的矿产信息
      handleProductShow(row){
        // console.log("====",row);
         HttpManager.getProductByName(row.name).then(result =>{
            // console.log(result);
            this.productsData = result.data.seriesData
         }) 
        this.dialogProVisual = true
      },
      handleUpdate(row){
          this.temp = Object.assign({}, row)//obj 复制
          // console.log(this.temp);
          this.dialogstate = 'update';
          this.dialogFormVisible = true;
          this.$nextTick(()=>{
              this.$refs['dataForm'].clearValidate()
          })
  
      },
      handleDelete(row, index){
        console.log(row);
        console.log(index);
      },
      sortChange(data) {
        const { prop, order } = data;
        if (prop == "id") {
          this.sortByID(order);
        }
      },
      sortByID(order) {
        if (order == "ascending") {
          this.listQuery.sort = "+id";
        } else {
          this.listQuery.sort = "-id";
        }
        this.handleFilter();
      },
      handleFilter() {
        this.listQuery.page = 1;
        this.getList();
      },
      // eslint-disable-next-line no-unused-vars
      handleImg(row){
        this.dialogUploadVisible = true;
      },
      getList() {
        this.listLoading = true;
        // console.log(this.listQuery);
        HttpManager.getList(this.listQuery 
        ).then(response => {
          // console.log(response);
          this.list = response.list
          this.total = response.count;
          
        })
       
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      },
      handleModifystate(row, state) {
        this.$notify({
          title: "成功",
          message: "操作成功",
          type: "success",
        });
        row.state = state;
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          name: "",
          region: "",
          area: 0,
          products: "",
          notes: "",
          state: "published",
          tungsten: 0,
          cutter: 0,
          copper: 0,
          silver: 0,
          lead: 0,
          zinc: 0,
          tantalum: 0,
          niobium: 0,
          tombarthite: 0,
          fluorite: 0,
          other: 0,
        };
      },
      handleCreate() {
      //   this.resetTemp();
      this.dialogstate = 'create';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        });
      },
      updateDate(){
        
        this.$refs['dataForm'].validate((val) => {
          if(val){
            HttpManager.updateTableInfo(this.temp).then((response)=>{
              if(response === "ok"){
                this.$notify({
                  title: "成功",
                  message: "更新成功",
                  type: "success",
                });
              }
              this.getList()
            })
            // console.log("处理更新");
            this.dialogFormVisible = false;
            // console.log(this.temp);

          }
        })
      },
      createData() {
        this.$refs["dataForm"].validate((valid) => {
          if (valid) {
            // console.log("===",this.temp);
            this.temp.id = this.total + 1;
            this.total = this.total + 1;
            // console.log("创建数据",this.temp);
            this.dialogFormVisible = false
          }
        });
      },
      getSortClass(key) {
        const sort = this.listQuery.sort;
        return sort === `+${key}` ? "ascending" : "descending";
      },


      handleSelectChange(val){
        this.multipleSelection = val;
        console.log(val);
      },

      handleDownload(){
        if(this.multipleSelection.length){
          this.downloadLoading = true;
          import('@/utils/Export2Excel').then((excel) => {
            const tHeader = ['序号', '矿区名', '行政区','面积','主要矿产','备注','钨','铁','铜','银','铅','锌','钽','铌','稀土','萤石','其它']
            const filterVal =['id', 'name', 'region','area','products','notes','tungsten','cutter','copper','silver','lead','zinc','tantalum','niobium','tombarthite','fluorum','other']
            const list = this.multipleSelection
            const data = this.formatFun(filterVal, list)
            excel.export_json_to_excel({
              header:tHeader,
              data,
              filename:'矿产资源储备区'
            })
            this.$refs.multipleTable.clearSelection()
            this.downloadLoading = false;
          })
        }else{
          this.$notify.error({
          title: "失败",
          message: "请不要下载超过1M的大小",
        });
        }
      },

      formatFun(filterVal, jsonData){
          return jsonData.map(v => filterVal.map(j=>v[j]))
      },

      uploadImgQ(){
        this.imageUrl = '';
        this.dialogUploadVisible=false
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 4;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 4MB!');
        }
        return isLt2M;
      }


    },



    created() {
      this.getList();
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .table-container {
    padding-top: 50px;
    width: 100%;
    height: 100%;
    background-color: rgba(42, 187, 242, 0.8);
    .filter-container {
      padding-bottom: 10px;
      .filter-item {
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 10px;
      }
    }
    
    .avatar-uploader  .el-upload{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }

      .avatar-uploader .el-upload:hover{
        border-color: #409EFF;
      }
  
    .avatar-uploader-icon{
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
      .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .link-type,
    .link-type:focus {
      color: #337ab7;
      cursor: pointer;
  
      &:hover {
        color: rgb(32, 160, 255);
      }
    }
  }
  </style>
  