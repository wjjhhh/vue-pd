<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <keep-alive v-if="afterInit">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import axios from 'axios';
//  import $cookies from './utils/cookies.js';
  import {bus} from './utils/bus.js'

export default {
  name: 'app',
  data(){
      return{
        afterInit:false,
//        shopId: "${shopId}"
      }
  },
  methods:{
    initWX(){
      document.title = "门店列表"
      console.log('微信初始化');

//      var url='http://localhost:8081/mock/enterQueue.json'
//      axios.get(url).then((response)=>{
//        //存储openId
////        $cookies.setCookie('pd_openId',response.data.openId);
//        this.$store.dispatch('setOpenId',response.data.openId);
//        //存储商户id
////        $cookies.setCookie('pd_shopId',response.data.shopId);
//        this.$store.dispatch('setShopId',response.data.shopId);
//        this.afterInit=true;
//      }).catch((error)=>{
//        console.warn(error);
//      })

      var url=window.location.pathname;
      var shopSerialId=url.substring(url.lastIndexOf('/')+1);
       this.$store.dispatch('setSerial',shopSerialId);
      var url2='/wxQueue/getShopAndApi';
      var _shopId,_openId,_jsApi;
      var _this=this;
      axios.get(url2,{
          params:{
            shopSerialId:shopSerialId
          }
      }).then((response)=>{
          _shopId=response.data.shopId;
          _openId=response.data.openId;
          _jsApi=response.data.jsApi;
          this.$store.dispatch('setOpenId',_openId);
          this.$store.dispatch('setShopId',_shopId);
          this.afterInit=true;
          wx.config({
            appId:_jsApi.appId,
            timestamp:_jsApi.timestamp,
            nonceStr:_jsApi.noncestr,
            signature:_jsApi.signature,
            jsApiList:['checkJsApi','openLocation','getLocation','hideAllNonBaseMenuItem'],
            fail:function(){
              console.error('wx config error');
            }
          })
            wx.ready(()=>{
              console.log('ready')
              wx.hideAllNonBaseMenuItem();
            })
            wx.error((res)=>{
              console.error('微信jsdk配置失败: '+res);
            })
      }).catch((error)=>{
          console.warn(error)
      })
    }
  },
  created(){
    this.initWX();

  },
  beforeRouteEnter(to,from,next){
    console.log(to)
  },
  beforeRouteLeave(to,from,next){
//    console.log(to);
//    console.log(from);
//    console.log(next);
  }
}
</script>

<style type="text/scss" lang="scss">
  /*@font-face*/
  /*{*/
    /*font-family: pingfang;*/
    /*src: url('../src/assets/font/PingFang.ttf');*/
  /*}*/
html{
  background-color:#f5f5f5;
}
body{
  margin:0
}
ul{
  margin:0;
  padding:0;
}
li{
  list-style: none;
}
#app {
  font-family:"Microsoft YaHei", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
  color: #2c3e50;
}
</style>
