/**
 * Created by root on 2017/7/7.
 */
/**
 * Created by Janus on 2017/4/7.
 *
 * 简单的缓存模块, 会添加前缀，与 本地储存隔离
 * 默认超时为 60秒
 */

const PREFIX = "PD_"; // 前缀

function isInteger(obj) {
  return typeof obj === 'number' && obj % 1 === 0
}

function set(key, data, timeout) {
  var now = Math.round(new Date().getTime() / 1000);
  if (!timeout) {
    timeout = 60;
  } else if (!isInteger(timeout)) {
    throw "timeout必须为整数";
  }
  var jsonData = { "data": data, "timeout": now + timeout};
  try{
    localStorage.setItem(PREFIX + key, JSON.stringify(jsonData));
  }catch (e){
    if(e.name === 'QuotaExceededError'){
      console.log('已经超出本地存储限定大小！');
      localStorage.clear();
      localStorage.setItem(PREFIX + key, JSON.stringify(jsonData));
    }
  }
}

function del(key) {
  localStorage.removeItem(PREFIX + key)
}

function get(key, default_value) {
  var value = localStorage.getItem(PREFIX + key);
  console.log('value'+value)
  if (!value) return default_value;
  try{
    value = JSON.parse(value);
  }catch(e) {
    console.error("load cache error, return default value");
    return default_value;
  }

  if (!value.timeout || !value.data) {
    return default_value;
  }
  var now = Math.round(new Date().getTime() / 1000);
  if (value.timeout < now)  {
    del(key);
    return default_value
  };

  return value.data
}

function ttl(key) {
  var value = localStorage.getItem(PREFIX + key);
  if (!value) return 0;
  try{
    value = JSON.parse(value);
  }catch(e) {
    console.error("load cache error, return default value");
    return 0;
  }
  if (!value.timeout || !value.data) return 0;
  var now = Math.round(new Date().getTime() / 1000);
  if (value.timeout < now) {
    del(key);
    return 0
  }
  return value.timeout - now;
}

export default {
  get: get,
  del: del,
  set: set,
  ttl: ttl
};
