<template>
  <div style="background-color:#fff;padding-bottom: 1px;">
    <header class="tableHeader">
      <nav>餐桌类型</nav><nav>等待桌数</nav>
    </header>
    <ul>
      <li class="tables" v-for="item in lineUpList.tableList">
        <div class="tableDetail">
          <div class="tableType"><span>{{item.tabName}}</span></div>
          <div class="tablePer"><span>{{item.lowerNumber}}{{item.limitNumber==0?'人以上':-item.limitNumber+'人'}}</span></div>
        </div>
        <div class="tableNum">
            <span class="num">{{item.waittingNum}}</span><span>桌</span>
        </div>
      </li>
    </ul>
    <div class="btn-getNum" @click="getNumFun"><span v-if="lineUpList.isServiceCharge" style="margin-right: .4em">￥{{lineUpList.serviceCharge|priceFilter}}</span>取号</div>
    <div class="getNum">
      <header>取号优惠</header>
      <!--<div class="couponInfo"><span class="logo"></span><div>取号成功送【xxxxxxxxx】优惠券一张<span style="color:#bfbfbf;">（已派完）</span></div></div>-->
      <div class="explainInfo" v-if="lineUpList.isShowInfo">
        <span class="logo"></span>
        <div ref="line" class="line"></div>
      </div>
    </div>

    <div class="getNumRule">
      <header>取号须知：</header>
      <ul>
        <li>排队取号仅限当前时间段使用，过号一桌自动顺延三个号。</li>
        <li v-if="lineUpList.isServiceCharge">为避免线上随意取号，造成空号码影响排队秩序，商家向您收取线上取号服务费。</li>
        <li v-if="lineUpList.isServiceCharge">如过号或若您行程有变，取号支付服务费用概不退还。</li>
      </ul>
    </div>
    <CheckPhoneDialog v-if="checkPhoneDialog" v-bind:min="min" v-bind:max="max" v-bind:numRange="numRange" v-bind:hasBind="hasBind"></CheckPhoneDialog>
    <Loading v-show="loading"></Loading>
    <transition name="fade">
      <Toast v-show="toasting" v-bind:content="content"></Toast>
    </transition>

  </div>
</template>
<script>
  import checkPhoneDialog from '../../components/CheckPhoneDialog.vue'
  import {bus} from '../../utils/bus.js'
  import priceFilter from '../../filters/price.js'
  import Loading from '../../components/Loading.vue'
  import Toast from '../../components/toast.vue'
  import axios from 'axios';

  export default{
    components:{
      'CheckPhoneDialog':checkPhoneDialog,
      Loading,
      Toast
    },
    mounted(){
    },
    filters:{
      priceFilter,
    },
    methods:{
      //桌排序
      tableSort(){
        this.lineUpList.tableList=this.lineUpList.tableList.sort(function(a,b){
          return a.lowerNumber- b.lowerNumber;
        })
        this.calNumRange(this.lineUpList.tableList);
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
             var _div=this.$refs.line;
             //防止重新进入页面时dom继续插入，所以要删除旧的节点
             while(_div.hasChildNodes()){
                 _div.removeChild(_div.firstChild)
             }
            _div.appendChild(div)
          })
      },
      getNumFun(){
        axios.get('/wxQueue/getUserInfo',{
            params:{
                openId:this.$store.getters.getOpenId
            }
        }).then((response)=>{
            if(response.data.phoneNum==''){
              this.$store.dispatch('setUserInfo',{phoneNumber:null});
              this.hasBind=false;
            }
            else{
              this.$store.dispatch('setUserInfo',{phoneNumber:response.data.phoneNum});
              this.hasBind=true;
            }
            this.checkPhoneDialog=true;
        }).catch((error)=>{
            console.warn(error)
        })
      },
      //请求数据
      fetchData(){
          console.log(this.$route)
        if(this.$route.name!='shopDetail'){
            return
        }
//        var url='http://localhost:8081/mock/getShopConfigTable.json';
        var url='/wxQueue/getShopConfigTable'
        axios.get(url,{
            params:{
              linesvrId:this.$route.params.linesvrId,
              shopId:this.$store.getters.getShopId,
            }
        }).then((response)=>{
            console.log(response.data)
            this.loading=false;
            this.lineUpList=response.data.lineUpList;
            this.tableSort();
            if(this.lineUpList.discountInfo.length>0){
              this.newline(this.lineUpList.discountInfo);
            }

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
         //计算人数在哪张桌，得出相应tableId，tableName,waittingTableNum,linesvrState
        _this.loading=true;
        var arr=_this.lineUpList.tableList,len=arr.length,tableId,tableName,waittingTableNum;
        while(len){
            if(num>=arr[len-1].lowerNumber&&num<=arr[len-1].limitNumber){
                tableId=arr[len-1].id;
                tableName=arr[len-1].tabName;
                waittingTableNum=arr[len-1].waittingNum;

                break;
            }
            len--;
        }
        var url='/wxQueue/queueTakeNumber';

          axios.get(url,{
              params:{
                shopBranchId:_this.$route.params.shopBranId,
                peopleNum:num,
                serviceCharge:_this.lineUpList.serviceCharge,
                linesvrId:_this.$route.params.linesvrId,
                userPhone:_this.$store.getters.getUserInfo.phoneNumber,
//                userPhone:'15919156077',
                openId:_this.$store.getters.getOpenId,
                shopId:_this.$store.getters.getShopId,
                shopBranchName:_this.$route.params.shopName,
                tableName:tableName,
                waittingTableNum:waittingTableNum,
//                linesvrState:_this.lineUpList.linesvrStatus,
                linesvrState:0,
                remark:_this.lineUpList.takeNumRemind
              }
          }).then((response)=>{
            _this.loading=false;
            if(response.data.success){
                console.log('创建成功')
                console.log('相关信息:'+response.data.message)
              //需给服务费
//                if(_this.lineUpList.isServiceCharge){
//                  _this.$router.push({
//                    name:'pay',
//                    params:{
//                      shopBranchName:_this.$route.params.shopName,
//                      peopleNum:num,
//                      tableName:tableName,
//                      serviceCharge:_this.lineUpList.serviceCharge
//                    }
//                  })
//                }
//                //不需给服务费，直接取号
//                else{

                  _this.$router.push({
                    name:'getNum',
                    params:{
                      linesvrId:_this.$route.params.linesvrId,
                      shopBranchName:_this.$route.params.shopName,
                      orderId:response.data.attach.orderId
                    }
                  })
//                }
            }
            else{
                //失败，弹出toast窗提示
                console.log('创建失败')
//                _this.content='系统繁忙，请重试';
                 _this.content='服务器错误';
                _this.toasting=true;
                setTimeout(()=>{
                  _this.toasting=false;
                },1500)
            }
          }).catch((err)=>{
            console.warn(err);
          })

      })
      this.fetchData();
    },
