<template>
  <div class="getFail">
    <div class="logo-fail"></div>
    <div class="font1">系统繁忙，请重新取号</div>
    <!--<div style="margin-top:20px" class="font2" v-if="serviceCharge>0">请联系商家申请退回服务费</div>-->
    <div class="btn-back" @click="back">返回</div>
  </div>
</template>
<script>
  export default{
//    data(){
//        return{
//          serviceCharge:this.$route.params.serviceCharge,//是否支付服务费
//        }
//    },
    watch:{
      '$route':function(){
          if(this.$route.name!='payFail'){
              document.title='取号失败'
              return;
          }
      }
    },
    created(){
      document.title='取号失败'
    },
    methods:{
      back(){
        console.log('返回')
        this.$router.push({
          name:'shopDetail',
          params:{
            shopBranId:this.$route.params.shopBranId,
            linesvrId:this.$route.params.linesvrId
          }
        })

      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  @import '../../assets/css/base.scss';
  .logo-fail{
    width:p2r(200px);
    height: p2r(198px);
    @include bg-image('../../assets/img/getFail');
    margin:p2r(220px) auto p2r(26px);
    &~div{
      @include font-dpr(14px);
      text-align:center;

    }

  }
  .font1{
    color:#000;
  }
  .font2{
    color:#adadad;
  }
  .btn-back{
    @include font-dpr(14px);
    $h:p2r(60px);
    width:p2r(198px);
    height:$h;
    line-height: $h;
    border:1px solid #d0d0d0;
    border-radius: p2r(6px);
    text-align: center;
    color:#545454;
    background-color: #fff;
    display: block;
    margin:p2r(84px) auto;
  }

</style>
