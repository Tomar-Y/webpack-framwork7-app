'use strict';
import Xhr from '../utils/xhr';
import Tool from '../utils/tool';
import Constant from '../utils/constant';
import InitListPage from '../components/initListPage';

import ContactGroupTmpl from './contact.group.tmpl.html';

let groups = [];
let backArray = [];
let e_this = "";
let container = "";
export default {

    init(page){
        e_this = this;
        
        container = $(page.container);
        let query = page.query;

        //获取groups 并初始化
        this.getGroups();

        //绑定
        this.bindEvent();
       
        //this.initListPage();
    },

    getGroups(){
        if(Constant.GROUPS){
            groups = Constant.GROUPS;

            //拿到第一个group 并初始化
            let group_f = this.getJSONByValue(Constant.ZONE_PID);
            this.setGroupHtml(group_f);   
        }else{
            let options_g = {
                url: 'contactGroups.json',
                dataName: 'zTree',
                success: (res) => {
                    debugger;
                    if(res.success){
                        groups = res.data.zTree;
                        Constant.GROUPS = res.data.zTree;

                        //拿到第一个group 并初始化
                        let group_f = this.getJSONByValue(Constant.ZONE_PID);
                        this.setGroupHtml(group_f);       
                    }
                }
            };
            Xhr.doGetJSON(options_g);
        }
        
    },

    getJSONByValue(pidValue){
        var group = [];
        for(var i=0; i<groups.length; i++){
            if(groups[i].pId == (pidValue+"")){
                group.push(groups[i]);
            }
        }
        return group;
    },

    //把group放入页面 等操作
    setGroupHtml(group){
        let options_general = {
            data: group,
            template: ContactGroupTmpl,
            box: $$("#contact_group"),
            success: (options) => {
                if(backArray.length>0){
                    container.find("div.page-content").animateCss("fadeInRight");
                }
                backArray.push(options.html);//记录每次点击
            }
        }
        Tool.generalTempToHtml(options_general);
    },

    //初始化列表
    initListPage(){
        var options_list = {
            //url: 
        }
        Infinite.init(options_list);
    },

    //render group list
    renderGroup(){
        let _this = $(this);
        debugger;
        let group_ren = e_this.getJSONByValue(_this.data('id'));
        e_this.setGroupHtml(group_ren);
    },

    //render contact list
    renderContact(){
        let _this = $(this);
        let contact_ren = e_this.getJSONByValue(_this.data('id'));
        e_this.setGroupHtml(contact_ren);
    },

    //返回操作
    contactBack(){
        let _this = $(this);
        backArray.pop();
        let length = backArray.length;
        if(length == 0){
            _this.unbind("click");
            _this.addClass("back").click();
            return ;
        };
        container.find("div.page-content").animateCss("fadeInLeft");
        $$("#contact_group").html(backArray[length-1]);
    },

    // group: 如果下面还有分组，则此 <a> 有group class, 反之 <a> 有contact class
    bindEvent(){
        var events = [
            {element:'#contact_group', target: 'a.ZONE', event: 'click', handler: this.renderGroup},
            {element:'#contact_group', target: 'a.ORG', event: 'click', handler: this.renderContact},
            {element:'#contact_back', event: 'click', handler: this.contactBack},
            
        ];
        Tool.bindEvents(events);
    }
}