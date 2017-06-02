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
export default {
  name: 'app',
  methods:{
    initWX(){
      console.log('微信初始化')
      var router = this.$router.resolve(window.location.hash.replace("#", ""));
      axios.get('/kq/kqdetail/jsapi/config/'+router.route.params.shopList).then((ret)=>{
        if(ret.success){

        }
      })
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
    wx.error((res)=>{
        console.error('微信jsdk配置失败: '+res);
    })
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
