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

  //保存用户城市
  setCity:({commit},city)=>{
    commit(types.SAVE_CITY,city)
  },
  //保存用户信息
  setUserInfo:({commit},userInfo)=>{
    commit(types.SAVE_USERINFO,userInfo)
  },
  //保存拥有门店的id列表
  setCityList:({commit},cityList)=>{
    commit(types.SAVE_CITY_LIST,cityList)
  },
  //保存模糊搜索门店名
  setVagueShopBranchName:({commit},vagueShopBranchName)=>{
    commit(types.SAVE_VAGUESHOPBRANCHNAME,vagueShopBranchName)
  }
}
