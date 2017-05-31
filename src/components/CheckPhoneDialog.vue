<template>
  <div class="dialogContainer">
    <!--手机验证弹窗-->
    <div class="dialog" v-if="!check">
      <header>验证手机</header>
      <span class="btn-close" @click="close"></span>
        <input placeholder="请输入您的手机号码" v-model="phone"/>
        <div class="codeContainer">
          <input placeholder="请输入验证码" v-model="code"/>
          <span class="btn-sendCode" @click="sendCode" v-if="time==second">发送验证码</span>
          <span class="count" v-else>{{time}}S后重发</span>
        </div>
        <div class="errorTips">{{error}}</div>
        <div class="btn-bind" @click="bindFun">绑定</div>
    </div>
    <!--选择就餐人数-->
      <div class="eatNumContainer" v-if="check&&!noTime">
        <header>选择就餐人数</header>
        <ul class="eatNums">
          <li v-for="item in numRange" class="eatNum"  ref="eatNum" @click="chooseEatNum(item)">{{item}}</li>
        </ul>
        <footer @click="cancelEat">取消</footer>
      </div>
    <!--无法取号弹窗-->
      <div class="noTimeDialog" v-if="check&&noTime&&noTimeShow">
        <header>无法取号</header>
        <div class="canTip">您已达今日取号次数上限</div>
        <span class="btn-sure" @click="closeNoTime">确定</span>
      </div>
  </div>
</template>
<script>
  import {bus} from '../utils/bus.js'
  export default{
    mounted(){
      //阻止手滑滚动
//      this.$el.addEventListener('touchmove',function(e){
//        e.preventDefault();
//      });
    },
    props:{
      'numRange':''
    },
    methods:{
      //关闭验证码弹窗
      close(){
        bus.$emit('closeCheckPhone')
      },
      //倒计时
      timer(){
        if(this.time>0){
          this.time--+'S后重发'
          setTimeout(this.timer,1000);
        }
        else this.time=this.second;
      },
      //发送验证码
      sendCode(){
        if(!this.checkPhone(this.phone)){
          this.error='请正确填写手机号'
          return
        }
        this.error=''
        this.time=this.second;
        this.timer();
      },
      //检验手机号码合法性
      checkPhone(phone){
        return (/^1[34578]\d{9}$/.test(phone))
      },
      //取消就餐人数
      cancelEat(){
        this.close();
      },
      //选择就就参人数
      chooseEatNum(num){
        console.log(num+'人就餐')
        this.cancelEat();
      },
      //绑定
      bindFun(){
        this.check=true;
        this.noTimeShow=true;
        //this.close();
      },
      //关闭无法取号弹窗
      closeNoTime(){
        this.noTimeShow=false;
        this.close();
      }
    },
    data(){
      return{
        phone:'',//验证码框手机
        code:'',//验证码框验证码
        time:60,//倒数实时默认60s
        second:60,//倒数的时间(s)
        error:'验证码错误',//验证码框错误提示
        check:false,//true为已验证，否则为false
        eatnum:[1,2,3,4],//就餐选择人数选项[1,2,3,4],
        noTime:true,//true为达到取号上限,
        noTimeShow:false,//无法取号弹窗
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  @import '../assets/css/base.scss';
    @mixin placeholder(){
      color:#adadad;
    @include font-dpr(13px);
    }
    ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    @include placeholder()
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    @include placeholder()
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
    @include placeholder()
    }
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
    @include placeholder()
    }
  .dialogContainer{
    width:100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    position: fixed;
    left:0;
    top:0;
    z-index: 10;
  }
  .dialog{
    width:p2r(592px);
    height: p2r(480px);
    border-radius: p2r(6px);
    background-color: #fff;
    position: absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
    z-index: 11;
    header{
      @include font-dpr(14px);
      text-align: center;
      color:#545454;
      margin:p2r(36px) auto;
    }
    input{
      @include font-dpr(13px);
      width:p2r(540px);
      height: p2r(84px);
      box-sizing: border-box;
      border-radius: p2r(6px);
      border:1px solid #e1e1e1;
      background-color: #f5f5f5;
      color:#181818;
      line-height: p2r(28px);
      display: block;
      margin:0 auto;
      outline: none;
      padding:0 p2r(24px);
      margin-bottom: p2r(30px);
    }
    .btn-bind{
      $h:p2r(84px);
      width:p2r(540px);
      height: $h;
      line-height: $h;
      border-radius: p2r(6px);
      color:#fff;
      @include font-dpr(15px);
      background-color:#F74749;
      text-align: center;
      margin:0 auto;
    }
  }
  .btn-close{
    $size:p2r(32px);
    width:$size;
    height:$size;
    @include bg-image('../assets/img/btn-close');
    position: absolute;
    right:p2r(24px);
    top:p2r(28px);
  }
  .codeContainer{
    position: relative;
    input{
      margin-bottom:0;
    }
  }
  .btn-sendCode,.count{
    @include font-dpr(13px);
    height: 100%;
    line-height: p2r(84px);
    color:#f74848;
    position: absolute;
    top:0;
    right: p2r(50px);
  }
  .btn-sendCode{
    color:#f74848;
  }
  .count{
    color:#d0d0d0;
  }
  .errorTips{
   @include font-dpr(11px);
    width:p2r(540px);
    height: p2r(30px);
    padding:0 p2r(24px);
    margin:p2r(20px) auto;
    box-sizing: border-box;
    color:#f74848;
  }
  .eatNumContainer{
    width:100%;
    text-align: center;
    background-color: #fff;
    position: fixed;
    bottom:0;
    left:0;
    /*transform: translateY(100%);*/
    header,footer{
      $h:p2r(100px);
      height: $h;
      line-height: $h;
    }
    header{
      @include font-dpr(14px);
      color:#7d7d7d;
    }
    footer{
      @include font-dpr(15px);
      color:#181818;
    }
  }
  .eatNums{
    border-top:p2r(12px) solid #f1f1f1;
    border-bottom:p2r(12px) solid #f1f1f1;
    overflow: auto;
    max-height: p2r(100px *4);
  }
  .eatNum{
    @include font-dpr(15px);
    $h:p2r(100px);
    height:$h;
    line-height: $h;
    color:#7d7d7d;
    border-bottom: 2px solid #f5f5f5;
    box-sizing: border-box;
  }
  .noTimeDialog{
    width:p2r(592px);
    height:p2r(388px);
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
    background-color:#fff;
    header{
      height:p2r(96px);
      line-height: p2r(30px);
      @include font-dpr(15px);
      color:#181818;
      box-sizing: border-box;
      padding:p2r(34px) 0 0 p2r(40px);
      border-bottom: 1px solid #e1e1e1;
    }
    .canTip{
      width:p2r(480px);
      @include font-dpr(14px);
      color:#545454;
      line-height: p2r(48px);
      margin: p2r(72px) auto 0;
    }
    .btn-sure{
      $h:p2r(102px);
      width:100%;
      height:$h;
      line-height: $h;
      text-align: center;
      @include font-dpr(14px);
      color:#545454;
      position: absolute;
      bottom:0;
      border-top:1px solid #e1e1e1;
      box-sizing: border-box;

    }
  }
</style>
