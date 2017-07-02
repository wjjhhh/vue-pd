<template>
  <section>
    <div class="shop" @click="(shop.shopStatus==1||shop.shopStatus==4)&&goShop(shop.shopBranchId,shop.name,shop.linesvrId)">
      <img class="shop-logo" v-lazy="shop.shoplogo"/>
      <div class="shop-info">
        <div class="shop-name">{{shop.name}}</div>
        <div class="shop-num">
          <span class="shop-status-name" :class="shop.shopStatus==2?'shop-status-name2':'shop-status-name1'">
            <span v-if="shop.shopStatus==2">暂停取号</span>
            <span v-if="shop.shopStatus==5">无需排队</span>
            <span v-if="shop.shopStatus!=2&&shop.shopStatus!=5">排队</span>
          </span>
          <div class="shop-num-status">
            <span class="shop-nums" v-if="shop.shopStatus==1||shop.shopStatus==4">{{shop.waittingNum}}桌</span>
            <span class="shop-status" v-if="shop.shopStatus==1">在等待</span>
            <span class="shop-status" v-if="shop.shopStatus==2">未到可取号时间</span>
            <span class="shop-status" v-if="shop.shopStatus==3">需到店取号</span>
            <span class="shop-status" v-if="shop.shopStatus==4">需等待</span>
            <span class="shop-status" v-if="shop.shopStatus==5">到店即可就餐</span>
          </div>

        </div>
      </div>
    </div>
    <div class="location" @click="mapGuide(shop)">
      <span class="icon-location"></span>
      <div class="shop-location">{{shop.location}}</div>
      <div class="shop-distance">{{shop.distance}}KM</div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios';
  export default{
    data(){
      return{

      }
    },
    props:{
        //shop.shopStatus  (备注:1=在等待,取好前,  2= 暂停取号,    3=暂不支持线上排队,4=取号后等待桌数 5=无需取号,不可点击 )
      shop:{
        type:Object,
        default(){
          return{}
        }
      }
    },
    methods:{
      goShop(shopBranchId,name,linesvrId){
//        console.log('进入商店',shopBranchId);
        this.$router.push({
          name:'shopDetail',
          params:{
            shopBranId:shopBranchId,
            shopName:name,
            linesvrId:linesvrId
          },
        })
      },
      //进入高德导航
      mapGuide(o){
        var longitude=o.longitude,
          latitude=o.latitude,
          destName=o.location,
          url='http://m.amap.com/navi/?dest='+longitude+','+latitude+'&destName='+destName+'&key=7b7eb0bb7ce95a52668cf22e55748b0a'
          window.location.href=url;
      }
    }
  }
</script>

<style  type="text/scss" lang="scss" scoped>
  @import "../../../assets/css/base";
  section{
    padding:p2r(24px) p2r(24px) 0;
    border-top: p2r(12px) solid #f5f5f5;
    overflow: hidden;
    background-color: #fff;
  }
  .shop{
    width:100%;
    display:inline-flex;
    box-sizing: border-box;

  }
  .shop-logo{
    width:p2r(180px);
    height:p2r(180px);
    border-radius: p2r(2px);
    object-fit: cover;
  }
  .shop-info{
    height:p2r(180px);
    margin-left: p2r(24px);
    flex:1;
    border-bottom: 1px #e1e1e1 solid;
    position: relative;
    box-sizing: border-box;
  }
  .shop-name{
    @include font-dpr(18px);
    color:#181818;
    font-weight: bold;
    line-height: p2r(42px);
  }
  .shop-num{
    /*margin-top: p2r(84px);*/
    line-height: p2r(30px);
    width: 100%;
    position: absolute;
    top:p2r(126px);

  }
  .shop-status-name{
    @include font-dpr(11px);
    width:p2r(104px);
    /*height: p2r(30px);*/
    line-height: p2r(30px);
    display: inline-block;
    text-align: center;
    border-radius: p2r(4px);
    color:#fff;
  }
  .shop-status-name1{
    background-color: #f74848;
  }
  .shop-status-name2{
    background-color: #adadad;
  }
  .shop-num-status{
    float:right;
  }
  .shop-nums{
    @include font-dpr(19px);
    color:#f74848;
  }
  .shop-status{
    color:#f74848;
    @include font-dpr(13px);
  }
  .shop-nums+.shop-status{
    color:#181818;
    margin-left: p2r(2px);
  }
  .location{
    position: relative;
    padding-left: p2r(34px);
    margin:p2r(20px) 0;
    color:#adadad;
  }
  .icon-location{
    @include bg-image("../../../assets/img/location")
    $size:p2r(34px);
    width:$size;
    height:$size;
    position: absolute;
    left:0;
  }
  .shop-location{
    width:p2r(506px);
    @include linesEllipsis(2);
    @include font-dpr(13px);
    line-height: p2r(34px);
  }
  .shop-distance{
    @include font-dpr(13px);
    position: absolute;
    bottom:0;
    right:0;
  }
</style>
