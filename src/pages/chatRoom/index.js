import React, { createElement, useState,useRef,useEffect  } from 'react';
import { Comment, Tooltip, Avatar,Button, message } from 'antd';
import moment from 'moment';
import { Input,Card } from 'antd';
import { serverUrl } from '../../config';
import { data } from 'autoprefixer';
import Chat from 'chat-react';
import store from '../../store';
import { List, Skeleton, Divider } from 'antd';
import api from '../../util/api';
import { useHistory } from 'react-router-dom';
import VirtualList from 'rc-virtual-list';
import Alert from '@mui/material/Alert';
import ChatHistory from '../../components/chatHistory';
import Chip from '@mui/material/Chip';

const { TextArea } = Input;

function ChatRoom(props) {
    const state = {
      inputValue: '',
      //messages: [],
      timestamp: new Date().getTime()
    }

    const [information, setInformation] = useState([]);
    const [user, setUser] = useState(store.getState());
    const [chatUser, setChatUser] = useState();
    const inputVal = useRef(null)
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [socket, setSocket] = useState();
    const [chatHistory, setchatHistory] = useState(<ChatHistory></ChatHistory>);
    const [visible, setVisible] = useState(false);

    const [messageList, setMessageList] = useState([]);

    const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
    const ContainerHeight = 400;

    const onScroll = e => {
        if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
            //appendData();
        }
    };

    const send = () =>{
        if (!chatUser) {
          message.error("请选择聊天对象")
          return;
        }
        let text = inputVal.current.resizableTextArea.textArea.value;
        console.log(inputVal.current.resizableTextArea.textArea.value)
        if (!text) {
            message.error("请输入内容")
        } else {
          if (typeof (WebSocket) == "undefined") {
            console.log("您的浏览器不支持WebSocket");
          } else {
            console.log("您的浏览器支持WebSocket");
            // 组装待发送的消息 json
            // {"from": "zhang", "to": "admin", "text": "聊天文本"}
            let msg = {from: user.username, to: chatUser, text: text}
            socket.send(JSON.stringify(msg));  // 将组装好的json发送给服务端，由服务端进行转发
            information.push({user: user.username, text: text})
            // 构建消息内容，本人消息
            createHtmlContent(null, user.nickname, text)
            text = '';
          }
        }
    };

    useEffect(() => {
        api.getProfile().then((response)=>{
            console.log(response.data)
            let nickname = response.data.nickname;
            setUser(response.data)
            init(nickname);
            setLoading(false);
        })
        
    }, []);

    const init = (nickname)=>{
        
        let username = nickname;
        
        if(typeof(WebSocket)=="undefined"){
            console.log("您的浏览器不支持websocket")
        }else{
            console.log("您的浏览器支持websocket")
        }
        console.log(user)
        let socketUrl = "ws://"+"localhost:8002"+"/websocket/"+username;
        let webSocket = new WebSocket(socketUrl);
        
        //打开websocket
        webSocket.onopen = function(){
            console.log("WebSocket已打开");
        }
        
        //获得消息事件
        webSocket.onmessage = function(msg){
            console.log("收到数据"+msg.data)
            let dataSource = JSON.parse(msg.data);
            //去除自己
            if(dataSource.users){
                let arr = dataSource.users.filter(user=> user.username !==username)
                setData(arr)
                setLoading(false)
            }else{
                 //如果发送的不是上述json，那么发送的就是文本内容
                api.getChatUser().then((response)=>{
                    if(dataSource.from === response.data){
                        information.push(dataSource)
                        createHtmlContent(response.data,null,dataSource.text)
                    }
                })
            }
        }

        webSocket.onclose = function(){
            console.log("websocket已关闭")
        }

        webSocket.onerror = function(){
            console.log("websocket出现错误")
        }
        setSocket(webSocket)
    }

    const createHtmlContent = (remoteUser,nowUser,text)=>{
        let isNow = false;
        let NowUser;
        // 当前用户消息
        console.log(text)
        const userMessage = {
            isNow:isNow,
            username:NowUser,
            text:text
        }
        setMessageList(messageList.concat(userMessage))
        console.log(messageList)
    }

    const selectUser = (username)=>{
        console.log("与他聊天")
        setChatUser(username)
        
        const userName = {
            chatUser:username
        }

        api.setChatUser(userName).catch((response)=>{
            message.error("选择用户出错");
        })
        console.log(chatUser);
    }

    const history = useHistory()
    const toHome = ()=>{
        history.push("/home")
    }

    return (
        <div>
            <ChatHistory nowUser = {user.nickname} chatUser = {chatUser}></ChatHistory>

            <Button onClick={toHome}>返回主界面</Button>
            
            <Card title="在线用户列表" style={{ 
                "width": "350px",
                "position":"absolute",
                "top":"100px",
                "left":"50px" 
            }}>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                <List.Item style={{
                    "width":"300px",
                    "height":"100px",
                    "position":"relative",
                    "top":"-30px",
                    "left":"0px"
                }}>
                    <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.username}
                    />
                    
                    <Button style = {{
                        "position":"relative",
                        "top":"5px",
                        "left":"-20px"
                    }} onClick={o=>{selectUser(item.username)}}>与他聊天</Button>

                    <Button type="link" size={"small"} style = {{
                        "position":"relative",
                        "top":"5px",
                        "left":"-18px"
                    }}>
                    {chatUser===item.username?"chatting":"no"}
                    </Button>
                </List.Item>
                )}
            />
            </Card>
        
            
            <Card title="聊天框"  style={{ 
                "position":"absolute",
                "top":"50px",
                "left":"500px",
                "width":"500px"
            }}>
                <List>
                    <VirtualList
                        data={messageList}
                        height={ContainerHeight}
                        itemHeight={47}
                        onScroll={onScroll}
                    >
                        {item => (
                            <List.Item >
                                <Chip avatar={<Avatar>R</Avatar>} label={item.username} style={{
                                }}/>
                                {item.isNow?<Alert severity="success">{item.text}</Alert>:
                                <Alert severity="info">{item.text}</Alert>}
                            </List.Item>
                        )}
                    </VirtualList>
                </List>
                
                <Comment
                    author={user.nickname}
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                    content={
                        ""
                    }
                    datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                        </Tooltip>
                    }
                />
                <TextArea ref={inputVal} rows={2} />
                <Button type="primary" onClick = {send}>发送</Button>
            </Card>
            
        </div>
    );
}
export default ChatRoom
  