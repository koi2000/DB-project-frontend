import React, { Component } from 'react'
import { Form,Input, Button, Checkbox} from "antd";
import "./index.css";
import logo1 from '../../asserts/img/logo3.jpg';

import  api  from "../../util/api";
import LoginBeauty from '../../components/login_page';


class Login extends Component {

  
    constructor(props){
      super(props);
      this.props=props;
    }
    
    render() {

      
      const onFinish = (values) => {
        
        console.log(values.username);
        console.log(values.password);
        /*axios({
          method: 'get',
          url: serverUrl+"/user/login",
          data: {
              uaerName: values.uaername,
              passWord: values.password
          }
          
        }).then(response => {
            // handle success
            //this.resultTwo.successInfo = response.data;
            console.log(response);
        }).catch(error => {
            // handle error
            //this.resultTwo.failureInfo = error;
            console.log("失败")
        });*/
        let history = this.props.history;
        let params={
          userName: values.username,
          passWord: values.password
        }

        
        api.login(params).then((response)=>{
          //console.log(response);
          history.push("/home");
          //<NavLink replace to="/about">About</NavLink>
        });
        
        
        /*
        axios.get(serverUrl+'/user/login', {
          params: {
            //uaerName: values.username,
            userName: values.username,
            passWord: values.password
          }
        })
        .then(function (response) {
          //console.log(response.headers['set-cookie'])
          history.push("/home");
          
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        */
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
      console.log("进入登陆")
      return (
        <LoginBeauty/>
        /*<div>
          <p >图书信息管理系统</p>
          <img src={logo1} style ={{width:"1050px",height:"800px"}}alt='logo'/>
        <Form 
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
    
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
    
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          </Form>
        </div>*/
        
      );
    }
}

export default Login