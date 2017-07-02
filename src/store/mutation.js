/**
 * Created by root on 2017/6/21.
 */
import{
  SAVE_LOCATION,
  SAVE_SERIAL,
  SAVE_OPENID,
  SAVE_SHOPID,
  SAVE_CITYID,
  SAVE_USERINFO,
  SAVE_CITY_LIST,
  SAVE_VAGUESHOPBRANCHNAME,
  SAVE_CITY
} from './type'


const state={
  latitude:'',
  longitude:'',
  openId:'',
  serial:'',
  shopId:'',
  shopBranchList:[],
  cityId:'',
  userInfo:{},//userInfo.phoneNumber
  cityList:[],
  vagueShopBranchName:'',
  city:'',
  shopSerialId:''
}

const getters={
  getLocation(state){
    // if(state.longitude==-1||state.latitude==-1){
    //   return undefined;
    // }
    return{
      latitude:state.latitude,
      longitude:state.longitude
    }
  },
  getOpenId(state){
    return state.openId
  },
  getSerial(state){
    return state.serial
  },
  getShopId(state){
    return state.shopId
  },
  getShopBranchList(state){
    return state.shopBranchList
  },
  getCityId(state){
    return state.cityId
  },
  getUserInfo(){
    return state.userInfo
  },
  getCityList(){
    return state.cityList
  },
  getVagueShopBranchName(){
    return state.vagueShopBranchName
  },
  getCity(){
    return state.city
  }
}

const mutations={
  [SAVE_LOCATION](state, {longitude, latitude}){
    state.latitude=latitude;
    state.longitude=longitude;
  },
  [SAVE_SERIAL](state,serial){
    state.serial=serial;
  },
  [SAVE_SHOPID](state,shopId){
    state.shopId=shopId;
  },
  [SAVE_OPENID](state,openId){
    state.openId=openId;
  },
  [SAVE_CITYID](state,city){
    state.cityId=city;
  },
  [SAVE_USERINFO](state,userInfo){
    state.userInfo=userInfo;
  },
  [SAVE_CITY_LIST](state,cityList){
    state.cityList=cityList
  },
  [SAVE_VAGUESHOPBRANCHNAME](state,vagueShopBranchName){
    state.vagueShopBranchName=vagueShopBranchName
  },
  [SAVE_CITY](state,city){
    state.city=city
  }
}

export default {
  state,
  mutations,
  getters
}
