<template>
  <header ref="header">
    <div class="pos" @click="goCity">选择城市</div>
      <div class="fdj0" @click="search" v-show="!isShow"></div>
      <div class="fdjs"  v-show="isShow">
          <input placeholder="搜索"/>
          <span class="cancel-search" @click="search">取消</span>
          <span class="fdj1"></span>
      </div>



  </header>
</template>

<script>
  export default{
    data(){
     return{
        isShow:false
     }
    },
    methods:{
      search(){
        this.isShow=!this.isShow
      },
      goCity(){
        this.$router.push({
          name:'city'
        })
      }
    },

  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../assets/css/base.scss";
  @import "../assets/css/_theme.scss";
  header{
    text-align: initial;
    background-color:$bgColor;
    .pos{
      @include font-dpr(14px);
      display:inline-block;
      color:#181818;
      &:after{
         @include bg-image("../assets/img/drop-down")
          $size:p2r(34px);
          content:'';
          width:$size;
          height:$size;
          position: relative;
          display: inline-block;
          margin-left: p2r(5px);

       }
    }
    .fdj0,.fdjs{
      float:right;
    }
    @mixin fdj(){
      @include bg-image("../assets/img/search");
      $size: p2r(34px);
      width:$size;
      height:$size;
      position: relative;
      top:50%;
      margin-top:- $size/2;
    }
    .fdj0{
      @include fdj()
    }
    .fdjs{
      color:#181818;
      position: relative;
      input{
        display:inline-block;
        width: p2r(420px);
        height:p2r(60px);
        box-sizing: border-box;
        border:1px solid #D0D0D0;
        border-radius: p2r(30px);
        outline:none;
        padding: 0 p2r(31px) 0 p2r(62px);
        font-size: p2r(26px);
      }
      .cancel-search{
        margin-left: p2r(18px);
      }
      .fdj1{
        @include fdj()
        position: absolute!important;
        left:p2r(15px);
      }
    }
  }

</style>
