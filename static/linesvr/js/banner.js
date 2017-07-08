	/**
	 * 公共微信关注引导
	 * changed by outside 2016/06/24
	 * outside todo
	 * get initial-scale
	 */

	/**
	 * [getInitialScale description]
	 * @return {[type]} [description]
	 */
	function getInitialScale() {

		var metaEl = document.querySelector('meta[name="viewport"]'),
            metaCtt = metaEl ? metaEl.content : '',
            matchScale = metaCtt.match(/initial\-scale=([\d\.]+)/);

        return matchScale[1];
	};

	/* 顶部关注公众号引导栏 */
	/**
	 * [followModule description]
	 * @param  {[type]} params [description]
	 * @return {[type]}        [description]
	 */
	function followModule(params ) {
	   //清空旧的$('.followTipsBg')
      $('.followTipsBg').remove();

	    var section = document.createElement('section'),
	    	sInitialScale = getInitialScale();

	    // 0.5 使用fiexible.js制作页面，分辨率密码是正常手机两倍时候的值
	    if (sInitialScale == '0.5') {
	    	section.className = 'followTipsBg dpr2';
	    }
	    // 分辨率密码为正常手机的三倍，如iphone6 plus
	    else if (sInitialScale == '0.3333333333333333') {
	    	section.className = 'followTipsBg dpr3';
	    }
	    else {
	    	section.className = 'followTipsBg';
	    }

	    section.innerHTML = '<section class="followTipsWp">' +
	        '<span class="a">获取更多信息，请关注公众号</span>' +
	        '<button type="button" class="followBtn">关注</button>' +
	        '<a class="followIcon" href="javascript:;"></a></section>';
	    document.getElementsByTagName('body')[0].appendChild(section);
	    $(".followIcon").click(function () {
	        $(".followTipsBg").css("display", "none");
	        $(".followTipsWp").css("display", "none");
	    });
	    $(".followBtn").click(function () {
	        followCode(params);
	    });
	}

	/* 二维码弹出框 */
	function followCode(params) {
		var paramsV = params.split("**");

		var dpr = '<div>';
		var sInitialScale = getInitialScale();

		if (sInitialScale == '0.5') {
			dpr = '<div class="dpr2">';
		}
		// 分辨率密码为正常手机的三倍，如iphone6 plus
		else if (sInitialScale == '0.3333333333333333') {
			dpr = '<div class="dpr3">';
		}

	    var followHtml = (
	    	dpr +
	        '<div class="followCodeBg"></div>' +
	        '<div class="followCodeWp">' +
	        // '<div class="codeH1">'+paramsV[0]+'</div>' +
          '<div class="codeH1"></div>' +
	        '<span class="codeClose fr"></span>' +
	        '<div class="codeBd">' +
	        '<div class="codeImg"><img src="' + paramsV[1] + '" alt="" class="hidden" /><img src="' + paramsV[1] + '" alt="" /></div>' +
	        '<p class="codeInfo">长按二维码关注公众号</p>' +
	        '</div>' +
	        '</div>' +
	        '</div>'
	    );
	    $("body").append(followHtml);
	    $(".codeClose").click(function () {
	        $(".followCodeBg").css("display", "none");
	        $(".followCodeWp").css("display", "none");
	    });
	 }


    //get cookie
	function getCookie(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	}
