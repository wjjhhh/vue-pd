

//export const price=(val,n)=>{
//  parseFloat(val).toFixed(n)
//}
const price=function(val,n=0){
  return parseFloat(val).toFixed(n);
}
const division=function(val,n=100){
  return val/100
}
export default division;

