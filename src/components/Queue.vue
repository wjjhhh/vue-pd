
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
          <span class="num" v-if="queueDetailData.orderStatus==1||queueDetailData.orderStatus==2||queueDetailData.orderStatus==3" style="color:#454545">
            --桌
          </span>
          <span class="num" v-else style="color:#f74848">
            {{queueDetailData.waittingTableNum}}桌
          </span>
        </div>
        <div class="line4 line" v-if="queueDetailData.serviceCharge>0">
          <span>支付金额</span>
          <span v-if="queueDetailData.serviceCharge>0">{{queueDetailData.serviceCharge|priceFilter}}元</span>
          <span v-else>--</span>
        </div>
        <div class="line5 line">
          <span>已等待</span>
          <span class="waitTime">
            {{(queueDetailData.orderStatus==2||queueDetailData.orderStatus==3)?'--':queueDetailData.waittingTime}}分钟
          </span>
        </div>
      </div>
      <div class="tips">{{queueDetailData.takeNumRemind}}</div>
    </div>
    <!--已过号和已取消，不显示优惠券-->

    <div v-if="queueDetailData.orderStatus!=2&&queueDetailData.orderStatus!=3">
      <div class="coupon" v-if="coupon.couponId">
        <div class="logo-coupon"></div>
        <div class="couponDetail">
          <div v-if="coupon.cardType=='cash'">
            <div class="couponName">{{coupon.cardName}}</div>
            <div class="couponNum">{{coupon.cashReduceCost}}元（满{{coupon.cashLeastCost}}可用）</div>
          </div>
          <div v-if="coupon.cardType=='discount'">
            <div class="couponName">{{coupon.cardName}}</div>
            <div class="couponNum">{{(100-coupon.discount)/10}}折</div>
          </div>
          <div v-if="coupon.cardType=='gift'">
            <div class="couponName">{{coupon.cardName}}</div>
            <div class="couponNum">{{coupon.gift}}</div>
          </div>
          <div v-if="coupon.cardType=='general_coupon'">
            <div class="couponName">{{coupon.cardName}}</div>
            <div class="couponNum">{{coupon.subTitle}}</div>
          </div>
          <span class="btn-get" :class="coupon.couponStatus==1&&'btn-get-1'" @click="getCoupon">
            <span v-if="coupon.couponStatus==1">已领取</span>
            <span v-else-if="coupon.couponStatus==0">领取</span>
          </span>
        </div>
      </div>
     </div>
    <Toast v-show="toasting" v-bind:content="content"></Toast>
    <Loading v-show="loading"></Loading>
  </div>

</template>

<script>
  import {bus} from '../utils/bus.js';
  import axios from 'axios';
  import Toast from '../components/toast.vue'
  import Loading from '../components/Loading.vue'
  import priceFilter from '../filters/price.js'
  export default{
    name:'queue',
    components:{
      Toast,
      Loading
    },
    filters:{
      priceFilter
    },
    mounted(){

    },
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
          //假如已经领过此券
        if(this.coupon.couponStatus==1){
            this.takeCouponCentre();
            return;
        }
//        console.log('进入券详情页')
        this.loading=true;
        var url='/wxQueue/receiveCoupon'
        this.$http.post(url,{
          couponId:this.coupon.couponId,
          openId:this.$store.getters.getOpenId,
          shopId:this.$store.getters.getShopId,
          linesvrId:this.$route.params.linesvrId,
          orderId:this.$route.params.orderId
        }).then((response)=>{
              //领取成功
              if(response.data.code==1){
                  if(this.coupon.couponStatus=1){
                      this.content='已领取'
                  }
                  else{
                    this.coupon.couponStatus=1
                    this.content='领取成功'
                    this.toasting=true;
                    var _this=this;
                    window.setTimeout(()=>{_this.toasting=false},1500)
                  }
                //设置session，防止缓存
                sessionStorage.PAGEVERSION=new Date().getTime();
                  window.location.href=response.data.message;

              }
              //领取失败
              else{
                this.content=response.data.message;
                this.toasting=true;
                var _this=this;
                window.setTimeout(()=>{_this.toasting=false},1500)
              }

          this.loading=false;
        }).catch((error)=>{
          console.warn(error)
        })
      },
      //点击已领取券
      takeCouponCentre(){
          console.log('领取过')
        this.loading=true;
        var url='/wxQueue/takeCouponCentre'
        this.$http.post(url,{
          couponId:this.coupon.couponId,
          openId:this.$store.getters.getOpenId,
//          shopId:this.$store.getters.getShopId,
//          linesvrId:this.$route.params.linesvrId,
          orderId:this.$route.params.orderId
        }).then((response)=>{
          //成功跳转
          if(response.data.code==1){
              window.location.href=response.data.url;
          }
          //领取失败
          else{
            this.content='网络异常';
            this.toasting=true;
            var _this=this;
            window.setTimeout(()=>{_this.toasting=false},1500)
          }
          this.loading=false;
        }).catch((error)=>{
          console.warn(error)
        })
      }
    },
    data(){
      return{
//        couponGet:0,//0：领取，1：立即使用，2:已领完，3：已使用,
        canShow:false,//避免优惠券闪现闪消失,
        toasting:false,
        content:'',//toast文案
        loading:false,
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
  @include font-dpr(16px);
    color:#181818;
    text-align: center;

  }
  .detail{
    margin:p2r(36px) p2r(24px) 0;
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
    .shopName{
      display: -webkit-box;
    }
  }
  .line{
    line-height:p2r(24px);
    margin-bottom:p2r(28px);
  span{
  @include font-dpr(14px);
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
    padding-bottom:p2r(36px);
    border-bottom: 1px #e1e1e1 dotted;
    position: relative;
    .status{
      width:initial;
      @include font-dpr(11px);
      color:#545454;
    }
  }
  .shopName{
  @include font-dpr(16px);
  @include linesEllipsis(2);
    color:#181818;
    word-break: break-all;
  }
  .numName{
  @include font-dpr(25px);
    color:#f74848;
    position: absolute;
    right: 0;
    top: 0;
  }
  .line2{
    margin-top:p2r(32px);
    .table{
      span{
        width:initial;
        margin-left: p2r(4px);
        color:#454545;
      }
    }
  }
  .num{
    color:#f74848;
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
    -webkit-appearance:none;
    outline:none;
    span{
      -webkit-appearance:none;
      outline:none
    }
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
