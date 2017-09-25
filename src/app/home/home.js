'use strict';

import Xhr from '../utils/xhr';
import ISlider from '../components/iSlider';
import Callboard from '../components/callboard';

export default {
    init(page){
        var container = $(page.container);
        var query = page.query;
        console.log("成功！");

        //请求数据  考虑用承诺。
        /**
         * 1、轮播图请求。promiseISlider
         * 2、公告列表请求。promiseNotice
         * 3、爆款请求。promisePromotion
         */
        
        // Promise.all([this.promiseISlider(), this.promiseNotice()]).then(function(a){
        //     console.log(a);
        // },function(){
        //     console.log(333);
        // });

    },

    //轮播图
    promiseISlider: () => {
        debugger;
        let options_data = {
            url: "advertisementController/list.do"
        };
        let onresolve = (res) => {
            let options_islider = {
                dom: "#iSlider-wrapper",
                wrap: 'right',
                list: res.data?(options_islider["list"] = res.data):''
            };
            ISlider.init(options_islider)
        };
        let onreject = (res) => {

        };
        Xhr.getPromise(options_data).then(onresolve, onreject);
    },

    //公告
    promiseNotice: () => {
        debugger;
        var options_notice = {
            url: 'noticeController/list.do'
        };
        let onresolve = (res) => {
            let html = renderTpl($$('#noticeTemp'),result.data);
            $$('#callboard').html(html);
            Callboard.init($("#callboard"), 3000);
        };
        let onreject = (res) => {

        };
        Xhr.getPromise(options_notice).then(onresolve, onreject);
       
    },

    //爆款产品
    promisePromotion: (options) => {

    }
}