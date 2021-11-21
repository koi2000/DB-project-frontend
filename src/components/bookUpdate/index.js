import React, {useState}from 'react';
import { Card,Button } from 'antd';
import { Descriptions } from 'antd';
import axios from 'axios';
import { serverUrl } from '../../config';
import api from '../../util/api';
import HoverMessage from '../hoverMessage';
import BorrowBox from '../borrowBox';
import { shallowEqual } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import HoverUpdate from '../hoverUpdate';
function BookUpdate(props){

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
    if(data.img!==null){
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
    }
    

    const keyWord = [];

    return(
        <div class = "box">
            
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
            <HoverUpdate style={HoverStyle} data={props.data}>修改</HoverUpdate>
            {/*<Button style={ButtonStyle} data={props.data} >修改</Button>*/}
        </div>
    )
}

export default BookUpdate;