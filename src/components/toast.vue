<template>
  <div class="container">
      <div class="toast">{{content}}</div>
  </div>

</template>

<script>
  export default{
      props:{
        content:{
            default(){
                return{}
            }
        }
      },
      data(){
          return{

          }
      }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  @import "../assets/css/base";
  .container{
    width:100%;
    height:100%;
    position: fixed;
    top:0;
    left:0;
    z-index: 1000;
    background-color: transparent;
  }
  .toast{
    @include font-dpr(13px);
    /*padding:2em 2em;*/
    width:p2r(280px);
    height:p2r(134px);
    line-height: p2r(134px);
    border-radius: p2r(20px);
    text-align: center;
    margin:auto;
    position: absolute;
    transform: translate(-50%,-50%);
    top:50%;
    left:50%;
    background-color: rgba(0,0,0,.5);
    color:#fff;
  }
  .fade-enter-active,.fade-leave-active {
    transition: all .3s ease;
  }
  .fade-enter-active{
    opacity:1;
  }
  .fade-leave-active{
    opacity:0;

  }
  /* 重要：定义初始状态 */
  .fade-enter{
    opacity:0;
  }
</style>
