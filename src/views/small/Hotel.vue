<template>
  <div class="hotel">
    <el-button style="float: right" type="primary" @click="addHotel=true">添加</el-button>
    <el-table
        :data="tableData"
        border

        style="width: 100%">
      <el-table-column
          label="酒店名称"
          prop="name"
      >
      </el-table-column>
      <el-table-column
          label="推荐语"
          prop="recommend"
      >
      </el-table-column>

      <el-table-column
          label="客服电话"
          prop="phone"
      >
      </el-table-column>
      <el-table-column
          label="星级"
          prop="score"
      >
      </el-table-column>
      <el-table-column
          label="设施"
          >
        <template slot-scope="scope">
          <span style="color: blue" @click="showHotelFacilities=true" >查看设施详情</span>
        </template>
      </el-table-column>
      <el-table-column
          label="轮播图"

      >
        <template slot-scope="scope">
          <el-carousel height="150px" v-if="scope.row.banner!==''">
            <el-carousel-item v-for="item in scope.row.banner.split(',')" :key="item">
              <el-image
                  style="width: 100px; height: 100px"
                  :src="item"
                  :fit="'contain'"
                  :preview-src-list="scope.row.banner.split(',')"
              ></el-image>
            </el-carousel-item>

          </el-carousel>
        </template>
      </el-table-column>
      <el-table-column
          label="地址"

      >
        <template slot-scope="scope">
          <span>{{ scope.row.addr }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
          width="210"
      >
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" @click="removeHotel(scope.row.id)" circle></el-button>
          <el-button type="primary" icon="el-icon-edit"
                     @click="editHotel=true,hotel=scope.row,afterEditHotel(scope.row)" circle></el-button>
          <span style="margin-left: 10px;color: blue"
                @click="showHotelDetails=true,hotelDetails.hotelId=scope.row.id,getHotelDetailsList(scope.row.id)">查看房间列表</span>
        </template>


      </el-table-column>
    </el-table>


    <!--    添加酒店-->
    <el-dialog
        title="添加酒店"
        :visible.sync="addHotel"
        @close="hotel={}"
        width="30%"
    >

      <el-form label-width="80px" :model="hotel" :rules="hotelRules" ref="ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="hotel.name"></el-input>
        </el-form-item>
        <el-form-item label="推荐语" prop="recommend">
          <el-input v-model="hotel.recommend"></el-input>
        </el-form-item>
        <el-form-item label="客服电话" prop="phone">
          <el-input v-model="hotel.phone"></el-input>
        </el-form-item>
        <el-form-item label="星级" prop="phone">
          <el-input v-model="hotel.score"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="cityId">
          <div class="block">
            <el-cascader
                style="width: 100%"
                v-model="hotel.cityId"
                :options="areas"
                :props="{value:'areaId',label:'areaName',children:'areas'}"
                @change="selectAddr"
            ></el-cascader>
          </div>
        </el-form-item>
        <el-form-item label="详细地址" prop="addr">
          <el-input v-model="hotel.addr"></el-input>
        </el-form-item>
        <el-form-item label="轮播图">

          <el-upload
              action="https://lxhz123.com:9919/file/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :file-list="hotel.imglist2"

              :on-success="uploadOk"
              multiple
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addHotel = false">取 消</el-button>
    <el-button type="primary" @click="addHotelFn">确 定</el-button>
  </span>
    </el-dialog>
    <!--    修改酒店-->
    <el-dialog
        title="修改酒店"
        :visible.sync="editHotel"
        @close="hotel={}"
        width="30%"
    >

      <el-form label-width="80px" :model="hotel" :rules="hotelRules" ref="ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="hotel.name"></el-input>
        </el-form-item>
        <el-form-item label="推荐语" prop="recommend">
          <el-input v-model="hotel.recommend"></el-input>
        </el-form-item>
        <el-form-item label="客服电话" prop="phone">
          <el-input v-model="hotel.phone"></el-input>
        </el-form-item>
        <el-form-item label="星级" prop="phone">
          <el-input v-model="hotel.score"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="hotel.addr"></el-input>
        </el-form-item>

        <el-form-item label="轮播图">

          <el-upload
              action="https://lxhz123.com:9919/file/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="uploadOk"
              :file-list="hotel.imglist2"
              multiple
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editHotel = false">取 消</el-button>
    <el-button type="primary" @click="editHotelFn">确 定</el-button>
  </span>
    </el-dialog>
    <!--    酒店房间列表-->
    <el-dialog
        title="房间列表"
        :visible="showHotelDetails"
        width="90%"
    >

      <el-button style="float: right" type="primary" @click="addHotelDetails=true">添加</el-button>
      <el-table
          :data="hotelDetailsList"
          border

          style="width: 100%">


        <el-table-column
            label="图片"
            width="300"
        >
          <template slot-scope="scope">
            <el-carousel height="150px" v-if="scope.row.img!==''">
              <el-carousel-item v-for="item in scope.row.img.split(',')" :key="item">
                <el-image
                    style="width: 100%; height: 100%"
                    :src="item"
                    :fit="'contain'"
                    :preview-src-list="scope.row.img.split(',')"
                ></el-image>
              </el-carousel-item>

            </el-carousel>
          </template>

        </el-table-column>
        <el-table-column
            label="房型"
            prop="house"
        >
        </el-table-column>
        <el-table-column
            label="价格"
            prop="price"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>

          </template>
        </el-table-column>

        <el-table-column
            label="房间数量"
            prop="houseNum"
        >
        </el-table-column>


        <el-table-column
            label="操作"
            width="180"
        >
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" @click="removeHotelDetails(scope.row.id)" circle></el-button>
            <el-button type="danger" icon="el-icon-edit" @click="editHotelDetails(scope.row)" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showHotelDetails = false">取 消</el-button>
    <el-button type="primary" @click="showHotelDetails = false">确 定</el-button>
  </span>
    </el-dialog>

    <!--    添加房间-->
    <el-dialog
        title="添加房间"
        :visible.sync="addHotelDetails"
        @close="hotelDetails={},filelist=[]"
        width="30%"
    >
      <el-form label-width="80px" :model="hotelDetails" :rules="hotelDetailRules" ref="hotelDetails">
        <el-form-item label="房型" prop="house">
          <el-input v-model="hotelDetails.house"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="hotelDetails.price"></el-input>
        </el-form-item>
        <el-form-item label="房间数" prop="houseNum">
          <el-input v-model="hotelDetails.houseNum"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="houseNum">
          <el-upload
              action="https://lxhz123.com:9919/file/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="uploadImgOk"
              :file-list="filelist"
              multiple
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addHotelDetails = false">取 消</el-button>
    <el-button type="primary" @click="addHotelDetailsFn()">确 定</el-button>
  </span>
    </el-dialog>



    <!--    修改房间-->
    <el-dialog
        title="修改房间"
        :visible.sync="editHotelDetailsState"
        @close="hotelDetails={},filelist=[]"
        width="30%"
    >
      <el-form label-width="80px" :model="hotelDetails" :rules="hotelDetailRules" ref="hotelDetails">
        <el-form-item label="房型" prop="house">
          <el-input v-model="hotelDetails.house"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="hotelDetails.price"></el-input>
        </el-form-item>
        <el-form-item label="房间数" prop="houseNum">
          <el-input v-model="hotelDetails.houseNum"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="houseNum">
          <el-upload
              action="https://lxhz123.com:9919/file/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="uploadImgOk"
              :file-list="filelist"
              multiple
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editHotelDetailsState = false">取 消</el-button>
    <el-button type="primary" @click="editHotelDetailsFn()">确 定</el-button>
  </span>
    </el-dialog>


<!--    酒店设施-->
    <el-dialog
        title="酒店设施"
        :visible.sync="showHotelFacilities"
        @close="hotelDetails={},filelist=[]"
        width="80%">

      <el-form label-width="80px" :model="hotel.facilities" :rules="hotelDetailRules" ref="hotelDetails">
        <el-form-item :label="facilities.name" prop="house" v-for=" (facilities,index) in facilities" :key="index">
          <el-input   type="textarea" v-model="facilities.value"></el-input>
        </el-form-item>

      </el-form>
      <div style="display: flex">
        <el-input v-model="newFacilitiesName" style="width: 200px;" placeholder="请输入设施项"></el-input>
        <el-input v-model="newFacilitiesName" style="width: calc(100% - 200px)" placeholder="请输入详细描述，各项服务用|隔开"></el-input>
        <el-button type="success" >添 加</el-button>
      </div>
      <div slot="footer" class="dialog-footer">


        <el-button type="primary"  @click="showHotelFacilities = false">完 成</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addHotel,
  addHotelDetails,
  deleteHotel,
  deleteHotelDetails, editHotelDetails,
  getAreas,
  getHotelDetails,
  getHotelList,
  editHotel
} from "@/api/hotel";

