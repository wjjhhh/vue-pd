<template>
  <div class="successcontainer">
    <div class="getSuccess">
      <!--<div v-if="status==0">-->
        <!--<div class="logo-success"></div>-->
        <!--<div class="suc">取号成功</div>-->
      <!--</div>-->
      <slot name="success"></slot>
      <div class="detail">
        <div class="line1">
          <span class="shopName">{{queueDetailData.branchName}}</span>
          <span class="numName">{{queueDetailData.tableFlag}}
            <span class="status" v-if="queueDetailData.orderStatus==1">(已就餐)</span>
            <span class="status" v-if="queueDetailData.orderStatus==2">(已过号)</span>
            <span class="status" v-if="queueDetailData.orderStatus==3">(已取消)</span>
          </span>
        </div>
        <div class="line2 line">
          <span class="time">{{queueDetailData.orderTime}}</span>
          <span class="table"><span>{{queueDetailData.tableName}}</span><span>{{queueDetailData.peopleNum}}人</span></span>
        </div>
        <div class="line3 line">
          <span>还需等待</span>
          <span class="num">{{queueDetailData.waittingTableNum}}桌</span>
        </div>
        <div class="line4 line">
          <span>支付金额</span>
          <span>{{queueDetailData.serviceCharge}}元</span>
        </div>
        <div class="line5 line">
          <span>已等待</span>
          <span class="waitTime">{{queueDetailData.waittingTime}}分钟</span>
        </div>
      </div>
      <div class="tips">听到叫号请到迎宾台，过号不作废，过号一桌自动顺延3个号</div>
    </div>
    <div class="coupon" v-if="coupon.couponStatus!=1">
      <div class="logo-coupon"></div>
      <div class="couponDetail">
        <div>
          <div class="couponName">{{coupon.cardName}}</div>
          <div class="couponNum">{{coupon.cashReduceCost}}元（满{{coupon.cashLeastCost}}可用）</div>
        </div>
        <span class="btn-get" :class="coupon.couponStatus==1&&'btn-get-1'" @click="getCoupon">
          <!--<span v-if="couponGet==0">领取</span>-->
          <!--<span v-else-if="couponGet==1">立即使用</span>-->
          <!--<span v-else-if="couponGet==2">已领完</span>-->
          <!--<span v-else-if="couponGet==3">已使用</span>-->
          <span v-if="coupon.couponStatus==1">已领取</span>
          <span v-else-if="coupon.couponStatus==0">领取</span>

        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import {bus} from '../utils/bus.js';
  import axios from 'axios';
  export default{
    name:'queue',
    props:{
      queueDetailData:{
//        default(){
//          return []
//        }
      },
      coupon:{
          default(){
              return{}
          }
      }
    },

    methods:{
      getCoupon(){
        if(this.couponGet==2)return;
//        console.log('进入券详情页')
        var url='/wxQueue/receiveCoupon'
        axios.get(url,{
            params:{
              couponId:this.coupon.couponId,
              openId:this.$store.getters.getOpenId
            }
        }).then((response)=>{
            if(response.data){
                console.log('领取成功')
            }
            else{
              console.log('领取失败')
            }
        }).catch((error)=>{
            console.warn(error)
        })
      },
    },
    data(){
      return{
//        couponGet:0,//0：领取，1：立即使用，2:已领完，3：已使用,

      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  @import '../assets/css/base.scss';
  .successcontainer{
    overflow: hidden;
  }
  .getSuccess{
    width:p2r(702px);
    border-radius: p2r(12px);
    margin:p2r(24px) auto;
    overflow: hidden;
    background-color:#fff;
  .logo-success{
    $size:p2r(130px);
    width:$size;
    height:$size;
  @include bg-image('../assets/img/success');
    display: block;
    margin: p2r(72px) auto p2r(28px);
    overflow: hidden;
  }
  .suc{
  @include font-dpr(15px);
    color:#181818;
    text-align: center;
  }
  .detail{
    margin:p2r(64px) p2r(24px) 0;
    border-bottom: 1px dotted #e1e1e1;
  }
  .line,.line1{
    font-size:0;
  span{
    width:50%;
    display: inline-block;
  &:first-child{
     text-align: left;
   }
  &:last-child{
     text-align: right;
   }
  }
  }
  .line{
    line-height:p2r(24px);
    margin-bottom:p2r(28px);
  span{
  @include font-dpr(13px);
  &:first-child{
     color:#7d7d7d;
   }
  &:last-child{
     color:#454545;
   }
  }
  }
  .line1{
    line-height: p2r(48px);
    padding-bottom:p2r(32px);
    border-bottom: 1px #e1e1e1 dotted;
    .status{
      width:initial;
      @include font-dpr(11px);
      color:#545454;
    }
  }
  .shopName{
  @include font-dpr(15px);
    color:#181818;
  }
  .numName{
  @include font-dpr(22px);
    color:#f74848;
  }
  .line2{
    margin-top:p2r(32px);
    .table{
      span{
        width:initial;
        margin-left: p2r(4px);
      }
    }
  }
  .num{
    color:#f74848!important;
  }
  .line5{
    margin-bottom: p2r(32px);

  }
  .tips{
  @include font-dpr(12px);
    color:#181818;
    margin:p2r(32px) p2r(24px);
  }
  }
  .coupon{
    width:p2r(702px);
    height:p2r(154px);
    border-radius: p2r(12px);
    background-color: #fff;
    margin: 0 auto p2r(24px);
    display:flex;
    padding:p2r(38px) p2r(24px);
    box-sizing: border-box;
  }
  .btn-get{
    $h:p2r(60px);
    width:p2r(138px);
    height: $h;
    line-height: $h;
    color:#fff;
    @include font-dpr(14px);
    text-align:center;
    border-radius: p2r(8px);
    background-color: #f74848;
    position: absolute;
    right:0;
    top:50%;
    margin-top: - $h/2;
  }
  .btn-get-1{
    background-color: #e1e1e1;
    color:#fff;
  }
  .logo-coupon{
    $h:p2r(78px);
    width:$h;
    height:$h;
  @include bg-image('../assets/img/couponIcon');
    display: inline-block;
  }
  .couponDetail{
    flex:1;
    margin-left: p2r(24px);
    position: relative;
  }
  .couponName{
  @include font-dpr(15px);
    color:#181818;
    line-height: p2r(40px);
    margin-bottom: p2r(10px);
  }
  .couponNum{
  @include font-dpr(12px);
  color:#7d7d7d;
    line-height: p2r(24px);
  }
</style>
