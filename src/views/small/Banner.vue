<template>
<div class="banner">
  <el-button  style="float: right" type="primary" @click="uploadFile=true">添加</el-button>
  <el-table
      :data="tableData"
      border
      style="width: 100%">
    <el-table-column
        label="图片"
      >
      <template slot-scope="scope">
       <el-image fit="cover"  :src="scope.row.url" v-if="scope.row.url"></el-image>

      </template>


    </el-table-column>
    <el-table-column
        label="操作"
        width="100"
    >
      <template slot-scope="scope">
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
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
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
      this.imageUrl=res.url

    },
    addBanner(){
      addBanner(this.imageUrl).then(res=>{
        this.$message.success('添加成功')
        this.uploadFile=false
        this.getBannerList()
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