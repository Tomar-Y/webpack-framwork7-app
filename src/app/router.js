'use strict';

import homeModule from './home/home';
import WorkCenter from './work-center/work.center';
import Leave from './leave/leave';
import Contact from './contact/contact';
import Constant from './utils/constant';
import Utils from './utils/tool';

export default {
  init(){
    var that = this;
    myApp.onPageBeforeInit("*", (page) => {
        this.pageBeforeInit(page);
    });
  },
  
  pageBeforeInit(page){
    switch (page.name) {
      case 'home':
        homeModule.init(page);
        break;
      case 'work-center':
        WorkCenter.init(page);
        break;
      case 'leave':
        Leave.init(page);
        break;
      case 'contact-group':
        Contact.init(page);
        break;
      case 'contact':
        Contact.init(page);
        break;
      default:
        break;
    }
  },

  //路由方法
  mainLoad: (options) => {
    options.url = Constant.TEM_URL + options.url + '.html';
    mainView.router.load(options);
  }
};
