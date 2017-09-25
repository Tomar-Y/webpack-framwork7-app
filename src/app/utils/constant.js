'use strict';

export default {
  //AVATAR: require('../../assets/images/01.png'),
  //SERVER_URL: 'api/',
  CAMERA: __dirname + 'bank-eip-mobile/src/assets/images/camera.png',
  SERVER_URL: 'http://localhost:8088/bank-eip-mobile/src/mooc/',
  TEM_URL: __dirname + 'bank-eip-mobile/src/page/',

  GROUPS: '',
  ZONE_PID: "33016227",

  LOGIN_USER:'',
  LIMIT_START: 0,
  PAGE_SIZE: 10,
  //请假类型
  LEAVE_TYPE: [
    {
      values: ('事假 调休 年假 病假 婚休 产检假 产假 陪产假').split(' '),
      textAlign: 'center'
    }
  ],

  STATUS: {
    SUCCESS: 0
  },
  LNG: 'locale'
};
