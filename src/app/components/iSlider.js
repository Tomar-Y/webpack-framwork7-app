'use strict';
import 'islider';

export default {
    init: (options) => {
        /**
         * options --参数
         * dom: 放轮播图的box
         * list: 轮播图数据列表{content: url}
         * isAutoplay: 自动播放
         * onSlideChange: 图片改变时执行的方法
         * //见详情 http://be-fe.github.io/iSlider/demo/index_chinese.html#options
         */
        if(options.dom && options.list){
           return this.iSlider(options);
        };
        
    },
    iSlider: (options) => {
        let dom = document.getElementById(dom);
        let list = options.list;
        let S = new iSlider(dom, list, {
            isAutoplay: options.isAutoplay==false?false:true,
            isLooping: 1,
            isOverspread: 1,
            animateTime: 1200,
            plugins: ['dot'],
            onSlideChange: options.onSlideChange||''
        });
        chosenWrapType(options);

        return S;
    },

    //选择轮播图wrap的样式
    chosenWrapType: (options) => {
        let dom = document.getElementById(dom);
        let pbox = options.dom.parent().getElementByClass("islider-dot-wrap");
        let type = options.type;
        let list = options.list;
        if(!type){
            pbox.hide();
            return ;
        };
        switch (type) {
        case 'left':
            pbox.style.float = "left";
            break;
        case 'right':
            pbox.style.float = "right";
            break; 
        case 'full':
            var width_li = (pbox.innerWidth()-12)/list.length
            pbox.style.width =  width_li + "px";
            break;
        default:
            break;
        }
    }
}