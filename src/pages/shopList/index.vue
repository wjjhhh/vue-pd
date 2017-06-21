<template>

    <div style='overflow: auto;' :style='{height:shopListHeight}' class="shoplists" v-infinite-scroll="onLoadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="1" ref="scrollContainer">
      <!--定位完有排队门店-->
      <div  v-if="hasLocation">
        <div v-if="hasQueue">
          <Shop :shop="shop" v-for="shop in shopBranchList" :key="shop.id"></Shop>
          <div class="loading" v-if="loading">页面加载中...</div>
          <div class="loading" v-if="!loading&&!hasNext||specialNo">没有更多门店了</div>
        </div>
        <div v-else>
          <div class="icon-noQueue"></div>
          <div>当前城市无可排队门店</div>
        </div>
      </div>
      <!--没有定位-->
      <div class="tips" v-else>
        <div>无法获取位置信息</div>
        <div>请重新开启定位或手动选择定位城市</div>
        <div class="btn-location" @click="location">开启定位</div>
      </div>
      <!--垫底div撑开高度-->
      <div class="shim"></div>
      <div class="btn-my-odder" @click="myNum" ref="myOdder">我的排单号</div>
    </div>

</template>

<script type="text/ecmascript-6">
  import Shop from './template/Shop.vue'
  import axios from 'axios';
  import location from '../../utils/location.js'
  import $util from '../../utils/index.js'
  import $cookies from '../../utils/cookies.js'
  import {bus} from '../../utils/bus.js'
  export default{
    components:{
      Shop
    },
    data(){
      return{
        hasQueue:true,//false为没有队可排
        shopListHeight:'1200px',
        loading:true,
        page:1,
        pageSize:10,
        hasNext:false,
        shopBranchList: [],
        busy:false,
        specialNo:false,//商户列表过少时出现没有更多门店
      }
    },
    watch:{
      '$route':['fetchData']
    },
    methods:{
      //定位
      location(){
        location();
      },
      //请求数据
      fetchData(params){
//        console.log(params)
        this.loading=true;
//        var url='http://localhost:8081/mock/shopList.json';
        var url='/wxQueue/getShopList';
        var _tempArr=[];
        axios.get(url,{
          params:{
            shopId:this.$store.getters.getShopId,
            page:this.page,
            pageSize:this.pageSize,
            userLon:"126.481488",
            userLat:"39.990464",
            openId:this.$store.getters.getOpenId,
            shopBranchIdList:this.$store.getters.getAttch
          }
        })
        .then((response)=>{
            _tempArr=response.data.shopBranchList;
            if(_tempArr.length==0){
              this.hasQueue=false;
            }
            this.loading=false;
            this.specialNo=true;
            if (params.page != 1 && this.page + 1 != params.page) {
              console.error("页数已经发生变化");
              return -1;
            }
            if (params.page == 1) {
              this.shopBranchList = _tempArr;
              this.page = params.page;
            } else {
              this.page = params.page;
              this.shopBranchList = this.shopBranchList.concat(_tempArr)
            }
            if (this.page > 2) {
                this.hasNext = false;
            }
            else {
                this.hasNext = true;
            }
//            this.busy=false;
        })
        .catch((err)=>{
          console.warn(err);
        })
      },
      //加载
      onLoadMore(){
          if(this.loading||!this.hasNext)return -1;
          console.log('加载更多')
          this.specialNo=false;
          let params={
            page:this.page+1,
            pageSize:this.pageSize
          }
          this.fetchData(params)
      },
      //刷新
      refreshData(){
        let params={
          page:1,
          pageSize:this.pageSize
        }
        document.body.scrollTop = 0;
        this.fetchData(params)

      },
      myNum(){
        console.log('进入我的排单号')
        this.$router.push({
          'name':'queue',
          params:{

          }
        })
      },
//      //商店容器高度调整
      shopListContainerHeight(){
        console.log('子',window.innerHeight,this.$el.offsetHeight)
        this.shopListHeight=this.$el.offsetHeight+'px';
//        console.log(this.$el.offsetHeight,this.$refs.myOdder.offsetHeight)
      }
    },
    created(){
      this.refreshData();
      //搜索框组件调用请求商户列表
      var _this=this;
      bus.$on('requestShopList',function(attch){
        _this.shopBranchList=[]
        _this.refreshData()
      })
    },
    mounted(){
//      this.$nextTick(function () {
//        this.shopListContainerHeight();
//      })
//      window.addEventListener('resize',this.shopListContainerHeight)
//      this.$refs.scrollContainer.style.paddingBottom=this.$refs.myOdder.offsetHeight+'px';
    },
    props:{
      hasLocation:false,//true为已成功定位,
    },

  }
</script>

<style  type="text/scss" lang="scss" scoped>
  @import "../../assets/css/base";
  @import "../../assets/css/_theme.scss";
  .loading{
    @include font-dpr(12px);
    line-height: p2r(24px );
    padding: p2r(36px);
    color:#adadad;
    text-align: center;
    background-color: #f5f5f5;
  }
  .btn-my-odder{
    @include font-dpr(15px);
    $h:p2r(100px);
    width:100%;
    height: $h;
    line-height: $h;
    color:#fff;
    background-color: $color;
    text-align: center;
    position: fixed;
    z-index:2;
    bottom:0;
    left:0;
  }
  .shim{
    height:p2r(100px);
    width:100%;
  }
  .tips{
    @include font-dpr(12px);
    color:#adadad;
    text-align: center;
    line-height: p2r(42px);
    margin-top: p2r(184px);
  }
  .btn-location{
    $h:p2r(60px);
    @include font-dpr(12px);
    color:#545454;
    width:p2r(198px);
    height:$h;
    line-height:$h;
    border:1px solid #d0d0d0;
    margin:p2r(36px) auto;
    border-radius: p2r(6px);
  }
  .icon-noQueue{
    @include bg-image('../../assets/img/noQueue');
    width:p2r(332px);
    height: p2r(258px);
    margin:p2r(120px) auto p2r(26px);
    &+div{
      @include font-dpr(12px);
      text-align: center;
      color:#adadad;
      }
  }
</style>
