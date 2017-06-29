<template>
  <div class="queuesContainer">
    <Empty v-if="queueList.length==0"></Empty>
    <Queue :queue="queue" v-for='queue in queueList1' :key="queue.id"></Queue>
    <div class="old">
      <div v-if="queueList0.length" class="oldTitle">
        <span class="dotted"></span><span class="content">历史</span><span class="dotted"></span>
      </div>
      <Queue :queue="queue" v-for='queue in queueList0' :key="queue.id"></Queue>
    </div>
    <Loading v-show="isLoading"></Loading>
  </div>
</template>

<script>
  import Queue from './template/queue.vue';
  import Loading from '../../components/Loading.vue'
  import Empty from '../../components/Empty.vue'
  import axios from 'axios';
  import $cookies from '../../utils/cookies.js'
  export default{
    components:{
      Queue,
      Loading,
      Empty
    },
    created(){
        this.isLoading=false;
        this.fetchData();
    },
    methods:{
       //排队单分组
      dealQueueList(){
        this.queueList0=this.queueList.filter(function(item,i){
          return item.orderStatus!=0
        })
        this.queueList1=this.queueList.filter(function(item,i){
          return item.orderStatus==0
        })
      },
      fetchData(){
        if(this.$route.name!='queue')return;
//        var url='http://localhost:8081/mock/queue.json';
        var url='/wxQueue/getConsumerOrderList';
        this.isLoading=true;
        axios.get(url,{
            params:{
                openId:this.$store.getters.getOpenId
            }
        }).then((response)=>{
          if(typeof response.data){
              if(JSON.stringify(response.data)=='{}'){
                return;
              }
          }
          this.isLoading=false;
          this.queueList=response.data.consumerOrderList;
          this.dealQueueList()
        }).catch((error)=>{
            console.warn(error)
        })
      },
    },
    //强制刷新请求
    watch:{
      '$route':['fetchData']
    },
    data(){
      return{
        queueList:[],
        queueList0:[],
        queueList1:[],
        isLoading:true,
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  @import '../../assets/css/base.scss';
  .queuesContainer{
    padding-top: p2r(24px);
  }
  .oldTitle{
    text-align: center;
    display:flex;
    height: p2r(34px);
    line-height:p2r(34px);
    margin: p2r(42px) p2r(24px) p2r(48px);
    span{
      position:relative;
      /*&:before{*/
         /*content:'';*/
         /*border-bottom:5px dotted #e1e1e1;*/
         /*position: absolute;*/
         /*display: block;*/
         /*width:100%;*/
         /*right:100%;*/
       /*}*/
      /*&:after{*/
         /*content:'';*/
         /*border-bottom:1px dotted #e1e1e1;*/
         /*position: absolute;*/
         /*width:100%;*/
       /*}*/
    }
    .content{
      color:#adadad;
      @include font-dpr(14px);
    }
    .dotted{
      height: 50%;
      flex:1;
      border-bottom: 1px dotted #e1e1e1;
    }
  }
</style>
