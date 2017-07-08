<template>
  <div class="loadingContainer">
    <div class="load">
      <!--<load type="spiningDubbles" color="#000" :size="{ width: '100%', height: '100%' }"></load>-->

      <i class="weui-loading"></i>
    </div>

  </div>

</template>

<script>
  import load from 'vue-loading-template'
  export default{
    name:'loading',
//    components:{
//      load,
//    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '../assets/css/base.scss';
  .loadingContainer{
    width:100%;
    height: 100%;
    position: fixed;
    left:0;
    top:0;
    z-index:999;
    background-color: rgba(0,0,0,.4);
  }
  .load{
    position: absolute;
    z-index: 5000;
    width: 4.26667rem;
    min-height: 2.29333rem;
    top: 5.6rem;
    left: 50%;
    margin-left: -2.13333rem;
    background-color: rgba(0, 0, 0, 0.6);
    text-align: center;
    border-radius: 0.16rem;
    color: #FFFFFF;
  }
  .weui-loading{
    width: p2r(48px);
    height: p2r(48px);
    display: inline-block;
    vertical-align: middle;
    -webkit-animation: weuiLoading 1s steps(12, end) infinite;
    animation: weuiLoading 1s steps(12, end) infinite;
    background: transparent url('../assets/img/loadding.svg') no-repeat;
    background-size: 100%;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 0;
    bottom: 0;
  }
  @-webkit-keyframes weuiLoading {
    0% {
      transform: rotate3d(0, 0, 1, 0deg);
    }

    100% {
      transform: rotate3d(0, 0, 1, 360deg);
    }
  }
  @keyframes weuiLoading {
    0% {
      transform: rotate3d(0, 0, 1, 0deg);
    }

    100% {
      transform: rotate3d(0, 0, 1, 360deg);
    }
  }
</style>
