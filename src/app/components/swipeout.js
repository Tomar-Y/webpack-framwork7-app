'use strict';
import Tool from '../utils/tool';

export function swipeout(options){
    var swipeout = this;

    var vList = options.vList||$(options.page.container).find(".virtual-list");
	var url_delete = options.swipeout.url;
	var msg = options.swipeout.msg||"确定要删除吗？";
	var options_delete = {
		url: url_delete,
		msg: msg,
		params: {

		},
		callback: options.swipeout.callback
	}
	//myApp.swipeoutDelete(el,callback){}
	vList.on("click", ".delete-confirm", function(){
		var paramName = options.swipeout.paramName;
		var dataName = paramName.toLowerCase();
		var value = $(this).closest(".swipeout").data(dataName);
		options_delete["dom"] = $(this);
		options_delete["params"][paramName] = value;
		Tool.deleteRow(options_delete);
    });
    
    return swipeout;
}