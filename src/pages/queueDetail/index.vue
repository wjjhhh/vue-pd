<template>
  <div>
    <Queue></Queue>
    <div class="cancelQueue" @click="dialogShow=true">取消排队</div>
    <DDialog v-if="dialogShow">
      <div slot="btns" class="btns">
        <span>确定</span>
        <span @click="dialogShow=false">取消</span>
      </div>
    </DDialog>
  </div>
</template>
<script>
  import Queue from '../../components/Queue.vue'
  import DDialog from '../../components/Dialog.vue'
  export default{
    name:'queueDetail',
    components:{
      Queue,
      DDialog
    },
    methods:{
      fetchData(){

      },

      cancelFun(){
        console.log('取消排队')
      }
    },
    data(){
      return{
        dialogShow:false,
        queueDetailData:[

        ]
      }

    }
  }

</script>
<style type="text/scss" lang="scss" scoped>
  @import '../../assets/css/base.scss';
  .cancelQueue{
    $h:p2r(80px);
    width:p2r(332px);
    height: $h;
    line-height: $h;
    @include font-dpr(14px);
    color:#545454;
    border:1px solid #d0d0d0;
    background-color: #fff;
    margin: p2r(60px) auto;
    text-align: center;
    border-radius: p2r(8px);
  }
</style>

