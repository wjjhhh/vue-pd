<template>
  <div :class="queue.orderStatus==0?'queue1':'queue0'" class='queue' @click="gotoShop(queue.shopBranchId,queue.orderStatus)">
    <div class="shopName">{{queue.branchName}}</div>
    <div class="table">
      <div class="tableType">
        <span>{{queue.tableName}}</span><span>已取号</span>
      </div>
      <div class="tableStatus">
        <span>还需等待</span><span class="tableLeft">{{queue.orderStatus==0?queue.waittingTableNum:'--'}}桌</span>
      </div>
      <div class="tableName">{{queue.tableFlag}}</div>
    </div>
    <div class="tableTime">排号时间：{{queue.orderTime}}</div>
  </div>
</template>

<script>
  export default{
    props:{
      queue:{
        type:Object,
        default(){
          return{}
        }
      }
    },
    methods:{
      gotoShop(id,status){
        console.log('进入排单号详情')
        this.$router.push({
          name:'queueDetail',
          params:{
            oddNumber:id,
            status:status
          }
        })
      }
    }
  }
</script>

<style  type="text/scss" lang="scss" scoped>
  @import "../../../assets/css/base";
  .queue{
    width:p2r(702px);
    height: p2r(290px);
    background-color: #fff;
    margin:0 auto p2r(24px);
    border-radius: p2r(12px);
    padding:p2r(30px) p2r(24px) 0;
    box-sizing: border-box;
    .shopName{
      @include font-dpr(18px);
    }
    .table{
      padding:p2r(40px) 0 p2r(30px);
      border-bottom: 1px dotted #e1e1e1;
      position: relative;
    }
    .tableType,.tableStatus{
      @include font-dpr(12px);
      line-height: p2r(24px);
      color:#7d7d7d;
      span{
        margin-right: p2r(20px);
      }
    }
    .tableType{
      margin-bottom: p2r(14px);
    }
    .tableName{
      @include font-dpr(30px);
      position: absolute;
      bottom:p2r(30px);
      right: 0;
    }
    .tableTime{
      margin-top: p2r(30px);
    }
  }
  .queue1{
    .shopName{
      color:#181818;
    }
    .tableName,.tableLeft{
      color:#f74848;
    }
  }
  .queue0{
    color:#d0d0d0;
  }
</style>
