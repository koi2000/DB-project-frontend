import { Descriptions, Badge, message } from 'antd';
import React,{useState,useEffect} from 'react';
import store from '../../store';
import { Form, Input, InputNumber, Button,Select,Modal,Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import api from '../../util/api';
import { useHistory } from 'react-router';
import UserMessageForm from '../userMessageForm';
import { UploadOutlined } from '@ant-design/icons';
import 'element-theme-default';
import axios from 'axios';
import { serverUrl } from '../../config';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Option } = Select;
/* eslint-disable no-template-curly-in-string */

function ImportFile(props){

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

    const downloadTemplate = ()=>{
        //url:api地址
        //params:参数
        axios.get(serverUrl+"/manage/user/download/template",  {
            responseType: 'blob'
        }).then((res) =>{
            
            //debugger
            let blob = new Blob([res.data], { type: 'application/xlsx' })
            
            let url = window.URL.createObjectURL(blob)
            const link = document.createElement('a') // 创建a标签
            link.href = url
            link.download = '用户导入模板.xlsx' // 重命名文件
            link.click()
            URL.revokeObjectURL(url)
        })
    }

    const downloadUser = ()=>{
        //url:api地址
        //params:参数
        axios.get(serverUrl+"/manage/user/download/user",  {
            responseType: 'blob'
        }).then((res) =>{
            
            //debugger
            let blob = new Blob([res.data], { type: 'application/xlsx' })
            
            let url = window.URL.createObjectURL(blob)
            const link = document.createElement('a') // 创建a标签
            link.href = url
            link.download = '用户.xlsx' // 重命名文件
            link.click()
            URL.revokeObjectURL(url)
        })
    }

    const setModal2Visible=(modal2Visible)=> {
        setmodal2Visible(modal2Visible);
    }

        return (
            <div>
                <Button onClick={()=>{setModal2Visible(true)}}>导入</Button>
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
                    <Upload
                        action={serverUrl+"/manage/user/importUser"}
                        listType="picture"
                        maxCount={1}
                        accept=".xls,.xlsx"
                        withCredentials={true}>
                        <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
                    </Upload>

                    <Button onClick={downloadTemplate}>下载模板</Button>
                    <Button onClick={downloadUser}>导出</Button>
                </content>
                
            </Modal>    
        </div>    
    )
}
export default ImportFile