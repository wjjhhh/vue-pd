<template>
  <div ref="scroll">
    <!--侧边索引-->
    <nav class="catalogsContainer">
      <ul class="catalogs">
        <li class="catalog" v-for="item in letter" @click="goIndex(item)">{{item}}</li>
      </ul>
    </nav>
    <!--城市列表-->
    <div class="citys">
      <ul v-for="item in citys">
        <li class="city-index" :id='"item"+item.index'>{{item.index}}</li>
        <li v-for="i in item.data" class="city-list" @click="chooseCity(i.name,i.city_id,i.father_id)">{{i.name}}</li>
      </ul>
    </div>
    <Loading v-show="isLoading"></Loading>
  </div>
</template>
<script>
  import axios from 'axios';
  import Loading from '../../components/Loading';
  import {bus} from '../../utils/bus.js';
  import $cache from '../../utils/cache.js'
  export default{
    components:{
      Loading,
    },
    data(){
      return{
        isLoading:true,//loading状态
        citys:[],
        letter:[],//侧边索引栏
//        letter:["A","B","C","D","E","F","G","H","I","J","k","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
      }
    },

    mounted(){
      this.fetchData();
    },

    filters:{
      upper(v){
        return v[0]
      }
    },
    methods:{
      fetchData(){
//        let url='http://localhost:8081/mock/city.json';
        let url='/wxQueue/getCityList';
        var _this=this,_city=[];
        axios.get(url,{
            params:{
              cityIdList:this.$store.getters.getCityList||$cache.get('cityList')
            }
        }).then((response)=>{
          _city=response.data.cityList;
          _this.dealCity(_city,'firstLetter');
          _this.isLoading=false;
        }).catch((error)=>{
            console.warn(error)
        })
      },
//数组，分类字段（如firstLetter首字母）
      dealCity(arr,index){
        var map={},dest=[],_letter=[];
        for(var i= 0,len=arr.length;i<len;++i){
          var ai=arr[i];
          var letter=ai[index][0].toUpperCase();
          if(!map[letter]){
            dest.push({
              index:letter,
              data:[ai]
            })
            map[letter]=true;
            _letter.push(letter);
          }
          else{
            for(var j= 0,len2=dest.length;j<len2;++j){
              var dj=dest[j];
              var letter=ai[index][0].toUpperCase();
              if(dj.index==letter){
                dj.data.push(ai);
                break;
              }
            }
          }
        }
        //根据字母顺序排序
        var _dest=dest.sort(function(a,b){
          return a['index'].charCodeAt()- b['index'].charCodeAt()
        })
        this.citys=_dest;
        this.letter=_dest.map(function(item){
          return item.index;
        })
      },
      //点击相应城市
      chooseCity(name,city_id,fatherId){
        this.$store.dispatch('setCityId',city_id);
        this.$store.dispatch('setVagueShopBranchName','')
        this.$store.dispatch('setCity',name);
        this.$store.dispatch('setFatherId',fatherId)
        this.$router.push({
          name:'shopList',
          params:{
            city:name
          },
        })
      },
      //点击索引跳到相应字母位置
      goIndex(index){
        this.$refs.scroll.scrollTop=document.getElementById('item'+index).offsetTop-this.$refs.scroll.offsetTop
      }
    },

  }
</script>
<style type="text/scss" lang="scss" scoped>
  @import "../../assets/css/base";
  ul{
    padding:0;
    margin: 0;
  }

  .catalogsContainer{
    width:p2r(28px);
    height: 100%;
    position: fixed;
    z-index:3;
    right:0;
    top:0;
    background-color: #fff;
    /*pointer-events: none;*/
  }
  .catalogs{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    .catalog{
      @include font-dpr(12px);
      color:#545454;
      line-height: p2r(30px);
      list-style: none;
      text-align: center;
    }
  }
  .citys{
    background-color: #fff;
    li{
      &:last-child{
        border-bottom: 0;
      }
    }
  }
  .city-index{
    $h:p2r(50px);
    height: $h;
    line-height: $h;
    background-color: #f4f4f4;
    @include font-dpr(14px);
    color:#adadad;
    padding-left: p2r(24px);
  }
  .city-list{
    $h:p2r(90px);
    height: $h;
    line-height: $h;
    border-bottom:1px solid #d0d0d0;
    background-color: #fff;
    margin-left: p2r(24px);
    @include font-dpr(15px);
  }
</style>
