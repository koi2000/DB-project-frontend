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



function DefaultList(props){
    
    const data = props.data;
    const [state,setState] = useState(data);
   
    return(
        <>
            <Descriptions title="违约记录">
                <Descriptions.Item label="违约时间">{data.time}</Descriptions.Item>
                <Descriptions.Item label="违约原因">{data.reason}</Descriptions.Item>
                <Descriptions.Item label="应缴金额">{data.price}</Descriptions.Item>
                
            </Descriptions>
        </>
    )
}

export default DefaultList;