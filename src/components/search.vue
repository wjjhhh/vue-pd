<template>
  <header ref="header">
    <div class="pos" @click="goCity">
      <span v-show="positioning">
        <span class="logo-location"></span>
        <span class="city">定位中<span class="dotting"></span></span>
      </span>
      <span v-show="!positioning">
        {{position}}
      </span>
    </div>
    <div class="fdjContainer" v-if="isShow">
      <div class="fdj0" @click="fdj=!fdj" v-show="!fdj"></div>
      <form class="fdjs"  v-show="fdj" @submit="submit">
        <input placeholder="搜索" v-model="input"/>
        <span class="cancel-search" @click="search">取消</span>
        <span class="fdj1" @click="submit"></span>
      </form>
    </div>

  </header>
</template>

<script>
  export default{
    data(){
     return{
        fdj:false,//搜索显示切换成放大镜或input,
        input:'',//搜索框内容,
        city:'',

     }
    },
    props:{
      isShow:true,//true:显示搜索,
      positioning:'',//true:定位中,
      position:'',
    },
    mounted(){

    },
    methods:{
      search(){
        this.fdj=!this.fdj
      },
      //选择城市，进入城市列表
      goCity(){
        this.$router.push({
          name:'city'
        })
      },
      submit(e){
        e.preventDefault();
        if(this.input.length<=0)return
        console.log('提交:'+this.input)
      },

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
          vertical-align: middle;
       }
    }
    .logo-location{
      $size:p2r(34px);
      width:$size;
      height:$size;
      @include bg-image('../assets/img/location');
      display: inline-block;
      vertical-align: middle;
    }
    .city{
      vertical-align: middle;
    }
    .fdjContainer{
      height: 100%;
    }
    .fdjContainer,.fdj0,.fdjs{
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
  .dotting{
    width: p2r(30px);
    display: inline-block;
  }
  .dotting:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ellipsis 4s infinite;
    content: "\2026"; /* ascii code for the ellipsis character */
  }
  @keyframes ellipsis {
    from {
      width: 0;
    }
    to {
      width: p2r(30px);
    }
  }
</style>
