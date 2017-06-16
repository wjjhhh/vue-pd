<template>
  <div class="successcontainer">
    <Queue :queueDetailData="queueDetailData">
      <div slot="success">
        <div class="logo-success"></div>
        <div class="suc">取号成功</div>
      </div>
    </Queue>
    <!--<div class="getSuccess">-->
      <!--<div class="logo-success"></div>-->
      <!--<div class="suc">取号成功</div>-->
      <!--<div class="detail">-->
        <!--<div class="line1">-->
          <!--<span class="shopName">麻吉寿司（天河店）</span>-->
          <!--<span class="numName">A22</span>-->
        <!--</div>-->
        <!--<div class="line2 line">-->
          <!--<span class="time">2017-04-05 16:28:30</span>-->
          <!--<span class="table">小桌(1-2)</span>-->
        <!--</div>-->
        <!--<div class="line3 line">-->
          <!--<span>还需等待</span>-->
          <!--<span class="num">20桌</span>-->
        <!--</div>-->
        <!--<div class="line4 line">-->
          <!--<span>支付金额</span>-->
          <!--<span>2元</span>-->
        <!--</div>-->
        <!--<div class="line5 line">-->
          <!--<span>已等待</span>-->
          <!--<span class="waitTime">0分钟</span>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="tips">听到叫号请到迎宾台，过号不作废，过号一桌自动顺延3个号</div>-->
    <!--</div>-->
    <!--<div class="coupon">-->
      <!--<div class="logo-coupon"></div>-->
      <!--<div class="couponDetail">-->
        <!--<div>-->
          <!--<div class="couponName">三文鱼优惠券</div>-->
          <!--<div class="couponNum">10.0元（满200可用）</div>-->
        <!--</div>-->
        <!--<span class="btn-get" :class="couponGet==2&&'btn-get-1'" @click="getCoupon">-->
          <!--<span v-if="couponGet==0">领取</span>-->
          <!--<span v-else-if="couponGet==1">立即使用</span>-->
          <!--<span v-else-if="couponGet==2">已领完</span>-->
          <!--<span v-else-if="couponGet==3">已使用</span>-->
        <!--</span>-->
      <!--</div>-->

    <!--</div>-->
  </div>
</template>
<script>
  import Queue from '../../components/Queue.vue'//排队单组件
  import axios from 'axios';
  export default{
    components:{
      Queue
    },
    created(){
      this.fetchData();
    },
    methods:{
      getCoupon(){
//        if(this.couponGet==2)return;
//
//        console.log('进入券详情页')
      },
      //拉取数据
      fetchData(){
          var url='http://localhost:8080/mock/queueDetail.json';
          axios.get(url,{
            params:{
                orderId:123
            }
          }).then((response)=>{
              this.queueDetailData=response.data;
          }).catch((error)=>{
              console.warn(error)
          })
      }
    },
    mounted(){
      console.log(this.couponGet)
    },
    data(){
      return{
        couponGet:2,//0：领取，1：立即使用，2:已领完，3：已使用,
        queueDetailData:[]
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  @import '../../assets/css/base.scss';
  .successcontainer{
    overflow: hidden;
  }
  /*.getSuccess{*/
    /*width:p2r(702px);*/
    /*border-radius: p2r(12px);*/
    /*margin:p2r(24px) auto;*/
    /*overflow: hidden;*/
    /*background-color:#fff;*/
    .logo-success{
      $size:p2r(130px);
      width:$size;
      height:$size;
      @include bg-image('../../assets/img/success');
      display: block;
      margin: p2r(72px) auto p2r(28px);
      overflow: hidden;
    }
    .suc{
      @include font-dpr(14px);
      color:#181818;
      text-align: center;
    }
    /*.detail{*/
      /*margin:p2r(64px) p2r(24px) 0;*/
      /*border-bottom: 1px dotted #e1e1e1;*/
    /*}*/
    /*.line,.line1{*/
      /*font-size:0;*/
      /*span{*/
        /*width:50%;*/
        /*display: inline-block;*/
        /*&:first-child{*/
            /*text-align: left;*/
         /*}*/
        /*&:last-child{*/
            /*text-align: right;*/
         /*}*/
      /*}*/
    /*}*/
    /*.line{*/
      /*line-height:p2r(24px);*/
      /*margin-bottom:p2r(28px);*/
      /*span{*/
      /*@include font-dpr(12px);*/
      /*&:first-child{*/
         /*color:#7d7d7d;*/
       /*}*/
      /*&:last-child{*/
         /*color:#454545;*/
       /*}*/
      /*}*/
    /*}*/
    /*.line1{*/
      /*line-height: p2r(48px);*/
      /*padding-bottom:p2r(32px);*/
      /*border-bottom: 1px #e1e1e1 dotted;*/

    /*}*/
    /*.shopName{*/
      /*@include font-dpr(14px);*/
      /*color:#181818;*/
    /*}*/
    /*.numName{*/
      /*@include font-dpr(21px);*/
      /*color:#f74848;*/
    /*}*/
    /*.line2{*/
      /*margin-top:p2r(32px);*/
    /*}*/
    /*.num{*/
      /*color:#f74848!important;*/
    /*}*/
    /*.line5{*/
      /*margin-bottom: p2r(32px);*/

    /*}*/
    /*.tips{*/
      /*@include font-dpr(11px);*/
      /*color:#181818;*/
      /*margin:p2r(32px) p2r(24px);*/
    /*}*/
  /*}*/
  /*.coupon{*/
    /*width:p2r(702px);*/
    /*height:p2r(154px);*/
    /*border-radius: p2r(12px);*/
    /*background-color: #fff;*/
    /*margin: 0 auto p2r(24px);*/
    /*display:flex;*/
    /*padding:p2r(38px) p2r(24px);*/
    /*box-sizing: border-box;*/
  /*}*/
  /*.btn-get{*/
    /*$h:p2r(60px);*/
    /*width:p2r(138px);*/
    /*height: $h;*/
    /*line-height: $h;*/
    /*color:#fff;*/
    /*@include font-dpr(13px)*/
    /*text-align:center;*/
    /*border-radius: p2r(8px);*/
    /*background-color: #f74848;*/
    /*position: absolute;*/
    /*right:0;*/
    /*top:50%;*/
    /*margin-top: - $h/2;*/
  /*}*/
  /*.btn-get-1{*/
    /*background-color: #e1e1e1;*/
    /*color:#fff;*/
  /*}*/
  /*.logo-coupon{*/
      /*$h:p2r(78px);*/
      /*width:$h;*/
      /*height:$h;*/
      /*@include bg-image('../../assets/img/couponIcon');*/
      /*display: inline-block;*/
  /*}*/
  /*.couponDetail{*/
      /*flex:1;*/
      /*margin-left: p2r(24px);*/
      /*position: relative;*/
  /*}*/
  /*.couponName{*/
    /*@include font-dpr(14px);*/
    /*color:#181818;*/
    /*line-height: p2r(40px);*/
    /*margin-bottom: p2r(10px);*/
  /*}*/
  /*.couponNum{*/
    /*@include font-dpr(11px)*/
    /*color:#7d7d7d;*/
    /*line-height: p2r(24px);*/
  /*}*/
</style>
