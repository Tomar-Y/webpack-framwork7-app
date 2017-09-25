'use strict';

export default {
    deleteAnimate(dom){
        dom.fadeTo("slow", 0.01, function(){
            $(this).slideUp("slow", function() {
                $(this).remove();
            });
        })
    },

    deleteAnimate_left(dom, callback){
        dom.animate({left:"-1000px"},1200, function(){
            dom.remove();
            if(callback){
                callback();
            }
        });
        
    },

    deleteAnimate_right(dom){
        dom.animate({right:"-1000px"},1200, function(){
            dom.remove();
        });
    },

    deleteAnimate_top(dom){
        dom.animate({top:"-1000px"},1200, function(){
            dom.remove();
        });
    },

    deleteAnimate_bottom(dom){
        dom.animate({bottom:"-1000px"},1200, function(){
            dom.remove();
        });
    }
}