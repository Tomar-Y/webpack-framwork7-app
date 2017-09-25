'use strict';

import ToolbarData from './toolbarStatic.json';
import toolbarTmpl from './toolbar.tmpl.html';
import Constant from '../utils/constant';
import Tool from '../utils/tool';
import Router from '../router';


export default {
    init(dom) {
        //底部菜单
        var _toolbarHtml = Tool.renderTpl(toolbarTmpl, ToolbarData);
        dom.html('').append(_toolbarHtml);

        this.bindEvent();
    },

    doLoad() {
        var $this = $(this);
        Tool.changeActive($this);
        var options_load = {url: $$(this).data("loadurl")};
        Router.mainLoad(options_load);
    },

    bindEvent(){
        var events = [
            {
                element: '#toolbarbuttom',
                target: 'div.toolbar-inner>a',
                event: 'click',
                handler: this.doLoad
            }
        ];
        Tool.bindEvents(events);
    }
}