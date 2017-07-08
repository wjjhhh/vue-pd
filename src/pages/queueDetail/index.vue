<template>
  <div>
    <Queue :queueDetailData="queueDetailData" :coupon="coupon" v-if="afterInit"></Queue>
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
          if(this.$route.name!='queueDetail'){
              return;
          }
          if(this.$route.name=='queueDetail'){
            this.checkUserBindedWechat()
          }

//          var url='http://localhost:8081/mock/queueDetail.json'
          var url='/wxQueue/getOrderDetail1'
          axios.get(url,{
              params:{
                orderId:this.$route.params.orderId,
                linesvrId:this.$route.params.linesvrId,
                source:this.$route.params.source
              }
          }).then((response)=>{
              this.queueDetailData=response.data;
              this.queueDetailData.serviceCharge=response.data.totalFee;
              this.loading=false;
              this.orderStatus=response.data.orderStatus;
              this.coupon.cardName=response.data.cardName;
              this.coupon.cashReduceCost=response.data.cashReduceCost;
              this.coupon.cashLeastCost=response.data.cashLeastCost;
              this.coupon.couponStatus=response.data.couponStatus;
              this.coupon.couponId=response.data.couponId;
              this.coupon.listing=response.data.list;
              this.coupon.cardType=response.data.cardType;
              this.coupon.discount=response.data.discount;
              this.coupon.gift=response.data.gift;
              this.coupon.subTitle=response.data.subTitle;

              this.afterInit=true;
              //有取号费的情况
              if(this.queueDetailData.serviceCharge>0){
                this.content='取消后不可撤回，取号服务费不退还，确定取消吗？'
              }
              //改变title
            document.title=response.data.branchName
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
                this.dialogShow=false;
                this.$router.push({
                  name:'queue',
                  params:{
                    openId:this.$store.getters.getOpenId
                  }
                })
            }
            else if(response.data.code==-1){
              console.log('取消失败')
            }
            else if(response.data.code==4001){
                console.log('网络异常')
            }
        }).catch((error)=>{
            console.warn(error)
        })
      },
      //验证有无关注公众号
      checkUserBindedWechat(){
        var SHOP_SERIAL = this.$store.getters.getSerial;
        //调用全局验证方法
        checkUserBindedWechatFun(SHOP_SERIAL)
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
        content:'取消后不可撤回确定取消吗？',
        loading:true,
        afterInit:false,//确保请求顺序
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

