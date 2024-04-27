<template>
  <div class="push">
    <el-table
        :data="pushList"
        stripe
        style="width: 100%">
      <el-table-column
          prop="id"
          label="编号"
      >
      </el-table-column>

      <el-table-column
          prop="conter"
          label="内容"

      >
        <tepelate slot-scope="scope" >
          <el-input
              v-if="scope.row.id!==4"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="scope.row.conter">
          </el-input>
          <div class="block" v-else>
            <el-color-picker v-model="'#'+scope.row.conter"></el-color-picker>
          </div>
        </tepelate>
      </el-table-column>
      <el-table-column
          prop="type"
          label="类型"
      >
      </el-table-column>


      <el-table-column
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="updatePushOrSure(scope.row)">修改</el-button>
        </template>
      </el-table-column>


    </el-table>

    <el-dialog
        :title="'修改'+this.row.type"
        :visible.sync="showUpdate"
        width="50%"
        center>

      <span>需要注意的是内容是默认不居中的</span>

      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>

import {getPush, getSure, updateColor, updatePush, updateSpeed, updateSure} from "@/api/user";

export default {
  name: "push",
  methods: {
    getPush() {
      getPush().then(res => {
        console.log(res)
        this.push=res.data.push
        this.pushList.push({conter:this.push.push,type:'公告',id:2})
        this.pushList.push({conter:this.push.speed,type:'小喇叭速度【越小越慢】',id:3})
        this.pushList.push({conter:this.push.color,type:'颜色',id:4})

      })
    },
    getSure() {
      getSure().then(res => {
        console.log(res)
        this.sure=res.data.sure
        this.pushList.push({conter:this.sure,type:'须知',id:1})
      })
    },
    updatePushOrSure(row){
      this.row=row
      if (row.id===1){
        //修改须知
        updateSure(this.row.conter).then(res=>{
          this.$message.success('修改成功')
        })
      }else if(row.id===3){
         updateSpeed(this.row.conter).then(res=>{
           this.$message.success('修改成功')

         })
      }else if(row.id===4){
        console.log(this.row.conter)

        updateColor(this.row.conter.substring(1)).then(res=>{
          this.$message.success('修改成功')

        })
      }
      else{
        //修改公告
        updatePush(this.row.conter).then(res=>{
          this.$message.success('修改成功')
        })
      }
    },
  },
  data() {
    return {
      pushList: [],
      sure:'',
      push:'',
      showUpdate:false,
      row:{}
    }
  },


  created() {
    this.getPush()
    this.getSure()

  }
}
</script>
<style scoped>

</style>