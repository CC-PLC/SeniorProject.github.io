/*
 Copyright (c) LEADERG INC. ( https://www.leaderg.com )
 */

function GtCookie_Set(name, value, path) {
	var Days = 3;
	var exp  = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape (value) + ";path=" + path + ";expires=" + exp.toGMTString();
}

function GtCookie_Get(name) {
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if(arr != null) return unescape(arr[2]); return null;
}

function GtCookie_Delete(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if(cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

$(document).ready(function(){
	$(window).bind('scroll resize', function(){
			var $this = $(this);
	 
			var screenHeight = document.documentElement.clientHeight;
			if (screenHeight > 480) {
				$("#article").css("min-height", screenHeight - 102);
			}
			
	}).scroll();
	
	
	var curdate = new Date();
	var timeZone = 0 - curdate.getTimezoneOffset() / 60;
	
	GtCookie_Set("cookieTimeZone", timeZone, "/");
});

function Browser_CheckVersion() {
	var appName = navigator.appName;
	var userAgent = navigator.userAgent;
	var appVersion = navigator.appVersion;
	
	var version = 999; // we assume a sane browser
	if (appVersion.indexOf("MSIE") != -1) {
		version = parseFloat(navigator.appVersion.split("MSIE")[1]);
		if(version < 9) {
			alert("IE " + version + " is not supported! We support IE 9 or higher version.");	
		}
	}
}

function GtBrowser_GotoPage(pageUrl, userSn, lang) {
	if (userSn <= 0) {
		if (lang == 1) alert("請登入!");
		else if(lang == 2) alert("请登入!");
		else alert("Please login!");
	} else {
		window.location = pageUrl;
	}
}
function GtBrowser_GotoPage_Blank(pageUrl, userSn, lang) {
	if (userSn <= 0) {
		if (lang == 1) alert("請登入!");
		else if(lang == 2) alert("请登入!");
		else alert("Please login!");
	} else {
		window.open(pageUrl,'_blank');
	}
}

function GtBrowser_CheckVersion() {
	alert("GtLib_CheckVersion");
	var app = navigator.appName;
	var nagent = navigator.userAgent;
	// 在網頁上顯示瀏覽器名稱
	if (app=="Microsoft Internet Explorer") {
		document.write("您所使用的瀏覽器名稱為:Microsoft IE");
   		//indexOf用來檢查字串出現在第幾個數字,沒有出現則為-1
   		if ((nagent.indexOf(8.0) !=-1) | (nagent.indexOf(9.0) !=-1)) {
     		document.write("版本為:8.0以上");
    		//不同的瀏覽器切換不同的網頁
    		window.location = "ie_version.htm";
		} else {
			document.write("版本為:7.0以下,請升級到最新的IE版本");
		}
	}
	else {
		if (app == "Netscape") {
			document.write("您所使用的瀏覽器名稱為:Firefox");
			window.location = "netscape_version.htm";
		} else {
			document.write("您所使用的瀏覽器名稱為:"+app);
		}
	}
}

function GtBrowser_IsFlashSupported() {
  if(window.ActiveXObject) {
    try {
      if(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'))
         return 1;
    } catch(e) { }
  }
    
  return navigator.plugins['Shockwave Flash'] ? 1 : 0;
}
