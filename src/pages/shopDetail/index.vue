<template>
  <div style="background-color:#fff;padding-bottom: 1px;">
    <header class="tableHeader">
      <nav>餐桌类型</nav><nav>等待桌数</nav>
    </header>
    <ul>
      <li class="tables" v-for="item in table">
        <div class="tableDetail">
          <div class="tableType">{{item.type}}</div>
          <div class="tablePer">{{item.min}}{{item.max==0?'人以上':-item.max+'人'}}</div>
        </div>
        <div class="tableNum"><span class="num">{{item.num}}</span><span>桌</span></div>
      </li>
    </ul>
    <div class="btn-getNum" @click="getNumFun"><span v-if="!free">￥{{getNum|priceFilter}}</span>取号</div>
    <div class="getNum">
      <header>取号优惠</header>
      <div class="couponInfo"><span class="logo"></span><div>取号成功送【xxxxxxxxx】优惠券一张<span style="color:#bfbfbf;">（已派完）</span></div></div>
      <div class="explainInfo"><span class="logo"></span><div>等待1小时等待1小时等待1小时等待1小时等待1小时等待1小时等待1小时等待1小时等待1小时等待1小时等待1小时</div></div>
    </div>

    <div class="getNumRule">
      <header>取号规则：</header>
      <ul>
        <li>排队取号仅限当前时间段使用，过号一桌自动顺延三个号</li>
        <li>排队取号仅限当前时间段使用，过号一桌自动顺延三个号</li>
        <li>排队取号仅限当前时间段使用，过号一桌自动顺延三个号</li>
        <li>排队取号仅限当前时间段使用，过号一桌自动顺延三个号</li>
      </ul>
    </div>
    <CheckPhoneDialog v-if="checkPhoneDialog" v-bind:min="min" v-bind:max="max" v-bind:numRange="numRange"></CheckPhoneDialog>
  </div>
</template>
<script>
  import checkPhoneDialog from '../../components/CheckPhoneDialog.vue'
  import {bus} from '../../utils/bus.js'
  import priceFilter from '../../filters/price.js'
  export default{
    components:{
      'CheckPhoneDialog':checkPhoneDialog
    },
    mounted(){
      this.tableSort(this.calNumRange);

    },
    filters:{
      priceFilter
    },
    methods:{
      //桌排序
      tableSort(callback){
        this.table=this.table.sort(function(a,b){
          return a.min- b.min;
        })
        callback();
      },
      //可选人数计算
      calNumRange(){
        let len=this.table.length;
            let max=this.table[len-1].max;
        this.min=this.table[0].min;
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
      getNumFun(){
        if(this.hasBind){
          this.checkPhoneDialog=true;
        }
      },
    },
    created(){
      var _this=this;
      bus.$on('closeCheckPhone',function(){
        _this.checkPhoneDialog=false;
      })
      bus.$on('chooseEatNum',function(num){
        if(!_this.free){
          _this.$router.push({
            name:'pay'
          })
        }
        else{
          _this.$router.push({
            name:'getNum'
          })
        }
      })
    },
    data(){
      return{
        checkPhoneDialog:false,
        hasBind:true,//true为已经绑定手机，否则为false
        getNum:2.1,//取号
        table:[
          {type:'中桌',min:3,max:15,num:12},
          {type:'小桌',min:2,max:3,num:6},
          {type:'大卓',min:16,max:0,num:1}
        ],
        min:0,//可选人数最小
        max:0,//可选人数最多,
        numRange:[0,0],
        free:true,//true:免费取号
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
