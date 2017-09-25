'use strict';
import {Infinite} from './infinite';
import {InitListSearch} from './initListSearch';
import {Swipeout} from './swipeout';

export default {
    init(resOptions){
        /**
         * reOptions部分参数说明
         * 
         * params: 分页时，请求后台需要带的参数，默认有搜索条件。
         * templateId：模板ID
         * queryName："搜索框的name"
         * page：当前page对象
         * url：后台请求路径
         * page_params：自定义 分页参数
         * noSearch：无搜索的列表页 默认有
         * noInfinite：不需要分页的列表页
         * 
         * swipeout：{//滑动删除
         * 		url:删除的方法地址
         * 		msg:删除的提示信息
         * 		paramName：需要传到后台的参数名
         * }
         */
        resOptions.params["limitStart"] = 0;
        $(resOptions.page.container).find("#page-bottom-cdd").hide();

        let options = {

        };
        //搜索
        if(!resOptions.noSearch){
            options.search = this.infinite(resOptions);
        };
        //分页
        if(!resOptions.noInfinite){
            options.infinite = this.initListSearch(resOptions);
        };
        //滑动删除
        if(options.swipeout){
            swipeoutInit(options);
        }
        return options;
    },

    infinite(resOptions){
        return new Infinite(resOptions);
    },

    initListSearch(resOptions){
        return new InitListSearch(resOptions);
    },

    swipeoutInit(resOptions){
        return new Swipeout(resOptions);
    }
}