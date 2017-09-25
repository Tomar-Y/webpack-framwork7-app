'use strict';

export default {
    alert(text, callback){
        myApp.modal({
            title: '详情',
            text,
            buttons: [{
                text: '确定',
                onClick(){
                    callback && callback();
                }
            }]
        });
    },
    confrim(text, callback){
        myApp.modal({
            title: '详情',
            text,
            buttons: [{
                text: '取消'
            },{
                text: '确定',
                onClick(){
                    callback && callback();
                }
            }]
        });
    },

    layConfirm(options){
        /**
         * msg：提示信息
         * confirm: 执行函数
         */
        var index = layer.confirm(
            options.msg,
            {
                btn: ["确定", "取消"],
            },
            function(){
                options.confirm && options.confirm(index);
            }
        )
    },

    pickerModal(domId){
        $(domId).on('click', function(){
            myApp.pickerModal(domId);
        });
    }
    
};
