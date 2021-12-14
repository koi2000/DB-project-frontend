import { Descriptions, Badge, message } from 'antd';
import React,{useState,useEffect} from 'react';
import store from '../../store';
import { Form, Input, InputNumber, Button,Select,Modal } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import api from '../../util/api';
import { useHistory } from 'react-router';
import UserMessageForm from '../userMessageForm';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Option } = Select;
/* eslint-disable no-template-curly-in-string */

function UserAdd(props){

    const [userNow, setUserNow] = useState();

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
                <Button onClick={()=>{setModal2Visible(true)}}>新增</Button>
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
                <UserMessageForm style={{
                        position:"relative",
                        top:"0px"
                    }} ></UserMessageForm>
                </content>
                
            </Modal>    
        </div>    
    )
}
export default UserAdd