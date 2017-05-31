<template>
  <section>
    <div class="shop" @click="goShop(shop.id)">
      <img class="shop-logo" v-bind:src="shop.shoplogo"/>
      <div class="shop-info">
        <div class="shop-name">{{shop.name}}</div>
        <div class="shop-num"><span class="shop-nums">{{shop.num}}桌</span><span class="shop-status">在等待</span></div>
      </div>
    </div>
    <div class="location">
      <span class="icon-location"></span>
      <div class="shop-location">{{shop.location}}</div>
      <div class="shop-distance">{{shop.distance}}</div>
    </div>
  </section>
</template>

<script>
  export default{
    data(){
      return{

      }
    },
    props:{
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
            shopId:id
          }
        })
      },
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
