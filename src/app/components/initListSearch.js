'use strict';
import Tool from '../utils/tool';
import Constant from '../utils/constant';
import Xhr from '../utils/xhr';

export function virtualList(resOptions){
    //默认参数
    let options = {
        page: "",
        typeName: "",
        templateId: "",
        params: "",
        queryName: "",

        limitStart: "",
        pageSize: "",
        listBox: "",
        renderItem: "",
        sea_loading: false,

        complateSearch:""
    };
    //初始化
    let init = (resOptions) => {
        resOptions = baseOptions(resOptions);

        let container = $(resOptions.page.container);
        resOptions["container"] = container;
        resOptions["listBox"] = resOptions.listBox||".virtual-list";

        //拼接查询信息
        let searchInput = resOptions.searchInput||container.find("form input[type='search']");
        let queryName = resOptions.queryName||searchInput.attr("name")||searchInput.data("name");
        resOptions.params[queryName] = this.getQueryVal(container);
        resOptions["queryName"] = queryName;
        options = Tool.copyOps(resOptions, options);

        return virtualListFun("");
    };
    
    var baseOptions = function(options){
        if(options.page_params){
            options["limitStart"] = options.page_params.limitStart;
            options["pageSize"] = options.page_params.pageSize;
        }else{
            options["limitStart"] = Constant.LIMIT_START;
            options["pageSize"] = constant.pageSize;
        }
        return options;
    }

    //默认的回调函数
    let renderItem = (index, item) => {
        if(options.renderItem){
            options.renderItem(index,item);
        }else{
            return Tool.renderTpl($$(options.templateId), item);
        }
    };

    //搜索触发的方法
    let searchFun = (query, items) => {
        let container = $(options.page.container);
        let _ul = container.find(".virtual-list>ul");

        options.params["limitStart"] = 0;

        if((options.typeName != undefined) && (options.typeName != null)){
            options.params[options.typeName] = container.find(".init-page-tabs>a.active").data("type");
        }
        options.params[options.queryName] = query;
        
        let callback_sea = (resOptions, json) => {
            _ul.empty();
            var records = json.data.records;
            if(records.length>0){
                for(var i=0;i<records.length;i++){
                    _ul.append(Tool.renderTpl($$(options.templateId),records[i]));
                }
            }
            //virtualList.replaceAllItems(json.data.records);
            setTimeout(this.resetHtml(),10);
            options.sea_loading = false;
        }
        let options_sea = {
            url: url,
            params: options.params,
            callback: callback_sea
        }
        Xhr.doGetJSON(options_sea);
    };

    //显示结果
    let resetHtml = () => {
        if($$('[data-page] .virtual-list li').length>0){
            $('.searchbar-not-found').hide();
            $('.searchbar-found').show();
        }
    };

    //输入的value
    let getQueryVal = () => {
        return options.container.siblings("form.searchbar").find("[type='search']").val();
    };

    //绑定搜索
    let virtualListFun = (json) => {
        let records = json?json.data?json.data.records?json.data.records:"":"":"";

		let virtualList = myApp.virtualList($$(options.page.container).find(options.listBox), {
			items: records,
			searchAll: function (query, items) {
				if(!options.sea_loading){
					options.sea_loading = true;
					setTimeout(function(){
						return searchFun(query, items);
					},300)
					
				}
				
			},
			template: function(){
				// if(options.complateSearch){
				// 	options.complateSearch();
				// }
			},
			renderItem: function (index, item) {
				return renderItem(index, item);
			},
			height: options.height||120,
		});
		if(options.complateSearch){
			options.complateSearch();
		}
		return virtualList;
    };
    
    //摧毁
    let destory = () => {}


    //初始化
    init(resOptions);
}










