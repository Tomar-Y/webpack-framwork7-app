'use strict';

import WorkApply from './work.apply.tmpl.html';
import Tool from '../utils/tool';
import Xhr from '../utils/xhr';
import Router from '../router';
export default {
    init(page){
        let continar = $(page.continar);
        let query = page.query;

        this.showApply();
    },

    //获取应用数据
    showApply(){
        let options_apply = {
            url: "work.center.apply.json",
            success: (res, options) => {
                let data = res.data;
                if(data){
                    let html = Tool.renderTpl(WorkApply, data);
                    $("#apply_box").html('').append(html);
                }
            }
        };
        Xhr.doGetJSON(options_apply);
        
        //绑定事件
        this.bindEvent();
    },

    //mainLoad
    doMainLoad(){
        var _this = $(this);
        Router.mainLoad({url: _this.data('url')});
    },

    //绑定事件
    bindEvent(){
        var events = [
            {
                element: '#apply_box',
                target: 'li>a[data-url]',
                event: 'click',
                handler: this.doMainLoad
            }
        ];
        Tool.bindEvents(events);
    }
}