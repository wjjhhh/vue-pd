/**
 * Created by root on 2017/6/1.
 */
var util = {};
util.isWeixinBrowser = function() {
  const ua = navigator.userAgent.toLowerCase();
  return (/micromessenger/.test(ua));
};
export default util;
