

//export const price=(val,n)=>{
//  parseFloat(val).toFixed(n)
//}
const price=function(val,n=0){
  return parseFloat(val).toFixed(n);
}
export default price;