export default {
  name: "Hotel",
  data() {
    return {
      newFacilitiesName:'',
      facilities:[{name:'设施',value:'描述'}],
      showHotelFacilities:false,
      editHotelDetailsState:false,
      images: '',
      editHotel: false,
      addHotelDetails: false,
      tableData: [{id: 1}],
      uploadFile: false,
      addHotel: false,
      showHotelDetails: false,
      hotel: {
        name: '',
        recommend: '',
        phone: '',
        addr: '',
        city: '',
        cityId: '',
        banner: '',
        maxInNub: '',
        score: 0
      },
      filelist: [],
      areas: [],
      hotelDetailsList: [],
      hotelDetails: {
        house: '',
        hotelId: 0,
        price: 0,
        houseNum: 1,
        houseNumber: ''
      },
      hotelDetailRules: {
        house: [
          {required: true, message: '不能为空', trigger: 'blur'},
        ],
        price: [
          {required: true, message: '不能为空', trigger: 'blur'},
        ],
        houseNum: [
          {required: true, message: '不能为空', trigger: 'blur'},
        ],
        houseNumber: [
          {required: true, message: '不能为空', trigger: 'blur'},
        ],
      },
      hotelRules: {
        name: [
          {required: true, message: '不能为空', trigger: 'blur'},
        ],
        recommend: [
          {required: true, message: '不能为空', trigger: 'blur'},
        ],
        phone: [
          {required: true, message: '不能为空', trigger: 'blur'},
        ],
        addr: [
          {required: true, message: '不能为空', trigger: 'blur'},
        ],
        city: [
          {required: true, message: '不能为空', trigger: 'blur'},
        ],
        banner: [
          {required: true, message: '不能为空', trigger: 'blur'},
        ],
      }

    }
  },
  methods: {
    editHotelDetailsFn(){
      this.hotelDetails.img = this.images

      editHotelDetails(this.hotelDetails).then(res => {
        this.$message.success('修改成功')
      })
      this.editHotelDetailsState=false
      this.getHotelDetailsList(this.hotelDetails.hotelId)
    },
    afterEditHotel(hotel) {
      console.log(hotel)
      let imglist = hotel.banner.split(',');
      let imglist2 = [];
      imglist.forEach((item, index) => {
        imglist2.push({url: item, name: 'a' + index})
      })
      console.log(imglist2)
      hotel.imglist2 = imglist2;
      this.hotel = hotel;
    },
    editHotelDetails(row) {
      console.log(row)
      this.hotelDetails = row
      this.images=row.img
      this.filelist= []
      row.img.split(',').map((img,index)=>{
        this.filelist.push({name:'a'+index,url:img})
      })
      this.editHotelDetailsState=true
      // editHotelDetails(row).then(res => {
      //   this.$message.success('修改成功')
      // })

    },
    uploadImgOk(res) {
      if (this.images === '') {
        this.images += res.msg
      } else {
        this.images += ',' + res.msg
      }
      this.hotelDetails.img = this.images

    },
    removeHotelDetails(id) {
      deleteHotelDetails(id).then(() => {
        this.$message.success('删除成功')
        this.getHotelDetailsList(this.hotelDetails.hotelId)
      })
    },
    getHotelDetailsList(id) {
      this.hotelDetailsList=[]
      getHotelDetails(id).then(res => {
        this.hotelDetailsList = res.data.hotelDetails
      })
    },
    addHotelDetailsFn() {

      this.$refs['hotelDetails'].validate((valid) => {
        if (valid) {
          this.hotelDetails.img = this.images

          addHotelDetails(this.hotelDetails).then(res => {
            console.log(res)

            if (res.data.code === 0) {
              this.$message.success('添加成功')
              this.addHotelDetails = false
              this.hotelDetails = {}
              this.getHotelDetailsList(this.hotelDetails.hotelId)

            } else {
              this.$message.warning('添加失败')

            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    addHotelFn() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {

          addHotel(this.hotel).then(res => {
            console.log(res)
            if (res.data.code === 0) {
              this.$message.success('添加成功')
              this.addHotel = false
              this.hotel = {}
              this.getHotelList()

            } else {
              this.$message.warning('添加失败')

            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    editHotelFn() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {

          editHotel(this.hotel).then(res => {
            console.log(res)
            if (res.data.code === 0) {
              this.$message.success('修改成功')
              this.editHotel = false
              this.hotel = {}
              this.getHotelList()

            } else {
              this.$message.warning('修改失败')

            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    uploadOk(res) {
      if (this.hotel.banner !== '') {
        this.images += "," + res.msg
        this.hotel.banner += "," + res.msg
      } else {
        this.images += res.msg
        this.hotel.banner += res.msg
      }
    },
    handleRemove(file, fileList) {
      if (file.response) {
        this.images = this.images.replace(','+file.response.msg, '')

        this.images = this.images.replace(file.response.msg, '')
        this.images=this.images.replace(',,',',')

        if (this.hotel.banner) {
          this.hotel.banner = this.hotel.banner.replace(','+file.response.msg, '')

          this.hotel.banner = this.hotel.banner.replace(file.response.msg, '')
          this.hotel.banner=this.hotel.banner.replace(',,',',')

        }
      } else {
        this.images = this.images.replace(','+file.url, '')

        this.images = this.images.replace(file.url, '')
        this.images=this.images.replace(',,',',')
        if (this.hotel.banner) {
          this.hotel.banner = this.hotel.banner.replace(','+file.url, '')

          this.hotel.banner = this.hotel.banner.replace(file.url, '')
          this.hotel.banner=this.hotel.banner.replace(',,',',')
        }

      }
      console.log( this.images)

      this.hotel.imglist2 = fileList;
      this.filelist = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    selectAddr(event) {
      console.log(event)
      let city = ''
      event.map(id => {
        if (city !== '') {
          city += "," + id
        } else {
          city += id
        }
      })
      this.hotel.city = city
    },
    removeHotel(id) {
      this.$confirm('删除该酒店信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteHotel(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getHotelList()
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getAreas() {
      getAreas().then(res => {
        console.log(res)
        this.areas = res.data.areas
        this.areas.map(one => {
          one.areas.map(tow => {
            tow.areas.map(three => {
              three.areas = undefined
            })
          })
        })
      })
    },
    getHotelList() {
      getHotelList().then(res => {
        console.log(res)
        this.tableData = res.data.hotels
      })
    },
  },
  created() {
    this.getAreas()
    this.getHotelList()
  }
}
</script>

<style scoped>

</style>