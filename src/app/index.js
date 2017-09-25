'use strict';

import 'framework7';
import 'framework7/dist/css/framework7.ios.css';
import 'framework7/dist/css/framework7.ios.colors.css';
import '../style/app.css';
import jQuery from 'jQuery';
import layer from 'layer';

import toolbar from './toolbar';
import Login from './login/login';
import Router from './router';
import Constant from './utils/constant'
import Tool from './utils/tool';
import Animate from './components/animate';

var app = {
    init() {
        // Init App
        window.$$ = Dom7;
        window.$ = jQuery;
        window.myApp = new Framework7({
            // Enable Material theme
            //material: true,
            swipePanel: 'left',
            swipeBackPage: false,//滑动回到上一页
            swipeBackPageThreshold: '60px',
            //pushState: true
        });
        window.mainView = myApp.addView('.view-main', {
            domCache: false
        });
        Animate.init();
        Router.init();
        //打开登录
        myApp.loginScreen();
        this.bindEvent();
    },
    doLogin(){
        Login.init(); 
    },
    bindEvent(){
        var events = [
            {
                element: '#loginBtn',
                event: 'click',
                handler: this.doLogin
            }
        ];
        Tool.bindEvents(events);
    }


}

app.init();