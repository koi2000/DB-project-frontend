import React from 'react';
import {useRef} from 'react'
import "./css/index.css"
import api from '../../util/api';
import { useHistory } from 'react-router';
//import "./css/iconfont.css"


function LoginBeauty(props){

    const inputName = useRef(null)
    const inputPassword = useRef(null)
    const history = useHistory();
    const onFinish = () => {
        console.log(inputName.current.value)
        console.log(inputPassword.current.value)
        
        console.log(history)
        let params={
          userName: inputName.current.value,
          passWord: inputPassword.current.value
        }
        api.login(params).then((response)=>{
            history.push("/home")
        })
    }
    
    console.log("进入这里")
    return(
        <div class="body">
            <div class="login-box">
                <h1>登陆</h1>
                <div class="input-box">
                <div class="input-text">
                    <span class='iconfont icon-mine'></span>
                    <input type="text" placeholder="用户名" ref={inputName}></input>
                </div>
                <div class="input-text">
                    <span class='iconfont icon-lock'></span>
                    <input type="password" placeholder="密码" ref={inputPassword}></input>
                </div>
                <div class="input-btn" onClick={onFinish}>
                    登陆
                </div>
                <div class="sign-up">
                    还没账户？<a href="#">立即注册</a>
                </div>
                </div>
            </div>
        </div>
    );
}

export default LoginBeauty;