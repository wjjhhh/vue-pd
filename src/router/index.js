import Vue from 'vue'
import Router from 'vue-router'
//import Hello from '@/components/Hello'


const Index = resolve => require(['@/pages/index/index'], resolve);
const Queue = resolve => require(['@/pages/queue/index'], resolve);
const shopList = resolve => require(['@/pages/shopList/index'], resolve);//商店列表
const QueueDetail = resolve => require(['@/pages/queueDetail/index'], resolve);//券详情
const City = resolve => require(['@/pages/city/index'], resolve);//城市目录
const ShopDetail = resolve => require(['@/pages/shopDetail/index'], resolve);//商店排队详情
const GetNum = resolve => require(['@/pages/getNum/index'], resolve);//取号成功页面
const GetFail = resolve => require(['@/pages/getFail/index'], resolve);//取号失败页面
const Pay = resolve => require(['@/pages/pay/index'], resolve);//支付页面
const PayFail = resolve => require(['@/pages/payFail/index'], resolve);//支付失败

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      // redirect:'shopList',
      children:[
        {
          path:'',
          name:'shopList',
          component:shopList,
        },
        {
          path:'city',
          name:'city',
          component:City
        },
      ]
    },
    {
      path:'/shopDetail/:shopBranId/:linesvrId',
      name:'shopDetail',
      component:ShopDetail
    },
    {
      path:'/shopDetail/:orderId/:shopBranchId/:linesvrId/getNum',
      name:'getNum',
      component:GetNum
    },
    {
      path:'/queue',
      name:'queue',
      component:Queue,
    },
    {
      path:'/queueDetail/:orderId/:linesvrId/:source',
      name:'queueDetail',
      component:QueueDetail
    },
    {
      path:'/getFail/:shopBranId/:linesvrId/:tabName',
      name:'getFail',
      component:GetFail
    },
    {
      path:'/pay',
      name:'pay',
      component:Pay
    },
    {
      path:'/payFail/:shopBranId/:linesvrId',
      name:'payFail',
      component:PayFail
    }
  ]
})

