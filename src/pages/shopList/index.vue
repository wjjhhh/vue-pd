<template>

    <div style='overflow: auto;' :style='{height:shopListHeight}' class="shoplists" v-infinite-scroll="onLoadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="1" ref="scrollContainer">
      <!--定位完-->
      <div v-if="hasLocation||cityId">
        <!--有门店-->
        <div v-if="hasQueue">
          <Shop :shop="shop" v-for= "shop in shopBranchList" :key="shop.id"></Shop>
          <div class="loading" v-if="loading">页面加载中...</div>
          <div class="loading" v-if="!loading&&!hasNext||specialNo">没有更多门店了</div>
        </div>
        <!--没门店-->
        <div v-else>
          <div class="icon-noQueue"></div>
          <div v-if="searchIn">
            <div>抱歉，没有您的搜索结果</div>
          </div>
          <div v-if="!searchIn&&cityIn">
            <div>当前城市无可排队门店</div>
          </div>
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
  import $util from '../../utils/index.js'
  import $cookies from '../../utils/cookies.js'
  import {bus} from '../../utils/bus.js'
  import Queue from '../../components/Queue.vue'
  import $cache from '../../utils/cache.js'
  export default{
    components:{
      Shop,
      Queue
    },

    data(){
      return{
        shopListHeight:'1200px',
        loading:true,
        page:1,
        pageSize:20,
        hasNext:false,
        shopBranchList: [],
        busy:false,
        specialNo:false,//商户列表过少时出现没有更多门店
        vagueShopBranchName:'',
        hasQueue:true,//false为没有队可排
        searchResult:true,//false为没搜索结果
        cityIn:false,//true为当前城市没门店
        searchIn:false,//true为搜索结果没有,

//        isHasNextPage:false,//是否有下一页
      }
    },
    props:{

    },
    watch:{
      '$route':['refreshData'],
    },
    computed:{
      hasLocation(){
          return this.$store.getters.getLocation.latitude||this.$store.getters.getLocation.longitude;
      },
      cityId(){
          return this.$store.getters.getCityId
      },
      cityName(){
          return this.$store.getters.city
      }
    },
    methods:{
      //定位
      location(){
          console.log('手动开启定位')
        this.$router.go(0)
//        bus.$emit('handLocation')
      },
      //请求数据
      fetchData(params,type){
//     没定位（没经纬度）
//        if(!this.$store.getters.getLocation.longitude||!this.$store.getters.getLocation.longitude){
//            this.hasLocation=false;

//            return;
//        }
        this.loading=true;
        this.specialNo=false;
//        var url='http://localhost:8081/mock/shopList.json';
        var url='/wxQueue/getShopList';

        var _tempArr=[];
        axios.get(url,{
          params:{
            shopId:this.$store.getters.getShopId,
            page:params.page,
            pageSize:this.pageSize,
            userLon:this.$store.getters.getLocation.longitude||'',
            userLat:this.$store.getters.getLocation.latitude||'',
            openId:this.$store.getters.getOpenId,
//            shopBranchIdList:this.$store.getters.getShopBranchList,
            cityId:this.$store.getters.getCityId,
            vagueShopBranchName:this.$store.getters.getVagueShopBranchName,
            cityName:this.$store.getters.getCity,
            fatherId:this.$store.getters.getFatherId
          },
          timeout:30000
        }).then((response)=>{
          document.title='门店列表'
           this.loading=false;
            this.$store.dispatch('setCityList',response.data.shopBranchInfo.cityList);
            this.hasNext=response.data.shopBranchInfo.isHasNextPage;
            //缓存cityList(1天)
            var timeout=60*60*24;
            $cache.set('cityList',response.data.shopBranchInfo.cityList,timeout)
            //返回空
            if((typeof response.data)&&Array.isArray(response.data)){
                console.log('返回空')
                this.shopBranchList=[];
                this.specialNo=true;
//              bus.$emit('hasLocationFun',false)
                return;
            }
            _tempArr=response.data.shopBranchInfo.shopBranchList;

            if(_tempArr.length==0){
                //搜索进来
              if(type=='search'){
                this.hasQueue=false;
                this.searchIn=true;
              }
               //非搜索进来
              else{
                console.log('非搜索')

                  //靠定位城市
                if(this.$store.getters.getCity){
                  this.hasQueue=false;
                  this.cityIn=true;

                }
                //靠经纬度（城市）
                else{
                }
              }
            }
            else{
              this.hasQueue=true;
              this.cityIn=true;

            }
            this.specialNo=true;
            if (params.page != 1 && this.page + 1 != params.page) {
              console.error("页数已经发生变化");
              console.log(params)
              console.log('params.page:'+params.page)
              console.log('this.page:'+this.page)
              return -1;
            }
            if (params.page == 1) {
              this.shopBranchList = _tempArr;
              this.page = params.page;
            } else {
              this.page = params.page;
              this.shopBranchList = this.shopBranchList.concat(_tempArr)
            }
//            if (this.page > 2) {
//                this.hasNext = false;
//            }
//            else {
//                this.hasNext = true;
//            }
//            this.busy=false;
        }).catch((err)=>{
          alert('网络异常')
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
      refreshData(type){
          if(this.$route.name=='shopDetail'||this.$route.name=='queue'||this.$route.name=='city'||this.$route.name=='queueDetail')return
//          console.log(this.$route.name)
//        if(this.$route.name!='shopList')return;
        let params={
          page:1,
          pageSize:this.pageSize
        }
        document.body.scrollTop = 0;
        this.fetchData(params,type)

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
      bus.$on('requestShopList',function(type){
          console.log('搜索结果')
        _this.shopBranchList=[]
        _this.refreshData(type)
      })

    },
    mounted(){
      this.$nextTick(function () {
        this.shopListContainerHeight();
      })
//      window.addEventListener('resize',this.shopListContainerHeight)
//      this.$refs.scrollContainer.style.paddingBottom=this.$refs.myOdder.offsetHeight+'px';
    },


  }
</script>

<style  type="text/scss" lang="scss" scoped>
  @import "../../assets/css/base";
  @import "../../assets/css/_theme.scss";
  .loading{
    @include font-dpr(13px);
    line-height: p2r(24px );
    padding: p2r(36px);
    color:#adadad;
    text-align: center;
    background-color: #f5f5f5;
  }
  .btn-my-odder{
    @include font-dpr(16px);
    $h:p2r(88px);
    width:100%;
    height: $h;
    line-height: $h;
    color:#fff;
    background-color: $color;
    text-align: center;
    position: fixed;
    z-index:10;
    bottom:0;
    left:0;
  }
  .shim{
    height:p2r(100px);
    width:100%;
    opacity: 0;
  }
  .tips{
    @include font-dpr(13px);
    color:#adadad;
    text-align: center;
    line-height: p2r(42px);
    margin-top: p2r(184px);
  }
  .btn-location{
    $h:p2r(60px);
    @include font-dpr(13px);
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
      @include font-dpr(13px);
      text-align: center;
      color:#adadad;
      }
  }
</style>
