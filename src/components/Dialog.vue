<template>
  <div class="dialogContainer">
    <div class="dialog">
      <header>{{dTitle}}</header>
      <div class="content">{{content}}</div>
      <slot name="btns"></slot>
    </div>
  </div>
</template>

<script>
  export default{
    name:'Dialog',
    methods:{

    },
    props:{
      content:'',
    },
    data(){
      return{
        dTitle:'取消排队',
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  @import '../assets/css/base.scss';
  .dialogContainer{
    width:100%;
    height: 100%;
    position: fixed;
    left:0;
    top:0;
    z-index: 2;
    background-color: rgba(0,0,0,.5);
  }
  .dialog{
    width:p2r(592px);
    height: p2r(388px);
    background-color: #fff;
    border-radius: p2r(6px);
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
    header{
      @include font-dpr(16px);
      $h:p2r(96px);
      height: $h;
      line-height: p2r(30px);
      color:#181818;
      box-sizing: border-box;
      padding:p2r(34px) 0 0 p2r(40px);
      border-bottom: 1px solid #e1e1e1;
    }
    .content{
       @include font-dpr(15px);
      color:#545454;

      /*margin: p2r(72px) auto 0;*/
      padding: p2r(46px) p2r(48px);
      box-sizing: border-box;
    }
    .btns{
      $h:p2r(102px);
      width:100%;
      height: $h;
      line-height: $h;
      text-align: center;
      color:#545454;
      position: absolute;
      bottom:0;
      border-top:1px solid #e1e1e1;
      box-sizing: border-box;
      font-size:0;
      span{
       @include font-dpr(15px);
        width:50%;
        display: inline-block;
        box-sizing: border-box;
        &:nth-child(2){
          border-left:1px solid #e1e1e1;
         }
        &:only-child{
          width:100%;
font-weight: bold;
         }
      }
    }
  }
 </style>
