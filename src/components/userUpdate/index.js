import { Descriptions, Badge, message } from 'antd';
import React,{useState,useEffect} from 'react';
import store from '../../store';
import { Form, Input, InputNumber, Button,Select,Modal } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import api from '../../util/api';
import { useHistory } from 'react-router';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Option } = Select;
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

function UserUpdate(props){

    const [userNow, setUserNow] = useState();
    const onFinish = (values) => {
        
        let user = values.user
        user.userId = props.userId;
        user.username = props.username;
        console.log("参数为")
        console.log(user)
        api.userUpdate(user).then((response)=>{
            message.info("修改成功");
        })
        console.log(values.user);
    };

    useEffect(() => {
        console.log(props.userId)
        let param = {
            "UserId":props.userId
        }
        api.getUserMessge(param).then((response)=>{
            console.log(response.data)
            var userNow = response.data
            setUserNow(userNow)
        })
    }, [])

    const ButtonStyle = {
        position:"absoulty",
        top:"10px",
        left:"1100px"
    };

    const Desstyle = {
        position:"relative",
        top:"10px",
        left:"20px"
    };

    const history = useHistory();
    const back = ()=> {
        history.push("/home")    
    }
    const [data, setData] = useState(store.getState());

    const [modal2Visible,setmodal2Visible] = useState(false)

    const hoverStyle = {
        position:"relative",
        top:"0px"
    }
    const setModal2Visible=(modal2Visible)=> {
        
        setmodal2Visible(modal2Visible);
    }

        return (
            <div>
                <Button onClick={()=>{setModal2Visible(true)}}>修改</Button>
                <Modal
                title="修改"
                centered
                visible={modal2Visible}
                onOk={() => setModal2Visible(false)}
                onCancel={() => setModal2Visible(false)
                }
                width="700px"
                >

                <content>
                    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} 
                        style = {Desstyle}
                        initialValues = {userNow}>
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

                        <Form.Item name={['user', 'role']} label="身份">
                        <Select mode="multiple" placeholder="请选择该用户的身份">
                            <Option value="user">user</Option>
                            <Option value="admin">admin</Option>
                            <Option value="superadmin">superadmin</Option>
                        </Select>
                        </Form.Item>
                       
                        
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </content>
                
            </Modal>    
        </div>    
    )
}
export default UserUpdate