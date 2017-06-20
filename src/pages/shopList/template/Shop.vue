<template>
  <section>
    <div class="shop" @click="(shop.shopStatus==1||shop.shopStatus==4)&&goShop(shop.id)">
      <img class="shop-logo" v-lazy="shop.shoplogo"/>
      <div class="shop-info">
        <div class="shop-name">{{shop.name}}</div>
        <div class="shop-num">
          <span class="shop-nums" v-if="shop.shopStatus==1||shop.shopStatus==4">{{shop.waittingNum}}桌</span>
          <span class="shop-status" v-if="shop.shopStatus==1">在等待</span>
          <span class="shop-status" v-if="shop.shopStatus==2">暂停取号</span>
          <span class="shop-status" v-if="shop.shopStatus==3">暂不支持线上排队</span>
          <span class="shop-status" v-if="shop.shopStatus==4">需等待</span>
          <span class="shop-status" v-if="shop.shopStatus==5">无需取号</span>
        </div>
      </div>
    </div>
    <div class="location" @click="mapGuide(shop)">
      <span class="icon-location"></span>
      <div class="shop-location">{{shop.location}}</div>
      <div class="shop-distance">{{shop.distance}}</div>
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
      goShop(id){
        console.log('进入商店');
        this.$router.push({
          name:'shopDetail',
          params:{
            shopBranId:id
          }
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
    $size:p2r(182px);
    width:$size;
    height:$size;
    border-radius: p2r(4px);
  }
  .shop-info{
    height:p2r(182px);
    margin-left: p2r(24px);
    flex:1;
    border-bottom: 1px #e1e1e1 solid;
    position: relative;
    box-sizing: border-box;
  }
  .shop-name{
    font-size: p2r(30px);
    color:#181818;
  }
  .shop-num{
    position: absolute;
    bottom:p2r(24px);
    right:0;
  }
  .shop-nums{
    font-size: p2r(36px);
    color:#f74848;
  }
  .shop-nums+.shop-status{
    font-size: p2r(24px);
    color:#181818;
    margin-left: p2r(18px);
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
    font-size: p2r(24px);
    line-height: p2r(34px);
  }
  .shop-distance{
    font-size: p2r(22px);
    position: absolute;
    bottom:0;
    right:0;
  }
</style>
