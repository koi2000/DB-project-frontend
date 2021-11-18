/*
 * Copyright 2020-2021 the original author or authors.
 *
 * Licensed under the General Public License, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 */
import axios from 'axios';
import {message} from 'antd'
import {serverUrl} from "../config"
import store from '../store';
import cookie from 'react-cookies'
import { saveAction } from '../action';


const cookieName = 'UserInfo'


axios.defaults.baseURL = serverUrl;
axios.defaults.withCredentials = true;

/*
封装axios
函数的返回值是promise对象
统一处理请求异常
*/

function ajax(url, data = {}, type = "GET") {
  return new Promise((resolve, reject) => {
    let promise;
    //1、执行异步ajax请求
    if (type === "GET") {
      promise = axios.get(serverUrl+url, {
        params: data
      });
    } else {
      promise = axios.post(serverUrl+url, data);
    }

    promise
      .then(response => {
        //2、如果成功，调用resolve()
        resolve(response);
      })
      .catch(error => {
        //3、如果失败，不调用reject(),而是提示异常信息（可以结合第三方框架）
        //console.log(error.response)
        message.error(error.response.data.message);
      });
  });
}

// 获取当前用户cookie
export const loginUser = () => {
  return cookie.load(cookieName)
}

// 用户登录，保存cookie
export const onLogin = (user) => {
  cookie.save(cookieName, user, { path: '/' })
}

// 用户登出，删除cookie
export const onLogout = () => {
  cookie.remove('userInfo')
  window.location.href = '/login'
}

export const isLogin = () => {

}


const  api =  {
  login : function (data){
    return ajax('/user/login',data).then((response)=>{
      console.log(response.headers.userinfo);
      //console.log(response.data.data)
      const data = response.data.data;
      const action = saveAction(data);
      store.dispatch(action)
      
      console.log("获得"+JSON.stringify(store.getState()))
      onLogin(response.headers.userinfo);
    })
  },
  logout : function(){
    onLogout();
  },

  getProfile:function(){
    return ajax('/user/session');
  }  

  
}

export default api;



