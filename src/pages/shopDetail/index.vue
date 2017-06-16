<template>
  <div style="background-color:#fff;padding-bottom: 1px;">
    <header class="tableHeader">
      <nav>餐桌类型</nav><nav>等待桌数</nav>
    </header>
    <ul>
      <li class="tables" v-for="item in lineUpList.List">
        <div class="tableDetail">
          <div class="tableType">{{item.tableName}}</div>
          <div class="tablePer">{{item.lowerNumber}}{{item.limitNumber==0?'人以上':-item.limitNumber+'人'}}</div>
        </div>
        <div class="tableNum"><span class="num">{{item.waittingNum}}</span><span>桌</span></div>
      </li>
    </ul>
    <div class="btn-getNum" @click="getNumFun"><span v-if="lineUpList.isServiceCharge">￥{{lineUpList.serviceCharge|priceFilter}}</span>取号</div>
    <div class="getNum">
      <header>取号优惠</header>
      <!--<div class="couponInfo"><span class="logo"></span><div>取号成功送【xxxxxxxxx】优惠券一张<span style="color:#bfbfbf;">（已派完）</span></div></div>-->
      <div class="explainInfo" v-if="lineUpList.isShowInfo">
        <span class="logo"></span>
        <div ref="line"></div>
      </div>
    </div>

    <div class="getNumRule">
      <header>取号规则：</header>
      <ul>
        <li>排队取号仅限当前时间段使用，过号一桌自动顺延三个号。</li>
        <li v-if="lineUpList.isServiceCharge">为避免线上随意取号，造成空号码影响排队秩序，商家向您收取线上取号服务费。</li>
        <li v-if="lineUpList.isServiceCharge">如过号或若您行程有变，取号支付服务费用概不退还。</li>
      </ul>
    </div>
    <CheckPhoneDialog v-if="checkPhoneDialog" v-bind:min="min" v-bind:max="max" v-bind:numRange="numRange"></CheckPhoneDialog>
    <Loading v-show="loading"></Loading>
  </div>
