import React, {useState}from 'react';
import { Card,Button, message } from 'antd';
import { Descriptions } from 'antd';
import axios from 'axios';
import { serverUrl } from '../../config';
import api from '../../util/api';
import HoverMessage from '../hoverMessage';
import BorrowBox from '../borrowBox';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';



function BorrowList(props){
    
    const data = props.data;
    const [state,setState] = useState(data);
    const [name,setName] = useState();
    const [btn,setBtn] = useState();
    const [flag,setFlag] = useState();

    const ButtonStyle = {
        position:"absoulty",
        top: "250px",
        left: "310px"
    }
    api.getBookName({
        bookId:data.bookId
    }).then((response)=>{
        //console.log(response)
        setName(response.data);
    })


    return(
        <>
            {btn}
            <Descriptions title="借阅记录">
                <Descriptions.Item label="书名">{name}</Descriptions.Item>
                <Descriptions.Item label="借书日期">{state.start}</Descriptions.Item>
                <Descriptions.Item label="应还日期">{state.shouldTime}</Descriptions.Item>
                <Descriptions.Item label="还书日期">{state.realTime}</Descriptions.Item>
            </Descriptions>
        </>
    )
}

export default BorrowList;