<template>
  <div class="shoplists">
    <!--定位完有排队门店-->
    <div :style="{height:shopListHeight}" style="overflow:auto;" v-if="hasLocation">
      <div v-if="hasQueue">
        <Shop :shop="shop" v-for="shop in shopBranchList" :key="shop.id"></Shop>
        <div class="noMoreShop">没有更多门店了</div>
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
    <div class="btn-my-odder" @click="myNum" ref="myOdder">我的排单号</div>
  </div>
</template>

<script>
  import Shop from './template/Shop.vue'
  import axios from 'axios';
  import location from '../../utils/location.js'
  export default{
    components:{
      Shop
    },
    methods:{
      //定位
      location(){
        location();
      },
      //请求
      fetchData(){
        this.loading=true;
        var url='http://localhost:8080/mock/shopList.json';
        var _this=this;
        axios.get(url).then(function(response){
          _this.shopBranchList=response.data.shopBranchList;
        }).catch(function(err){
          console.log(err)
        })
      },
      //加载
      onLoadMore(){
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

      shopListContainerHeight(){
        this.shopListHeight=this.$el.offsetHeight-this.$refs.myOdder.offsetHeight+'px';
      }
    },
    mounted(){
      this.$nextTick(function () {
        this.shopListContainerHeight();
      })
      this.fetchData();
    },
    props:{
      hasLocation:false,//true为已成功定位,
    },
    data(){
      return{
        hasQueue:true,//false为没有队可排
        shopListHeight:'1200px',
        loading:true,
        page:0,
        pageSize:10,
        hasNext:false,
        shopBranchList: [],
      }
    },
  }
</script>

<style  type="text/scss" lang="scss" scoped>
  @import "../../assets/css/base";
  @import "../../assets/css/_theme.scss";
  .noMoreShop{
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
