export default {

    // iOS Device picker
    pickerDevice(options){
        myApp.picker({
            input: options.domId,
            cols: options.cols
        });
    },

    // Describe yourself picker
    pickerDescribe(options){
        myApp.picker({
            input: options.domId,
            rotateEffect: true,
            onChange: (picker, values) => {
                options.onChange(picker, values);
            },
            cols: options.cols
        });
    },

    // Dependent values
    pickerDependent(){
        myApp.picker({
            input: options.domId,
            rotateEffect: true,
            formatValue: function (picker, values) {
                return values[1];
            },
            cols: options.cols
        });
    },

    
    //初始化关闭按钮
    initClose(){
        $("#ks-picker-date-container>p").show();
        $("#ks-picker-date-container").on("click", ".picker-head-close>i", function(){
            $("#ks-picker-date-container>p").hide();
            $("#ks-picker-date-container>div").remove();
        })
    },
    //时间选择
    pickerInline(options){
        var today = new Date();
        this.initClose();
        myApp.picker({
            input: options.domId,
            container: '#ks-picker-date-container',
            toolbar: false,
            rotateEffect: true,
            value: [today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
            onChange: function (picker, values, displayValues) {
                var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
                if (values[1] > daysInMonth) {
                    picker.cols[1].setValue(daysInMonth);
                }
                 options.onChange(picker, values, displayValues);
            },
            formatValue: function (p, values, displayValues) {
                return displayValues[0] + '-' + values[1] + '-' + values[2] + ' ' + values[3] + ':' + values[4];
            },
            cols: [
                // Years
                {
                    values: (function () {
                        var arr = [];
                        for (var i = 1950; i <= 2030; i++) { arr.push(i); }
                        return arr;
                    })(),
                },
                // Months
                {
                    values: ('1 2 3 4 5 6 7 8 9 10 11 12').split(' '),
                    displayValues: ('1 2 3 4 5 6 7 8 9 10 11 12').split(' '),
                    textAlign: 'left'
                },
                // Days
                {
                    values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
                },
                
                // Space divider
                {
                    divider: true,
                    content: '&nbsp;&nbsp;'
                },
                // Hours
                {
                    values: (function () {
                        var arr = [];
                        for (var i = 0; i <= 23; i++) { arr.push(i); }
                        return arr;
                    })(),
                },
                // Divider
                {
                    divider: true,
                    content: ':'
                },
                // Minutes
                {
                    values: (function () {
                        var arr = [];
                        for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                        return arr;
                    })(),
                }
            ]
        })
    }
}