<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <Search class="search" ref="search" v-bind:isShow="isShow" :positioning="positioning" :position="position"></Search>
    <loading v-show="isLoading"></loading>
    <keep-alive>
      <router-view  class='router' :style="{height:containerHeight}" style="overflow: scroll;" :hasLocation="hasLocation">
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

  export default{
    data(){
      return{
        isShow:true,//搜索是否显示
        containerHeight:'1200px',
        isLoading:true,//true:loading中
        positioning:true,//true:定位中
        position:'选择城市',//定位位置
        hasLocation:false,//true为已成功定位,
      }
    },
    components:{
      Search,
      ShopList,
      loading
    },
    methods:{
      //定位
      location(){
//        var r=Math.random();
         var r=1;
        this.positioning=false
        if(r>0.5){
          console.log('定位成功');
          this.hasLocation=true;
          this.position='xx市'
        }
        else{
          console.log('定位失败');
          this.hasLocation=false;
        }
      },
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
      //微信api定位
      getLocation(){

      }
    },
    created(){
      if ($utils.isWeixinBrowser()) {
        wx.getLocation({
          type: 'gcj02',// 火星坐标
          success: (res) => {
//            this.$store.dispatch("setUserPoint", res);
//            this.getAttr(res.latitude, res.longitude);
          },
          complete: () => {

          }
        });
      } else { console.error("请在微信客户端中打开");}
    },
    mounted(){
        this.listContainerHeight();
      window.addEventListener("resize", this.listContainerHeight);
//      this.isLoading=false
      setTimeout(()=>{
          this.isLoading=false;
          this.location();
      },1000)
    },
    beforeRouteEnter (to, from, next) {
      console.log('钩子beforeRouteEnter')
      next(vm => {
        document.title = ""
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
      }
      else{
          this.isShow=true;
          this.position=to.params.city||'选择城市'
      }
      next();
    },
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  @import "../../assets/css/base.scss";
  @import "../../assets/css/_theme.scss";
  .search{
    $h:100px;
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
    margin-top: p2r(100px);
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
