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


//axios.defaults.baseURL = serverUrl;
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
    axios.defaults.withCredentials = true
    if (type === "GET") {
      promise = axios.get(serverUrl+url, {
        params: data
      });
    } else {
      
      promise = axios.post(serverUrl + url, data);
    }
    // Cookie跨域
    promise
      .then(response => {
        //2、如果成功，调用resolve()
        resolve(response);
      })
      .catch(error => {
        //3、如果失败，不调用reject(),而是提示异常信息（可以结合第三方框架）
        //console.log(error.response)
        if(error.response!=null){
          if(error.response.data!=null){
            if(error.response.data.message!=null){
              console.log(error.response.data.message)
              message.error(error.response.data.message);
            }
          }
        }else{
          console.log(error)
          message.error("error");
        }
      });
  });
}

// 获取当前用户cookie
export const loginUser = () => {
  return cookie.load(cookieName)
}

//查看是否登陆
export const isLogin = () => {
  let user =  cookie.load(cookieName)
  if(user===null||user===undefined){
    return false
  }else{
    return true
  }
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


const  api =  {
  login : function (data){
    return ajax('/user/login',data)
  },

  register : function(data){
    return ajax('/user/register',data,"POST").then((response)=>{
      onLogout();
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

  getUserMessge : function(data) {
    return ajax('/manage/user/getUser',data);
  },

  getProfile: function(){
    return ajax('/user/session');
  },

  getUserList:function(data){
    return ajax('/manage/user/list',data);
  },

  addUser:function(data){
    return ajax("/manage/user/addUsers",data,'POST');
  },

  downLoadtemplate:function(){
    return ajax("/user/download/template");
  },

  deleteUser:function(data){
    return ajax("/manage/user/delete",data,'POST');
  },

  getBookList:function(data){
    return ajax('/book/list',data,'POST');
  },

  getDetail:function(data){
    return ajax('/book/queryDetail',data)
  },
  
  borrow : function(data){
    return ajax('/book/borrow',data,"POST")
  },

  getBorrowList:function(data){
    return ajax('/book/borrowList',data,"POST")
  },

  getBookName:function(data){
    return ajax('/book/getBookName',data)
  },

  userUpdate:function(data){
    return ajax("/manage/user/update",data,"POST")
  },

  returnBook:function(data){
    return ajax("/book/return",data)
  },

  getDefaultList:function(data){
    return ajax("/default/list",data,"POST")
  },

  createBook:function(data){
    return ajax("/manage/book/create",data,"POST")
  },
  updateBook:function(data){
    return ajax("/manage/book/update",data,"POST")
  },
  uploadFile:function(data){
    return ajax("/file/upload",data,"POST")
  }


}
export default api;



