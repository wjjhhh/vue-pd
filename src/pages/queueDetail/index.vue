<template>
  <div>
    <Queue :queueDetailData="queueDetailData" :coupon="coupon"></Queue>
    <div class="cancelQueue" @click="dialogShow=true" v-if="orderStatus===0">取消排队</div>
    <DDialog v-if="dialogShow" v-bind:content="content">
      <div slot="btns" class="btns">
        <span @click="cancelFun">确定</span>
        <span @click="dialogShow=false">取消</span>
      </div>
    </DDialog>
    <Loading v-show="loading"></Loading>
  </div>
</template>
<script>
  import Queue from '../../components/Queue.vue'//排队单组件
  import DDialog from '../../components/Dialog.vue'//对话框组件
  import axios from 'axios';
  import Loading from '../../components/Loading.vue'
  export default{
    name:'queueDetail',
    components:{
      Queue,
      DDialog,
      Loading
    },
    created(){
      this.fetchData();
    },
    methods:{
      fetchData(){
//          var url='http://localhost:8081/mock/queueDetail.json'
          var url='/wxQueue/getOrderDetail'
          axios.get(url,{
              params:{
                orderId:this.$route.params.orderId,
                linesvrId:this.$route.params.linesvrId
              }
          }).then((response)=>{
              this.queueDetailData=response.data;
              this.loading=false;
              this.orderStatus=response.data.orderStatus;
              this.coupon.cardName=response.data.cardName;
              this.coupon.cashReduceCost=response.data.cashReduceCost;
              this.coupon.cashLeastCost=response.data.cashLeastCost;
              this.coupon.couponStatus=response.data.couponStatus;
          }).catch((error)=>{
              console.warn(error)
          })
      },
      cancelFun(){
        console.log('取消排队')
        var url='/wxQueue/deleteOrder'
        axios.get(url,{
            params:{
              orderId:this.$route.params.orderId,
              openId:this.$store.getters.getOpenId,
//              linesvrId:this.queueDetailData.linesvrId
            }
        }).then((response)=>{
            if(response.data.code==1){
                console.log('取消成功')
                this.$router.go(-1);
            }
            else if(response.data.code==-1){
              console.log('取消失败')
            }
            else if(response.data.code==4001){
                console.log('异常')
            }
        }).catch((error)=>{
            console.warn(error)
        })
      }
    },
    mounted(){
//      console.log(this.$route.params.status)
    },
    watch:{
      '$route':'fetchData'
    },
    data(){
      return{
        dialogShow:false,
        queueDetailData:{},
        coupon:{},
        orderStatus:1,//0为出现取消排队，1则不出现取消排队按钮
        content:'取消后不可撤回，取号服务费不退还，确定取消吗？',
        loading:true
      }

    }
  }

</script>
<style type="text/scss" lang="scss" scoped>
  @import '../../assets/css/base.scss';
  .cancelQueue{
    $h:p2r(80px);
    width:p2r(332px);
    height: $h;
    line-height: $h;
    @include font-dpr(15px);
    color:#545454;
    border:1px solid #d0d0d0;
    background-color: #fff;
    margin: p2r(60px) auto;
    text-align: center;
    border-radius: p2r(8px);
  }
</style>

