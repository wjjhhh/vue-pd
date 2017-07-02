/**
 * Created by root on 2017/7/2.
 */

  var changeTitle = function(title) {
    document.title = title;
    var i = document.createElement('iframe');
    i.src = '//m.baidu.com/favicon.ico';
    i.style.display = 'none';
    i.onload = function() {
      setTimeout(function(){
        i.remove();
      }, 9)
    }
    document.body.appendChild(i);
  }

export default {
  changeTitle
}

