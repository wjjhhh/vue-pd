<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>

    <Search class="search" ref="search" v-bind:isShow="isShow" :positioning="positioning" :position="position" ></Search>
    <loading v-show="isLoading"></loading>

    <keep-alive v-if="afterInit" :hasLoc='hasLoc'>
      <router-view  class='router' :style="{height:containerHeight}" style="overflow: scroll;">
      </router-view>
    </keep-alive>

    <!--<div class="btn-my-odder" @click="myNum" ref="myOdder" v-if="isShow">我的排单号</div>-->
  </div>
</template>

<script>
  import Search from '../../components/search'
  import ShopList from '../shopList/index'
  import loading from '../../components/Loading'
  import $utils from '../../utils/index.js'
  import axios from 'axios'
  import {bus} from '../../utils/bus.js'
  export default{
    data(){
      return{
        isShow:true,//搜索是否显示
        containerHeight:'1200px',
        isLoading:true,//true:loading中
        positioning:true,//true:定位中
        position:this.$store.getters.getCity,//定位位置
        afterInit:false,//确保地理初始化才开始,
        hasLoc:false,//true为已成功定位
      }
    },
    components:{
      Search,
      ShopList,
      loading
    },
    methods:{
      myNum(){
        console.log('进入我的排单号')
        this.$router.push({
          'name':'queue',
          params:{

          }
        })
      },
      //高度调整
      listContainerHeight(){
            console.log('高度是:',window.innerHeight)
            this.$nextTick(function(){
              this.containerHeight=window.innerHeight-this.$refs.search.$el.offsetHeight+'px';
            })
      },
      //经纬度转城市
      getAttr(latlon,that){

        var _this=this;
        const params = {
          output: "jsonp",
          key: "GACBZ-FV5RI-WKJGG-5TVJZ-44SSE-IEFTO",
          location: latlon,
          coord_type: 5 //[默认]腾讯、google、高德坐标
        };
        const url = "http://apis.map.qq.com/ws/geocoder/v1/";
        this.isLoading=true;
        this.$http.jsonp(url,{params:params},{jsonp:'QQMap'},{

        }).then((ret)=>{
//            console.log(ret.body.result.ad_info.city)
          this.position=ret.body.result.ad_info.city||'未知地区'
          this.$store.dispatch('setCity',ret.body.result.ad_info.city);
          this.positioning=false;
          this.hasLoc=true;
          this.afterInit=true;
          this.isLoading=false;
//          that.$store.dispatch("setUserAddress",{address:ret.body.result.address});
        }).catch((error)=>{
            alert('定位失败')
          this.positioning=false;
          this.position='选择城市'
          this.afterInit=true;
          this.isLoading=false;
        })

      },
      //微信api定位，腾讯地图返回城市名
      getLocation(){
        var _this=this;
        wx.getLocation({
          type:'wgs84',
          success:function(res){
            console.log('地理回调成功')
            _this.$store.dispatch('setUserPoint', {latitude:res.latitude, longitude:res.longitude});
            var _location=this,_location=_this.$store.getters.getLocation.latitude+','+_this.$store.getters.getLocation.longitude;
            _this.getAttr(_location);
          },
          fail:function(){
            alert('获取地理位置失败')
//            _this.positioning=false;
//            _this.position='选择城市'
//            _this.afterInit=true;

             _this.getAttr('')
          },
          //用户取消获取权限
          cancel:function(){
//            alert('无法获取位置信息')
//            _this.positioning=false;
//            _this.position='选择城市'
//            _this.afterInit=true;
            _this.getAttr('')
          }
        })

      },
    },

    created(){
        var _this=this;
          if ($utils.isWeixinBrowser()) {
//         _this.$store.dispatch('setUserPoint', {latitude:23.129163, longitude:113.264435});
//            var _location=_this.$store.getters.getLocation.latitude+','+_this.$store.getters.getLocation.longitude;
//            this.getAttr(_location)

            wx.ready(() => {
              console.log('ready')
              this.getLocation();
//              this.stopShare();
                wx.hideAllNonBaseMenuItem();
            });
          }
          else { console.error("请在微信客户端中打开");}
    },

    mounted(){
        this.listContainerHeight();
        window.addEventListener("resize", this.listContainerHeight);
//        this.isLoading=false;
//          this.location();
    },
    beforeRouteEnter (to, from, next) {
      console.log('钩子beforeRouteEnter')
      if(to.name=='shopList'){
          document.title='门店列表'
      }
      next(vm => {

      //进入城市列表，搜索框需隐藏
        if(to.name=='city'){
          vm.isShow=false;
        }
        else{

        }
    })
    },
    beforeRouteUpdate (to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
      console.log('钩子beforeRouteUpdate')

      //进入城市列表，搜索框和我的排单号需隐藏
      if(to.name=='city'){
          this.isShow=false;
          document.title='城市列表'
      }
      else if(to.name=='shopList'){
        this.isShow=true;
        this.position=this.$store.getters.getCity||to.params.city||'选择城市';
        document.title='门店列表'
      }
      next();
    },
    beforeRouteLeave(to,from,next){
      console.log('钩子beforeRouteLeave')
      if(to.name=='queue'){
          document.title='我的排单号'
      }
      else if(to.name=='shopDetail'){
          document.title='商店详情'
      }
      next()
    }

  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  @import "../../assets/css/base.scss";
  @import "../../assets/css/_theme.scss";
  .search{
    $h:88px;
    width:100%;
    height: p2r($h);
    line-height: p2r($h);
    position: fixed;
    top:0;
    left:0;
    box-sizing: border-box;
    padding:0 p2r(24px);
    z-index: 2;

  }
  .router{
    margin-top: p2r(88px);
  }
  .shoplists{
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .btn-my-odder{
  @include font-dpr(15px);
    $h:p2r(100px);
    width:100%;
    height: $h;
    line-height: $h;
    color:#fff;
    background-color: $color;
    text-align: center;
    position: fixed;
    z-index:2;
    bottom:0;
    left:0;
  }
</style>
