/**
 * Created by root on 2017/6/21.
 */
import{
  SAVE_LOCATION,
  SAVE_SERIAL,
  SAVE_OPENID,
  SAVE_SHOPID,
  SAVE_ATTCH,
  SAVE_CITY
} from './type'


const state={
  latitude: -1,
  longitude: -1,
  openId:'',
  serial:'',
  shopId:'',
  attch:[],
  shopBranchList:[],
  cityId:''
}

const getters={
  getLocation(state){
    if(state.longitude==-1||state.latitude==-1){
      return undefined;
    }
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
  getAttch(state){
    return state.attch
  },
  getCity(state){
    return state.cityId
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
  [SAVE_ATTCH](state,attch){
    state.attch=attch;
  },
  [SAVE_CITY](state,city){
    state.cityId=city;
  }
}

export default {
  state,
  mutations,
  getters
}
