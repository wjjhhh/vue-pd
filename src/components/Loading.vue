<template>
  <div class="loadingContainer">
    <div class="load">
      <load type="spiningDubbles" color="#000" :size="{ width: '100%', height: '100%' }"></load>
    </div>

  </div>

</template>

<script>
  import load from 'vue-loading-template'
  export default{
    name:'loading',
    components:{
      load,
    }
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
    z-index:10;
    background-color: rgba(0,0,0,.5);
  }
  .load{
    width:p2r(100px);
    height: p2r(100px);
    position: absolute;
    margin:auto;
    top:0;
    right: 0;
    left:0;
    bottom:0;
  }
</style>
