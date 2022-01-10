import React, { createElement, useState,useRef,useEffect  } from 'react';
import { Comment, Tooltip, Avatar,Button, message } from 'antd';
import { Input,Card,Modal } from 'antd';
import { List, Skeleton, Divider } from 'antd';
import api from '../../util/api';
import VirtualList from 'rc-virtual-list';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';

function ChatHistory(props) {
    
    const [messageList, setMessageList] = useState();
    const [nowUser, setNowUser] = useState(props.nowUser);
    const [chatUser, setChatUser] = useState(props.chatUser);
    const ContainerHeight = 400;

    const [modal2Visible,setmodal2Visible] = useState(false)

    useEffect(() => {
        readHistory(props.chatUser);
    }, []);

    const setModal2Visible=(modal2Visible)=> {
        setmodal2Visible(modal2Visible);
    }

    const onScroll = e => {
        if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
            //appendData();
        }
    };


    const readHistory = (chatUser)=>{
        console.log(chatUser)
        
        api.getChatUser().then((response)=>{
            console.log(response)
            console.log(response.data)
            const data = {
                "chatUser":response.data
            }
            if(chatUser===undefined&&data.chatUser===""){
                message.error("请先选择聊天对象")
                return;
            }else{
                console.log(data);
                api.chatHistory(data).then((response)=>{
                    console.log(response.data);
                    setMessageList(response.data)
                    setModal2Visible(true)
                    console.log("创建了");
                })
            }
        })
    }

    return (
        <div>
            <Button onClick={o=>{
                setModal2Visible(true)
            }}>查看历史记录</Button>
            <Modal
            title="历史记录"
            centered
            visible={modal2Visible}
            onOk={() => setModal2Visible(false)}
            onCancel={() => setModal2Visible(false)}
            >
                <Card>
                    <List>
                        <VirtualList
                            data={messageList}
                            height={ContainerHeight}
                            itemHeight={47}
                            //itemKey="email"
                            onScroll={onScroll}
                        >
                            {item => (
                                <List.Item >
                                    <Chip avatar={<Avatar>R</Avatar>} label={item.fromUser} style={{
                                    }}/>
                                    {item.fromUser===nowUser?<Alert severity="success">{item.text}</Alert>:
                                    <Alert severity="info">{item.text}</Alert>}
                                </List.Item>
                            )}
                        </VirtualList>
                    </List>
                </Card>
            </Modal>    
        </div>
    );
}
export default ChatHistory
  