//    watch:{
//      '$route':['fetchData']
//    },
    data(){
      return{
        checkPhoneDialog:false,
        hasBind:false,//true为已经绑定手机，否则为false
        numRange:[0,0],
        min:0,//可选人数最小
        max:0,//可选人数最多,
        lineUpList:{},
        loading:true,
        toasting:false,
        content:'系统繁忙，请重试',
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
    @include font-dpr(16px);
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
    @include font-dpr(16px);
  }
  .tables{
    $h:p2r(104px);
    height: $h;
    box-sizing: border-box;
    font-size:0;
    text-align:center;
    border-bottom:1px solid #e1e1e1;
    background-color: #fff;
    display:flex;
    >div{
       display: inline-block;
       width:50%;
       height: $h;
     }
  }
  .tableDetail{
    line-height: initial;
    >div{
       width: 100%;
       height: p2r(52px);
       display: table;
      >span{
        display: table-cell;
      }
     }
  }
  .tableType{
    @include font-dpr(15px);
    color:#181818;
    align-items: stretch;
    >span{
      vertical-align: bottom;
    }
  }
  .tablePer{
    @include font-dpr(11px);
    color:#545454;
    >span{
      vertical-align: top;
      color: #adadad;
    }
  }
  .tableNum{
    line-height: p2r(104px);

    .num{
      @include font-dpr(19px);
      color:#f74848;
      position: relative;
      top:p2r(2px);
      &+span{
          @include font-dpr(14px);
          color:#181818;
          margin-left: .2em;
        }
    }

  }
  .getNum{
    color:#545454;
    margin:0 p2r(48px) p2r(56px);
    header{
    @include font-dpr(15px);
      padding-bottom:p2r(30px);
      box-sizing: border-box;
      border-bottom: 1px #e1e1e1 solid;
      display:flex;
    }
    .line{
      line-height: p2r(45px);
    }
  }

  .couponInfo,.explainInfo{
    @include font-dpr(13px);
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
      position: relative;
      top:p2r(4px);
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
    @include font-dpr(13px);
    margin:0 p2r(48px) p2r(56px);
    padding:p2r(22px) p2r(24px) p2r(24px);
    line-height: p2r(45px);
    color:#adadad;
    background-color:#f5f5f5;
    border-radius: p2r(6px);
    header{
    @include font-dpr(13px);
    }
    li{
    @include font-dpr(13px);
      list-style: initial;
      margin-left: 1em;
    }
  }

</style>
