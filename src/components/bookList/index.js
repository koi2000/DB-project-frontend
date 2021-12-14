import React, {useState}from 'react';
import { Card,Button } from 'antd';
import { Descriptions } from 'antd';
import "./index.css"
import axios from 'axios';
import { serverUrl } from '../../config';
import api from '../../util/api';
import HoverMessage from '../hoverMessage';
import BorrowBox from '../borrowBox';
function BookList(props){

    const data = props.data;
    const [image, setImage] = useState();
    const [hover, setHover] = useState();
    const HoverStyle = {
        position:"relative",
        top: "-350px",
        left: "300px"
    }
    const ButtonStyle = {
        position:"relative",
        top: "-350px",
        left: "310px"
    }
    axios.get(serverUrl+"/file/getImage",{
        params:{
            id:data.img
        },
        responseType: "arraybuffer",
    }).then(response => {
        return 'data:image/png;base64,' + btoa(
            new Uint8Array(response.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
    }).then(data => {
        console.log(data)
        setImage(data)
    })
    
    return(
        <div class = "box">
            {hover}
            <Card
                hoverable
                style={{ width: 250 ,height:250}}
                cover={<img alt="Not Found" src = {image} style={{ width: 250 ,height:250}}/>}
                class="card"
            >
            </Card>
            <div class = "UserInfo">
                <Descriptions>
                    <br/><br/><br/>
                    <Descriptions.Item label="书籍名称">{data.bookName}</Descriptions.Item>
                    <br/><br/>
                    <Descriptions.Item label="书籍作者">{data.author}</Descriptions.Item>
                    <br/><br/>
                    <Descriptions.Item label="关键词">{data.keyWord}</Descriptions.Item>
                </Descriptions>
            </div>


            <HoverMessage style={HoverStyle} data={props.data}>详情</HoverMessage>
            <BorrowBox style={ButtonStyle} data={props.data}>借阅</BorrowBox>
        </div>
    )
}

export default BookList;