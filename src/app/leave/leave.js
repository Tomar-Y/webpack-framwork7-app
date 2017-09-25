'use strict';
import './leave.less';

import {showActionSheet} from '../components/action-sheet';
import Modal from '../components/modal';
import Picker from '../components/picker';
import Constant from '../utils/constant';

export default {
    init(page){
        let container = $(page.container);
        let query = page.query;
        
        $("#cameraImg").attr("src", Constant.CAMERA);

        this.pickerDescribe();
        $("#leaveBtime").on("click",() => {
            let pic_div = $("#ks-picker-date-container>div");
            if(pic_div.length > 0){
                pic_div.remove();
            }
            this.pickerInlineBagin();
        })
        $("#leaveEtime").on("click",() => {
            let pic_div = $("#ks-picker-date-container>div");
            if(pic_div.length > 0){
                pic_div.remove();
            }
            this.pickerInlineEnd();
        })
        
    },

    //请假类型 弹窗pickerDescribe
    pickerDescribe(){
        let cols = Constant.LEAVE_TYPE;
        let options_picker = {
            domId: '#leaveType',
            cols: cols,
            onChange: (picker, values)=> {
                debugger;
            }
        }
        Picker.pickerDescribe(options_picker);
    },

    //请假事件 开始时间
    pickerInlineBagin(){
        let options_picker = {
            domId: '#leaveBtime',
            onChange: (picker, values)=> {
                debugger;
            }
        }
        Picker.pickerInline(options_picker);
    },
    
    //请假事件 开始时间
    pickerInlineEnd(options){
        let options_picker = {
            domId: '#leaveEtime',
            onChange: (picker, values)=> {
                debugger;
            }
        }
        Picker.pickerInline(options_picker);
    }
}