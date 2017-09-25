'use strict';
import Xhr from './xhr';
import Tool from './tool';
import Modal from '../components/modal';
import DeleteAnimate from '../components/delete-animate';
export default {
  bindEvents(events){
    for (let i = 0, l = events.length; i < l; i++) {
      if (!events[i].element) {
        $(events[i].target).on(events[i].event, events[i].handler)
      } else {
        $(events[i].element).on(events[i].event, events[i].target, events[i].handler)
      }
    }
  },

  //renderTpl
  renderTpl(tpl, data){
    return Template7.compile(tpl)(data);
  },

  generalTempToHtml(options){
    let generalType = options.generalType||"html";
    let template = options.template;
    let _success = options.success||'';
    let dataName = options.dataName||"";

    if(options.data){
      let html = Tool.renderTpl(template, options.data);
      options.box[generalType](html);
      options["html"] = html;
      _success && _success(options);
    }else{
      options.success = (res, options) => {
        if(res.success){
          let html = Tool.renderTpl(template, res.data[dataName]);
          options.box[generalType](html);
          options["html"] = html;
        }
        _success && _success(res, options);
      };
      Xhr.doGetJSON(options);
    }
  },

  publishTime(date){
    return dateFormat(date, polyglot.t('format.date'));
  },

  //切换 active
  changeActive(dom){
    dom.parent().find(".active").removeClass("active");
    dom.addClass("active");
  },

  //赋值options
  copyOps(res, arri){
    for(var key in res){
      if(res[key]){
        arri[key] = res[key]
      }
    }
    return arri;
  },
  //删除一行
  deleteRow(options){
    var url = options.url;
    var msg = options.msg||"确定要删除吗？";
    var callback = options.callback;
    var params = options.params;
    var isRemove = options.remove||true;//默认移除
    var confirm = function(index){
      var options_de = {
        url: url,
        params: params,
        success: function(json){
          if(json.success){
            if(isRemove){
              
              options.dom.closest("li").addClass("readMove");
              DeleteAnimate.deleteAnimate_left(options.dom.closest("li"));	
            }
            layer.close(index);
            if(callback){
              callback();
            }
          }
          
          layer.close(index);
        }
      }
      Xhr.doGetJSON(options_de);
    };
    var options_lay = {
      msg: msg,
      confirm: confirm
    }
    Modal.layConfirm(options_lay);
  },

  formatParams(data){
    var _fpArr = [];
    for (var _fpName in data) {
        _fpArr.push(_fpName + "=" + data[_fpName]);
    }
    return _fpArr.join("&");
  }
};