</template>
<script>
  import checkPhoneDialog from '../../components/CheckPhoneDialog.vue'
  import {bus} from '../../utils/bus.js'
  import priceFilter from '../../filters/price.js'
  import Loading from '../../components/Loading.vue'
  import axios from 'axios';
  export default{
    components:{
      'CheckPhoneDialog':checkPhoneDialog,
      Loading
    },
    mounted(){
    },
    filters:{
      priceFilter,
    },
    methods:{
      //桌排序
      tableSort(){
        this.lineUpList.List=this.lineUpList.List.sort(function(a,b){
          return a.lowerNumber- b.lowerNumber;
        })
        this.calNumRange(this.lineUpList.List);
      },
      //可选人数计算
      calNumRange(arr){
        let len=arr.length;
        let max=arr[len-1].limitNumber;
        this.min=arr[0].lowerNumber;
        this.max=max==0?20:max;
        this.createRange(this.min,this.max)
      },
      //可选择就餐人数范围生成
      createRange(min,max){
        var _arr=[],temp=min,max=max>=20?20:max;
        while(temp<=max){
          _arr.push(temp);
          temp++;
        }
        this.numRange=_arr;
      },
      //取号优惠信息换行
      newline(str){
          var str1='<div>';
          var str2=str.replace(/\n|\r|(\r\n)|(\u0085)|(\u2028)|(\u2029)/g,'</div><div>');
          str2+='</div>';
          var div=document.createElement('div');
          div.innerHTML=str1+str2
          this.$nextTick(()=>{
              this.$refs.line.appendChild(div)
          })
      },
      getNumFun(){
        if(this.hasBind){
          this.checkPhoneDialog=true;
        }
      },
      //请求数据
      fetchData(){
        console.log('请求')
        var url='http://localhost:8080/mock/getShopConfigTable.json';
        axios.get(url).then((response)=>{
            this.loading=false;
            this.lineUpList=response.data.lineUpList;
            this.tableSort();
            this.newline(this.lineUpList.discountInfo);
        }).catch((err)=>{
            console.warn(err)
        })
      }
    },
    created(){
      var _this=this;
      bus.$on('closeCheckPhone',function(){
        _this.checkPhoneDialog=false;
      })
      //取号，生成订单
      bus.$on('chooseEatNum',function(num){
         //计算人数在哪张桌，得出tableId
        var arr=_this.lineUpList.List,len=arr.length,tableId;
        while(len){
            if(num>=arr[len-1].lowerNumber&&num<=arr[len-1].limitNumber){
                tableId=arr[len-1].tableId;
                break;
            }
            len--;
        }
         var url='';
          axios.get(url,{
            params:{
              shopBranchId:_this.lineUpList.shopBranchId,
              peopleNum:num,
              serviceCharge:_this.lineUpList.isServiceCharge,
              tableId:tableId,
              userPhone:'',
              openid:''
            }
          }).then((response)=>{
            if(response.data.success){
                console.log('创建成功')
                console.log('相关信息:'+response.data.respMsg)
            }
          }).catch((err)=>{
            console.warn(err);
          })
        //需给服务费
        if(_this.lineUpList.isServiceCharge){
          _this.$router.push({
            name:'pay'
          })
        }
        //不需给服务费，直接取号
        else{
          _this.$router.push({
            name:'getNum'
          })
        }
      })
      this.fetchData();
    },
    data(){
      return{
        checkPhoneDialog:false,
        hasBind:true,//true为已经绑定手机，否则为false
        numRange:[0,0],
        min:0,//可选人数最小
        max:0,//可选人数最多,
        lineUpList:{},
        loading:true,
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  @import '../../assets/css/base.scss';

  .tableHeader{
    $h:p2r(90px);
    height: $h;
    line-height: $h;
    background-color:#ececec;
    color:#181818;
    @include font-dpr(15px);
    nav{
      width:50%;
      display: inline-block;
      text-align: center;
    }
  }
  .btn-getNum{
    $h:p2r(90px);
    width:p2r(654px);
    height:$h;
    line-height: $h;
    background-color:#F74849;
    border-radius: p2r(6px);
    color:#fff;
    text-align: center;
    margin: p2r(56px) auto;
    @include font-dpr(15px);
  }
  .tables{
    height: p2r(104px);
    box-sizing: border-box;
    font-size:0;
    text-align:center;
    border:1px solid #e1e1e1;
    background-color: #fff;
    display:flex;
    >div{
       $h:p2r(104px);
       display: inline-block;
       width:50%;
       height: $h;
       line-height: $h;
     }
  }
  .tableDetail{
    display: table;
    >div{
       height: 50%;
       align-items: center;
       display: flex;
       justify-content: center;

     }
  }
  .tableType{
    @include font-dpr(14px);
    color:#181818;
  }
  .tablePer{
    @include font-dpr(10px);
    color:#545454;
  }
  .tableNum{
    .num{
      @include font-dpr(18px);
      color:#f74848;
      &+span{
          @include font-dpr(13px);
          color:#181818;
          margin-left: .2em;
        }
    }

  }
  .getNum{
    color:#545454;
    margin:0 p2r(48px) p2r(56px);
    header{
    @include font-dpr(14px);
      padding-bottom:p2r(30px);
      box-sizing: border-box;
      border-bottom: 1px #e1e1e1 solid;
      display:flex;
    }
  }

  .couponInfo,.explainInfo{
    @include font-dpr(12px);
    line-height: p2r(34px);
    word-wrap: break-word;
    word-break: break-all;
  }
  .couponInfo,.explainInfo{
    display:flex;
    .logo{
      $size:p2r(34px);
      width:$size;
      height: $size;
      display: inline-block;
      vertical-align: top;
      margin-right: p2r(14px);
    }
    div{
      flex:1;
    }
  }
  .couponInfo{
    margin:p2r(30px) 0 p2r(14px);
    .logo{
      @include bg-image('../../assets/img/coupon');
    }
  }
  .explainInfo{
    margin:p2r(30px) 0 p2r(14px);
     .logo{
      @include bg-image('../../assets/img/explain');
    }
  }
  .getNumRule{
    @include font-dpr(12px);
    margin:0 p2r(48px) p2r(56px);
    padding:p2r(22px) p2r(24px) p2r(24px);
    line-height: p2r(44px);
    color:#adadad;
    background-color:#f5f5f5;
    header{
    @include font-dpr(12px);
    }
    li{
    @include font-dpr(12px);
      list-style: initial;
      margin-left: 1em;
    }
  }
</style>
