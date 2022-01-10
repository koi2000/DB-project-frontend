import React from 'react';
import {useRef,useState} from 'react'
import "./css/index.css"
import api from '../../util/api';
import { useHistory } from 'react-router';
import { Modal,Form, Input, InputNumber, Button,Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import UserMessageForm from '../userMessageForm';
import store from '../../store';
import { saveAction } from '../../action';
import { onLogin } from '../../util/api';
function LoginBeauty(props){

    const inputName = useRef(null)
    const inputPassword = useRef(null)
    const history = useHistory();
    const [modal2Visible,setmodal2Visible] = useState(false)
    const [registerBox,setRegisterBox] = useState()

    const onFinish = () => {
        console.log(inputName.current.value)
        console.log(inputPassword.current.value)
        
        //console.log(history)
        let params={
          userName: inputName.current.value,
          passWord: inputPassword.current.value
        }
        api.login(params).then((response)=>{
            console.log(response.headers.userinfo);
            //console.log(response.data.data)
            const data = response.data.data;
            const action = saveAction(data);
            store.dispatch(action)
            
            console.log("获得"+JSON.stringify(store.getState()))
            onLogin(response.headers.userinfo);
          }).then((response)=>{
            //history.push("/home",history.go())
            //window.location.href=window.location.href
            
            console.log(response)
            history.push({
                pathname: "/home"
                });
            history.go();
        })
    }
    

    const setModal2Visible=(modal2Visible)=> {
        setmodal2Visible(modal2Visible);
    }
    
    var style = {
        top:"100px",
        width:"800px",
        height:"800px"
    }
    const register = () =>{
        console.log(1);
        setModal2Visible(true)
        
    }

    //console.log("进入这里")
    return(
        <div class="body">
            <div class="login-box">
                <h1>登录</h1>
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
                        登录
                    </div>

                    <div class="sign-up">
                        <a class="btn btn-primary " style={{"display":"inline-block" ,"float": "right"}}>还没账户？</a>
                        
                    </div>
                    <Button type = "text" onClick = {register}>立即注册</Button>
                </div>
                    
            </div>
            <Modal
                title="注册"
                centered
                visible={modal2Visible}
                onOk={() => setModal2Visible(false)}
                onCancel={() => setModal2Visible(false)
                }
                width="700px"
                style={style}
            >
                
                <content>
                    <UserMessageForm style={{
                        position:"relative",
                        top:"0px"
                    }} ></UserMessageForm>
                </content>
                
                
            </Modal>
        </div>
    );
}

export default LoginBeauty;