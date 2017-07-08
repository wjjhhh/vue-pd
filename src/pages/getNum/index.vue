<template>
  <div class="successcontainer" >
    <Queue :queueDetailData="queueDetailData" :coupon="coupon" v-if="afterFetch">
      <div slot="success">
        <div class="logo-success"></div>
        <div class="suc">取号成功</div>
      </div>
    </Queue>
  </div>
</template>
<script>
  import Queue from '../../components/Queue.vue'//排队单组件
  import axios from 'axios';
  import {bus} from '../../utils/bus.js'
  export default{
    components:{
      Queue
    },
    created(){
      this.fetchData();
    },
//    mounted(){
//      this.fetchData();
//    },
    watch:{
      '$route':'fetchData'
    },
    methods:{
      getCoupon(){
//        if(this.couponGet==2)return;
//
//        console.log('进入券详情页')
      },
      //拉取数据
      fetchData(){

          if(this.$route.name!='getNum')return;
        this.afterFetch=false;
//        console.log('有刷新')

//          var url='http://localhost:8081/mock/queueDetail.json';

        var url='/wxQueue/noMoneySuccessOrder';
          var _this=this;
        axios.get(url,{
            params:{
              orderId:_this.$route.params.orderId,
//              shopBranchName:_this.$route.params.shopBranchName,
              shopBranchId:_this.$route.params.shopBranchId,
              linesvrId:_this.$route.params.linesvrId,
            }
        }).then((response)=>{
            var obj=response.data;
            this.queueDetailData.branchName=obj.shopBranchName;
            this.queueDetailData.tableFlag=obj.tableType;
            this.queueDetailData.orderStatus=obj.linesvrStatus;
            this.queueDetailData.orderTime=obj.getNumberTime;
            this.queueDetailData.tableName=obj.tableName;
            this.queueDetailData.peopleNum=obj.peopleNum;
            this.queueDetailData.waittingTableNum=obj.waittingTableNum;
            this.queueDetailData.serviceCharge=obj.serviceCharge;
            this.queueDetailData.waittingTime=obj.averageWaitTime;
            this.queueDetailData.takeNumRemind=obj.takeNumRemind;
            this.coupon.cardName=obj.cardName;
            this.coupon.cashLeastCost=obj.cashLeastCost;
            this.coupon.cashReduceCost=obj.cashReduceCost;
            this.coupon.couponId=obj.couponId;
            this.coupon.listing=obj.listing;
            this.coupon.cardType=obj.cardType;
            this.coupon.discount=obj.discount;
            this.coupon.gift=obj.gift;
            this.coupon.subTitle=obj.subTitle;
            this.coupon.couponStatus=obj.couponStatus;
            console.log('title:'+obj.shopBranchName)
            document.title=obj.shopBranchName;
            this.afterFetch=true;
        }).catch((error)=>{
            console.warn(error)
        })
      }
    },
    mounted(){
//      console.log(this.couponGet)
    },
    data(){
      return{
        couponGet:2,//0：领取，1：立即使用，2:已领完，3：已使用,
        queueDetailData:{},
        coupon:{},
        afterFetch:false
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  @import '../../assets/css/base.scss';
  .successcontainer{
    overflow: hidden;
  }
    .logo-success{
      $size:p2r(130px);
      width:$size;
      height:$size;
      @include bg-image('../../assets/img/success');
      display: block;
      margin: p2r(72px) auto p2r(28px);
      overflow: hidden;
    }

</style>
