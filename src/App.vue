<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import axios from 'axios';
  import $cookies from './utils/cookies.js';
export default {
  name: 'app',
  methods:{
    initWX(){
      console.log('微信初始化');
      var router = this.$router.resolve(window.location.hash.replace("#", ""));
//      var url='/wxQueue/enterQueue';
      var url='http://localhost:8081/mock/enterQueue.json'
      axios.get(url).then((response)=>{
        //存储openId
        $cookies.setCookie('pd_openId',response.data.openId);
        //存储商户id
        $cookies.setCookie('pd_shopId',response.data.shopId);
      }).catch((error)=>{
          console.warn(error);
      })
//      axios.get('/kq/kqdetail/jsapi/config/'+router.route.params.openId).then((ret)=>{
//        if(ret.success){

            wx.config({
              appId:'wx527f04fa2acc88fc',
              timestamp:1497839411,
              nonceStr:'GRVMCQMBJDHY',
              signature:'1fa56b7ac301810a201bf487920f82811aeefd71',
              jaApiList:['checkJsApi','getLocation', 'openLocation',],
              fail:function(){
                  console.error('wx config error');
              }
            })
//        }
//      }).catch((error)=>{
//          console.warn(error);
//      })
//      console.log('/kq/kqdetail/jsapi/config/' + router.route.params.shopSerial)
//      axios.get('/kq/kqdetail/jsapi/config/' + router.route.params.shopSerial , {}).then((ret) => {
//        console.log('/kq/kqdetail/jsapi/config/' + router.route.params.shopSerial)
//      var data = ret.body;
//      if (data.success) {
//        wx.config({
//          appId: data.attach.appId,
//          timestamp: data.attach.timestamp,
//          nonceStr: data.attach.noncestr,
//          signature: data.attach.signature,
//          jsApiList: ['addCard'],
//          fail: function () {
//            console.error("wx config error")
//          }
//        });
//      }
//    },() => {
//        console.error("post error")
//      });
    }
  },
  created(){
    this.initWX();
    wx.ready(function () {
        console.log('调用成功')
        wx.getLocation({
          type:'wgs84',
          success:function(res){
              console.log(res)
          },
          cancel:function(){
              console.log()
          }
        })
    })
//    wx.error((res)=>{
//        console.error('微信jsdk配置失败: '+res);
//    })
  },

  beforeRouteLeave(to,from,next){
    console.log(to);
    console.log(from);
    console.log(next);
  }
}
</script>

<style type="text/scss" lang="scss">
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
  color: #2c3e50;
}
</style>
