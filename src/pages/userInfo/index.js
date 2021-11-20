import { Descriptions, Badge } from 'antd';
import React,{useState} from 'react';
import store from '../../store';
import "./index.css"
import { Form, Input, InputNumber, Button,Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import api from '../../util/api';
import { useHistory } from 'react-router';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

function UserInfo(props) {

    const onFinish = (values) => {
        api.userUpdate(values.user);
        console.log(values.user);
    };

    const ButtonStyle = {
        position:"absoulty",
        top:"10px",
        left:"1100px"
    };

    const Desstyle = {
        position:"absoulty",
        top:"100px",
        left:"350px"
    };

    const history = useHistory();
    const back = ()=> {
        history.push("/home")    
    }

    const [data, setData] = useState(store.getState());
    
    return (
        <div>
            <Button onClick={back} style={ButtonStyle}>返回</Button>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} style = {Desstyle}>
                <Form.Item name={['user', 'nickname']} label="昵称" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'password']} label="密码" rules={[{ required: true }]}>
                    <Input.Password
                        placeholder="input password"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item name={['user', 'email']} label="邮箱" rules={[{ type: 'email' }]}>
                    <Input />
                </Form.Item>
                
                <Form.Item name = {['user','gender']}label="性别">
                    <Select>
                        <Select.Option value="1">男</Select.Option>
                        <Select.Option value="0">女</Select.Option>
                        <Select.Option value="2">?</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name={['user', 'phone']} label="电话">
                    <Input />
                </Form.Item>
                
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
        
      );
}
export default UserInfo