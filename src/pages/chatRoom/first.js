import React, { createElement, useState,useRef } from 'react';
import { Comment, Tooltip, Avatar,Button } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { Input } from 'antd';
import { serverUrl } from '../../config';
import { data } from 'autoprefixer';
import ChatHistory from '../../components/chatHistory';

const { TextArea } = Input;

function ChatRoom(props){

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
  
    const like = () => {
      setLikes(1);
      setDislikes(0);
      setAction('liked');
    };
  
    const dislike = () => {
      setLikes(0);
      setDislikes(1);
      setAction('disliked');
    };
  
    const actions = [
      <Tooltip key="comment-basic-like" title="Like">
        <span onClick={like}>
          {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
        </span>
      </Tooltip>,
      <Tooltip key="comment-basic-dislike" title="Dislike">
        <span onClick={dislike}>
          {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span className="comment-action">{dislikes}</span>
        </span>
      </Tooltip>,
      <span key="comment-basic-reply-to">Reply to</span>,
    ];

    const [message, setMessage] = useState("");
    
    const inputVal = useRef(null)

    const createWebsocket=()=>{
        var ws = new WebSocket("ws://"+"localhost:8002"+"/WebSocket/1");
        
        //监听是否连接成功
        ws.onopen = function () {
            console.log('ws连接状态：开启' + ws.readyState);
            //连接成功则发送一个数据
            ws.send(JSON.stringify("message"));
        }
        //接听服务器发回的信息并处理展示
        ws.onmessage = function (messages) {
            console.log('接收到来自服务器的消息：');
            console.log(messages.data);
            setMessage(messages.data)
        }
        //监听连接关闭事件
        ws.onclose = function () {
            //监听整个过程中websocket的状态
            console.log('ws连接状态：关闭' + ws.readyState);
        }
      
        ws.onerror = function (error) {
            console.log(error);
        }
        return ws;
    }

    const sendMessage = ()=>{
        let ws = createWebsocket();
        console.log(inputVal.current.resizableTextArea.textArea.value)
        let value = inputVal.current.resizableTextArea.textArea.value;
        let messages = JSON.stringify(value);
        //添加事件监听
        ws.addEventListener('open', function () {
            ws.send(messages)
        });
    }

    return (
        <>
            <Comment
                actions={actions}
                author={<a>Han Solo</a>}
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                content={
                    message
                }
                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                    </Tooltip>
                }
            />
            <TextArea ref={inputVal} rows={4} />
            <Button type="primary" onClick = {sendMessage}>Primary Button</Button>
        </>
      );
}

//export default ChatRoom