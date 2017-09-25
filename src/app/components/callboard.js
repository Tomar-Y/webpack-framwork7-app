'use strict';

export default {
    init: (dom, time) => {
        var callboarTimer; 
		var dom_ul = dom.find('ul'); 
		var dom_li = dom.find('li'); 
		var liLen = dom.find('li').length; 
		var initHeight = dom.find('li:first-child').outerHeight(true);

		var autoAnimation = function(){
			if (liLen <= 1) return; 
			// 	var self = arguments.callee; 
			var callboardLiFirst = dom.find('li:first-child'); 
			callboardLiFirst.animate(
                {marginTop:-initHeight}, 
			    800,
			    function (){
                    clearTimeout(callboarTimer); 
                    callboardLiFirst.appendTo(dom_ul).css({marginTop:0}); 
                    callboarTimer = setTimeout(autoAnimation, time); 
                }
			); 
		}

		dom.mouseenter(
            function (){ 
                clearTimeout(callboarTimer); 
            }).mouseleave(function (){ 
                callboarTimer = setTimeout(autoAnimation, time/2); 
            }); 
		//初始化
		setTimeout(autoAnimation, time); 
    }
}