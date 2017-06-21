/**
 * Created by root on 2017/6/1.
 */
import * as types from './type'

export default {
  //设置经纬度
  setUserPoint:({commit},{longitude,latitude})=>{
    commit(types.SAVE_LOCATION,{longitude,latitude});
  },
  //保存openId
  setOpenId:({commit},openId)=>{
    commit(types.SAVE_OPENID,openId);
  },
  //保存商户id
  setShopId:({commit},shopId)=>{
    commit(types.SAVE_SHOPID,shopId);
  },
  //保存商戶序列号
  setSerial:({commit},serial)=>{
    commit(types.SAVE_SERIAL,serial);
  },
  //保存门店ID列表
  setAttch:({commit},attch)=>{
    commit(types.SAVE_ATTCH,attch);
  },
  //保存用户城市
  setCity:({commit},city)=>{
    commit(types.SAVE_CITY,city)
  }
}
