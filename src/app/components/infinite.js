'use strict';
import Tool from '../utils/tool';
import Xhr from '../utils/xhr';

export function infinite(options) {
    let infinite = this;
    //分页使用到的参数(切换tab的时候 可以直接更换此options)
    infinite.options = Tool.copyOps(options, infinite.options);
    infinite.scrollBox = "";
	infinite.loading = "";
	infinite.searchInput = "";
	infinite.signleInfinite = false;
	infinite.container = "";
	infinite.limitStart = 0;

    let appendHtml = function(temlate, data){
		let _this = infinite;
		let html = Tool.renderTpl(temlate, data);
		let listBox = _this.container.find('.infinite-scroll');
		if(listBox.find(".virtual-list>ul").length>0){
		}else{
			let ul = $("<ul></ul>");
			$(_this.options.page.container).find('.virtual-list').append(ul);
		}
		listBox.find('.virtual-list>ul').append(html);
	};

    //输入的value
    let getQueryVal = () => {
        return infinite.container.siblings("form.searchbar").find("[type='search']").val();
    };

    let infiniteFun = function(){
        let _this = infinite;
        let options = _this.options;
		if (_this.loading){
			return;
		}

		_this.loading = true;
		
		_this.container = $$(options.page.container);
		_this.searchInput = _this.container.find("form.searchbar-init input[type='search']");
		_this.signleInfinite = _this.searchInput.length==0;
		
		//limitstart
		_this.limitStart = _this.container.find('.infinite-scroll>.virtual-list>ul>li').length;
		//拼接查询信息
		options.params[options.queryName] = getQueryVal();
		
		//请求前需要执行的方法，一般是添加或修改一些 请求参数
		if(options.beforeGetJSON){
			options.params = options.beforeGetJSON(options);
		}
		options.params["limitStart"] = _this.limitStart;

		var callback_infinite = function(resOptions, json){
			if (json.data.records.length == 0) {
				_this.loading = true;
				myApp.detachInfiniteScroll(_this.container.find('.infinite-scroll'));
				
				if(options.params.limitStart>=10){
					_this.container.find("#page-bottom-cdd").show();
				}else{
					_this.container.find("#page-bottom-cdd").hide();
				}
				return;
			}else{
				_this.loading = false;
				for(var i=0;i<json.data.records.length;i++){
					if(json.data.records[i]){
						_this.appendHtml($$(options.templateId),json.data.records[i]);
					}
				}	
				if(options.complate){
					options.complate(options, json);
				}
			}
		};
		var options_infinite = {
			url: options.url,
			params: options.params,
			callback: callback_infinite
		};
		Xhr.doGetJSON(options_infinite);
		
		if(_this.signleInfinite){
			var ul = $("<ul></ul>");
			_this.scrollBox.find('.virtual-list').append(ul);
			_this.scrollBox.trigger('infinite');
		}

		//重置页脚菜单active
		if(_this.options.resetToolbar){
			resetToolbarActive();
		}
	};

    let init = function(){
		var _this = infinite;
		_this.loading = false;
		this.scrollBox = $$(".infinite-scroll");
		$$("body").off("infinite").on('infinite', ".infinite-scroll", function(event){
			infiniteFun();
		});
	};
	infinite.triggerInfinite = function(options){
        infinite.clearCache(options);
		infiniteFun();
    };
    
    //清理缓存
	infinite.clearCache = function(options){
        infinite.options = Tool.copyOps(options, infinite.options);
		let _this = infinite;
		let container = $(options.page.container);
		myApp.detachInfiniteScroll(container.find('.infinite-scroll'));
		myApp.attachInfiniteScroll(container.find('.infinite-scroll'));
		_this.options = options;
		_this.limitStart = 0;
		_this.loading = false;
		container.find("#page-bottom-cdd").hide();
		container.find(".infinite-scroll>.virtual-list").empty();
	}

    return infinite;
}