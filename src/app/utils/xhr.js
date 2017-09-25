'use strict';

import Constant from './constant';
import Tool from './tool';

export default {
  formatUrl(url){
    return Constant.SERVER_URL + url;
  },
  ajaxRequest(options){
    options.url = this.formatUrl(options.url);
    ajaxRequest(options);
  },

  getPromise(options){
    options.url = this.formatUrl(options.url);
    console.log(options.url);
    return ajaxPromise(options);
  },

  doGetJSON(options){
    options.url = this.formatUrl(options.url);
    console.log(options.url);
    doGetJSON(options);
  },

  doPost:(options) => {
    options.url = this.formatUrl(options.url);
    doPost(options);
  }
};

//getJSON
const doGetJSON = (options) => {
    var flag = options.doLoading||true;
    flag?myApp.showIndicator():"";

    $$.getJSON(
        options.url, 
        options.params, 
        //请求成功
        (json, status) => {
            flag?myApp.hideIndicator():"";
            if(options.success){
                options.success(json, options);
            }

        },
        //处理响应错误
        (xhr, status) => {
            ajaxErrer(xhr, status);
        }
    )
};

const doPost = (options) => {
	$$.post(options.url, options.params, function(json){
		if(options.callback){
			var result  = eval("("+json+")");
			options.callback(result, options);
		}
		
	})
};

//F7ajax
const ajaxRequest = (options) => {
  var defaults = {
    url: Constant.SERVER_URL + options.url,
    type: 'GET',
    contentType: 'application/json',
    dataType: 'json',
    complete: function(request, status) {}
  }
  $.each(defaults, (key, val) => {
    if (!options[key]) {
      options[key] = val;
    }
  });

  var _successFn = options.success;
  options.success = (result, status, xhr) => {
    if (false) {
      //拦截
    }
    _successFn(result, status, xhr);
  };

  if (options.type.toUpperCase() === 'POST' && options.contentType && options.contentType.indexOf('json') != -1) {
    options.data = JSON.stringify(options.data);
  }
  console.log('调用接口:\n%s,\n参数列表:', options.url, options.data);
  $.ajax(options);
};

//承诺
const ajaxPromise = (options) => {
    var url = options .url;
    var type = options.type;
    var params = options.params;
    var async = options.async;

    return new Promise((resolve, reject) => {
        var req = options.xhr = options.xhr || new XMLHttpRequest();
        // 注册xhr对象事件
        req.onprogress = options.onprogress;
        req.upload.onprogress = options.onuploa
        req.responseType = options.dataType;

        req.onload = function() { 
            if((req.status >= 200 && req.status < 300) || req.status === 304) {
                resolve(JSON.parse(req.response));
            } else {
                reject(Error(req.statusText));
            }
        };
        req.ontimeout = function () {
            reject({
                errorType: 'timeout_error',
                xhr: req
            });
        }
        req.onerror = function() {
            reject(Error("Network Error"));
        };
        type == null || type.toUpperCase() == 'GET'?type='get':type='post';
        params = Tool.formatParams(params);
        params == null || params == ''?url:url=url+'?'+params;
        async == null || async == true?async=true:async=false;
        //设置表单提交时的内容类型，未完
        //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.open(type, url, async);
        req.send();
    })
}

let ajaxErrer = (xhr, status) => {
	var code = xhr.getResponseHeader("oauthstatus");
	//401
	if(code == 401){
		layer.msg("登录已超时，请重新登录。");
		setTimeout(function(){
			location.reload(true);
		},2000)
	}
	//404
	if(code == 404){
		//跳转404页面
	}
	//500
	if(code == 500){
		layer.msg("系统异常，请稍后重试。");
	}
}