<template>
  <div>
    <div class="logo-empty"></div>
    <div>空空如也</div>
  </div>
</template>
<script>
  export default{

  }
</script>
<style type="text/scss" lang="scss" scoped>
  @import '../../assets/css/base.scss';
  .logo-empty{
    width:p2r(200px);
    height: p2r(198px);
    @include bg-image('../../assets/img/empty');
    margin:p2r(220px) auto p2r(26px);
    &+div{
      text-align:center;
      @include font-dpr(12px);
      color:#adadad;
    }
  }
</style>
