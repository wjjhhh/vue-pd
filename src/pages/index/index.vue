<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <Search class="search" ref="search" v-bind:isShow="isShow" :positioning="positioning" :position="position"></Search>
    <loading v-show="isLoading"></loading>
    <keep-alive>
      <router-view  :style="{height:containerHeight}" style="overflow: scroll;" :hasLocation="hasLocation">
        <!--<ShopList class="shoplists" :style="{height:shopListHeight}">-->
        <!--</ShopList>-->
      </router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Search from '../../components/search'
  import ShopList from '../shopList/index'
  import loading from '../../components/Loading'

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
      shopContainerHeight(){
        this.containerHeight=window.innerHeight-this.$refs.search.$el.offsetHeight+'px'
      },
      //定位
      location(){
        var r=Math.random();
        this.positioning=false
        if(r>0.5){
          console.log('定位成功');
          this.hasLocation=true;
          this.position='广州市'
        }
        else{
          console.log('定位失败');
          this.hasLocation=false;
        }
      },

    },
    mounted(){
      this.shopContainerHeight();
      this.isLoading=false
      setTimeout(()=>this.location(),1000)
    },
    beforeRouteEnter (to, from, next) {
      console.log('钩子beforeRouteEnter')
      next(vm => {
        document.title = ""
        if(to.name=='city'){
          vm.isShow=false;
        }
    })
    },
    beforeRouteUpdate (to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
      console.log('钩子beforeRouteUpdate')
      //进入城市列表，搜索框需隐藏
      if(to.name=='city'){
          this.isShow=false;
      }
      else{
          this.isShow=true;
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
    position: relative;
    top:0;
    left:0;
    box-sizing: border-box;
    padding:0 p2r(24px);
    z-index: 2;

  }
  .shoplists{
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

</style>
