<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <Search class="search" ref="search"></Search>
    <keep-alive>
      <router-view  :style="{height:containerHeight}" style="overflow: scroll;">
        <!--<ShopList class="shoplists" :style="{height:shopListHeight}">-->
        <!--</ShopList>-->
      </router-view>
    </keep-alive>
  </div>
</template>

<script>
  import search from '../../components/search'
  import ShopList from '../shopList/index.vue'
  import city from '../city/index.vue'
  export default{
    data(){
      return{

      }
    },
    components:{
      'Search':search,
      ShopList
    },
    methods:{

      shopContainerHeight(){
        this.containerHeight=window.innerHeight-this.$refs.search.$el.offsetHeight+'px'

      }
    },
    mounted(){
      this.shopContainerHeight();

    },
    data(){
      return{
        containerHeight:'1200px',
      }
    }
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
