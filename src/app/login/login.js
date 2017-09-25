'use strict';

import Xhr from '../utils/xhr';
import Router from '../router';
import Toolbar from '../toolbar';
import Constant from '../utils/constant';

export default {
    init(callback){
        let username = $('input[name="userName"]').val();
        let password = $('input[name="password"]').val();
        let user = {};
        
        if(username && password){
            user.userName = username;
            user.password = password;
        }else{
            user.userName = 13888888888;
            user.password = 888888;
        }

        let options_pro = {
            url: 'login.json',
            success: this.success
        }
        Xhr.doGetJSON(options_pro);
        
        //自动登录时，可以调用 承诺
        //Xhr.getPromise(options_pro).then(this.onresolve, this.onreject);
    },
    success: (res, options) => {
        //请求成功
        if(res.data.success){
            Constant.LOGIN_USER = res.data.records;
            Toolbar.init($("#toolbarbuttom"));
            myApp.closeModal('.login-screen');
            let options_router = {
                url: "work-center/work.center"
            };
            Router.mainLoad(options_router);
        }


        
    },
    onreject: (res) => {

    }
}