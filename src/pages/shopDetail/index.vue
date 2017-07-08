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
    <div class="btn-getNum" @click="getNumFun" v-if="isGetQueue">查看我的排号</div>
    <div class="btn-getNum" @click="getNumFun" v-else><span v-if="lineUpList.isServiceCharge" style="margin-right: .4em">￥{{lineUpList.serviceCharge|priceFilter}}</span>取号</div>
    <div class="getNum" v-if="couponName||lineUpList.isShowInfo">
      <header>等位优惠</header>
      <div class="couponInfo" v-if="couponName">
        <span class="logo"></span>
        <div>线上取号成功送【{{couponName}}】优惠券一张<span v-if="couponOverdue">(已过期)</span></div>
      </div>
      <div class="explainInfo" v-if="lineUpList.isShowInfo">
        <span class="logo"></span>
        <div ref="line" class="line"></div>
      </div>
    </div>
    <!--后台不填取号须知和不用支付取号费的情况下不显示-->
    <div class="getNumRule"  v-if="lineUpList.takeNumRemind||lineUpList.isServiceCharge">
      <header>取号须知：</header>
      <ul>
        <li v-if="lineUpList.takeNumRemind">{{lineUpList.takeNumRemind}}</li>
        <li v-if="lineUpList.isServiceCharge">为避免线上随意取号，造成空号码影响排队秩序，商家向您收取线上取号服务费。</li>
        <li v-if="lineUpList.isServiceCharge">如过号或若您行程有变，取号支付服务费用概不退还。</li>
      </ul>
    </div>

      <CheckPhoneDialog v-if="checkPhoneDialog" v-bind:min="min" v-bind:max="max" v-bind:numRange="numRange" v-bind:hasBind="hasBind" v-bind:noTime="noTime"></CheckPhoneDialog>

      <Loading v-show="loading"></Loading>

      <Toast v-show="toasting" v-bind:content="content"></Toast>


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
      priceFilter
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
          //取过号，跳进详情页
         if(this.isGetQueue==true){
           this.$router.push({
             name:'queueDetail',
             params:{
               orderId:this.orderId,
               linesvrId:this.$route.params.linesvrId,
               source:0
             },
           })
           return;
         }

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
      back(){

      },
      //请求数据
      fetchData(){

        if(this.$route.name!='shopDetail'){
            return
        }

        this.loading=true;
//        var url='http://localhost:8081/mock/getShopConfigTable.json';
        var url='/wxQueue/getShopConfigTable'
        axios.get(url,{
            params:{
              linesvrId:this.$route.params.linesvrId,
              shopId:this.$store.getters.getShopId,
              openId:this.$store.getters.getOpenId,
              shopBranchId:this.$route.params.shopBranId
            }
        }).then((response)=>{
//            console.log(response.data)
            this.loading=false;
            this.lineUpList=response.data.lineUpList;
            this.tableSort();
            this.isServiceCharge=response.data.lineUpList.isServiceCharge;
            if(this.lineUpList.discountInfo.length>0){
              this.newline(this.lineUpList.discountInfo);
            }
            this.couponName=response.data.couponName
            this.isGetQueue=response.data.isGetQueue
            this.orderId=response.data.orderId;
            this.shopBranchName=response.data.shopBranchName;
            this.couponOverdue=response.data.couponOverdue;//是否过期
            document.title=response.data.shopBranchName;


        }).catch((err)=>{
            console.warn(err)
          this.content='网络异常';
          this.toasting=true;
          var _this=this;
          setTimeout(()=>{
            _this.toasting=false;
            _this.$router.push({
              name:'shopList'
            })
          },1500)
        })
      }
    },
    created(){
      var _this=this;
      this.fetchData();
      bus.$on('closeCheckPhone',function(){
          console.log('关闭CheckPhone')
        _this.checkPhoneDialog=false;
      })
      bus.$on('hasBindFun',function(){
          console.log('关闭验证')
        _this.hasBind=true;
      })
      //取号，生成订单
      bus.$on('chooseEatNum',function(num){
         //计算人数在哪张桌，得出相应tableId，tableName,waittingTableNum,linesvrState
        _this.loading=true;
        var arr=_this.lineUpList.tableList,len=arr.length,tableId,tableName,waittingTableNum;

//        while(len){
//            //默认最多人数的桌型上限是0,设回20
////            arr[len-1].limitNumber=20
//            if(num>=arr[len-1].lowerNumber&&num<=arr[len-1].limitNumber){
//                tableId=arr[len-1].id;
//                tableName=arr[len-1].tabName;
//                waittingTableNum=arr[len-1].waittingNum;
//                break;
//            }
//            len--;
//        }

        while(len){
            if(num>=arr[len-1].lowerNumber){
              tableId=arr[len-1].id;
              tableName=arr[len-1].tabName
              waittingTableNum=arr[len-1].waittingNum;
              break;

            }
            if(num>=arr[len-1].lowerNumber&&arr[len-1].limitNumber){
              tableId=arr[len-1].id;
              tableName=arr[len-1].tabName
              waittingTableNum=arr[len-1].waittingNum;
              break;
            }
            len--;
        }

        //不需支付排队服务费
        if(_this.isServiceCharge==0){

          var url='/wxQueue/queueTakeNumber';
          axios.get(url,{
            params:{
              shopBranchId:_this.$route.params.shopBranId,
              peopleNum:num,
              serviceCharge:_this.lineUpList.serviceCharge,
              linesvrId:_this.$route.params.linesvrId,
              userPhone:_this.$store.getters.getUserInfo.phoneNumber,
              openId:_this.$store.getters.getOpenId,
              shopId:_this.$store.getters.getShopId,
              shopBranchName:_this.shopBranchName,
              tableName:tableName,
              waittingTableNum:waittingTableNum,
//                linesvrState:_this.lineUpList.linesvrStatus,
              linesvrState:0,
              remark:_this.lineUpList.takeNumRemind,
              tableId:tableId,

            }
          }).then((response)=>{

            _this.loading=false;
            if(response.data.attach==-200){
              _this.content='你所排的桌型已达取号上限';
              _this.toasting=true;
              setTimeout(()=>{
                _this.toasting=false;
              },1500)
              return;
            }
            //取号已达上限
            if(response.data.attach==4002){
              _this.checkPhoneDialog=true;
              _this.noTime=true;
              return;
            }
            if(response.data.success){
              console.log('创建成功')
              console.log('相关信息:'+response.data.message)

              _this.$router.push({
                name: 'getNum',
                params:{
                  orderId:response.data.attach.orderId,
                  shopBranchId:_this.$route.params.shopBranId,
                  linesvrId:_this.$route.params.linesvrId
                }
              })
            }
            else{
              //失败，弹出toast窗提示
              console.log('创建失败')
//                _this.content='系统繁忙，请重试';
              _this.content=response.data.message;
              _this.toasting=true;
              setTimeout(()=>{
                _this.toasting=false;
              },1500)
            }

          }).catch((err)=>{
            console.warn(err);
          })
        }
        //需支付排队服务费
        else{
          var url='/wxQueue/createOrder';
          axios.get(url,{
              params:{
                shopId:_this.$store.getters.getShopId,
//                shopBranchName:_this.$route.params.shopName,
                shopBranchId:_this.$route.params.shopBranId,
                openId:_this.$store.getters.getOpenId,
//                totalFee:_this.lineUpList.serviceCharge,
                totalFee:_this.lineUpList.serviceCharge,
                tableName:tableName,
                waittingTableNum:waittingTableNum,
                linesvrState:_this.lineUpList.linesvrStatus,
                remark:_this.lineUpList.takeNumRemind,
                peopleNum:num,
                linesvrId:_this.$route.params.linesvrId,
                userPhone:_this.$store.getters.getUserInfo.phoneNumber,
                tableId:tableId
              }
          }).then((response)=>{
            if(response.data.code==-200){
              _this.content='你所排的桌型已达取号上限';
              _this.toasting=true;
              setTimeout(()=>{
                _this.toasting=false;
              },1500)
              return;
            }
             if(response.data.code==4002){
               _this.checkPhoneDialog=true;
               _this.noTime=true;
             }
             else if(response.data.code==1){
                  window.location.href=response.data.message
             }
             else{
               _this.content=response.data.message;
               _this.toasting=true;
               setTimeout(()=>{
                 _this.toasting=false;
               },1500)
             }
          }).catch((error)=>{
              console.warn(error)
          })

        }
      })
    },
    watch:{
      '$route'(to,from){
          this.fetchData();
      }
    },
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
        isServiceCharge:'',
        couponName:'',//优惠券名称
        isGetQueue:false,//判断用户是否已经在这家门店取过号，且未过号未就餐（true=已取号，false=未取号）,
        orderId:'',
        shopBranchName:'',
        noTime:false,//true为达到取号上限,
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
    @include font-dpr(12px);
    color:#545454;
    >span{
      vertical-align: top;
      color: #adadad;
    }
  }
  .tableNum{
    line-height: p2r(104px);

    .num{
      @include font-dpr(21px);
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
      line-height: p2r(34px);
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
      top:-2px;
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
    margin:p2r(15px) 0 p2r(14px);
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

  /* 定义动画 */
  .fade-enter-active,.fade-leave-active {
    transition: all .1s ease;
  }

  /*
  * 定义过渡
  */
  .fade-enter-active{
    transform: translateY(0);
  }
  .fade-leave-active{
    transform: translateY(100%);
  }
  /* 重要：定义初始状态 */
  .fade-enter{
    transform: translateY(100%);
  }
</style>
