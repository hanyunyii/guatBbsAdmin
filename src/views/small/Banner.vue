<template>
<div class="banner">
  <el-button  style="float: right;" type="primary"  @click="uploadFile=true,imageType=0">添加Banner图</el-button>
  <el-button  style="float: right;margin-right: 6px" type="primary" @click="uploadFile=true,imageType=1">添加滚动图</el-button>
  <el-table
      :data="tableData"
      border
      style="width: 100%">
    <el-table-column
        label="图片"
      >
      <template slot-scope="scope" v-if="scope.row.type!==3">

       <el-image fit="cover"  :src="scope.row.url" v-if="scope.row.url"></el-image>

      </template>


    </el-table-column>
    <el-table-column
        label="类型"
        width="100"
    >
      <template slot-scope="scope" v-if="scope.row.type!==3">
           <span>{{scope.row.type===0?'banner':'滚动图'}}</span>
      </template>


    </el-table-column>
    <el-table-column
        label="操作"
        width="100"
    >
      <template slot-scope="scope" v-if="scope.row.type!==3">
        <el-button type="danger" icon="el-icon-delete"  @click="removeBanner(scope.row.id)" circle></el-button>
      </template>


    </el-table-column>
  </el-table>


  <el-dialog
      title="上传图片"
      :visible.sync="uploadFile"
      width="80%"
    >

    <el-upload
        class="avatar-uploader"
        action="https://lxhz123.com:9919/file/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
       >
      <el-image  v-if="imageUrl!==''" :src="imageUrl" class="avatar"></el-image>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <span slot="footer" class="dialog-footer">
    <el-button @click="uploadFile = false">取 消</el-button>
    <el-button type="primary" @click="addBanner">确 定</el-button>
  </span>
  </el-dialog>


</div>
</template>

<script>
import {addBanner, deleteBanner, getBannerList} from "@/api/banner";

export default {
  name: "Banner",
  data(){
    return{
      imageUrl:'',
      imageType:'',
      uploadFile:false,
      tableData: [{

      }],
    }
  },
  methods:{
    removeBanner(id){
      deleteBanner(id).then(res=>{
        this.$message.success('删除成功')
        this.getBannerList()

      })
    },
    handleAvatarSuccess(res){
      console.log('上传成功',res)


      this.imageUrl=res.msg
if (this.imageUrl!==''){
  this.$message.success('上传成功')

}
    },
    addBanner(){
      addBanner(this.imageUrl,this.imageType).then(res=>{
        this.$message.success('添加成功')
        this.uploadFile=false
        this.getBannerList()
        this.imageUrl=''
      })

    },
    getBannerList(){
      getBannerList().then(res=>{
        console.log(res)
        this.tableData=res.data.list
      })
    },
  },
  created() {
    this.getBannerList()
  }
}
</script>

<style scoped>

</style>