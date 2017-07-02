<template>
  <div>
    <header>取号成功后，服务费不予退还哦</header>
    <section>
      <div class="shopName">{{shopBranchName}}</div>
      <div class="detail">
        <div>人数<span>{{peopleNum}}人</span></div>
        <div>桌型<span>{{tableName}}</span></div>
      </div>
      <div class="price">￥<span>{{serviceCharge}}</span></div>
    </section>
    <div class="btn-pay" @click="pay">确认支付</div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default{
    data(){
      return{
          shopBranchName:this.$route.params.shopBranchName,
          tableName:this.$route.params.tableName,
          peopleNum:this.$route.params.peopleNum,
          serviceCharge:this.$route.params.serviceCharge
      }
    },
    methods:{
      pay(){
        console.log('确认支付')
//        axios.get(url,{
//            params:{
//              shopId:'',
//              shopBranchId:'',
//              openId:this.$store.getters.getOpenId,
//              totalFee:this.$route.params.serviceCharge,
//              tableName:this.$route.params.tableName,
//              waittingTableNum:'',
//              linesvrState:'',
//              remark:'',
//              peopleNum:this.$route.params.peopleNum,
//              linesvrId:'',
//              userPhone:this.$store.getters.getUserInfo.phoneNumber
//            }
//        })
//        if(Math.random()>.5){
//          this.$router.push({
//            name:'getNum'
//          })
//        }
//       else{
//          this.$router.push({
//            name:'getFail'
//          })
//        }
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  @import '../../assets/css/base.scss';
  header{
    $h:p2r(90px);
    height: $h;
    line-height: $h;
    text-align: center;
    @include font-dpr(13px);
    color:#c78300;
    border-bottom: 1px solid #fcd187;
    background-color: #fff5d8;
  }
  section{
    width:p2r(750px);
    height: p2r(229px);
    @include bg-image('../../assets/img/couponBg');
    margin:p2r(12px) auto p2r(68px);
    padding:p2r(36px) p2r(24px);
    box-sizing: border-box;
    position: relative;
  }
  .shopName{
    @include font-dpr(18px);
    color:#181818;
  }
  .detail{
    @include font-dpr(13px);
    color:#7d7d7d;
    position: absolute;
    bottom:p2r(36px);
     div{
       &:last-child{
          margin-top: p2r(14px);
        }
       }
    span{
      margin-left: p2r(20px);
    }
  }
  .price{
    @include font-dpr(18px);
    position: absolute;
    bottom:p2r(36px);
    right: p2r(24px);
    color:#f74848;
    span{
    @include font-dpr(28px);
      margin-left:p2r(10px);
    }
  }
  .btn-pay{
    @include font-dpr(15px);
    $h:p2r(90px);
    width:p2r(702px);
    height:$h;
    line-height: $h;
    background-color: #f74848;
    color:#fff;
    text-align: center;
    margin:auto;
    border-radius: p2r(6px);
  }
</style>
