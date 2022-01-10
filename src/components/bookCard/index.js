import React, {useState,useEffect}from 'react';
import { List, Avatar, Space,Search } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { serverUrl } from '../../config';
import axios from 'axios';
import HoverMessage from '../hoverMessage';
import HoverUpdate from '../hoverUpdate';
import BorrowBox from '../borrowBox';
import { Components } from 'antd/lib/date-picker/generatePicker';
import BookUpdate from '../bookUpdate';
import ImportFile from '../importFile';
import ImportBookFile from '../importBookFile'
import api from '../../util/api';
const HoverStyle = {
    position:"relative",
    top: "130px",
    left: "0px"
}
const ButtonStyle = {
    position:"relative",
    top: "130px",
    left: "10px"
}
function BookCard(props) {

    const [state,setState] = useState(props.data);
    const [button,setButton] = useState();

    const data = props.data;
    const [image, setImage] = useState([]);
    const [hover, setHover] = useState();
    const [isManage, setisManage] = useState(false);


    const IconText = ({ icon, text }) => (
        <>   
        </>
    );

    const listData = [];
    useEffect(() => {
        api.isManage().then((response)=>{
            setisManage(response.data);
        })
    }, [])
    


    for (let i = 0; i < state.length; i++) {
        let keyword = ''
        if(state[i].keyWord!=null){
            for(let j = 0; j< state[i].keyWord.length;j++){
                keyword+=" "+state[i].keyWord[j];
            }
        }
        

        listData.push({
            id: i,
            bookId: state[i].bookId,
            title: state[i].bookName,
            author: state[i].author,
            keyWord:keyword,
            description:state[i].description
        });
    }
    console.log(state)
    
    const onSearch = value => console.log(value);

    return(
        <div>
            <List
            itemLayout="vertical"
            size="large"
            pagination={{
            onChange: page => {
                console.log(page);
            },
            pageSize: 5,
            }}
            dataSource={listData}
            footer={
                <div>
                    {isManage?<ImportBookFile></ImportBookFile>:<></>}
                </div>
                }
            renderItem={item => (
            <List.Item
                key={item.id}
                actions={[
                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                ]}

                extra={
                <img
                    width={272}
                    alt="logo"
                    src={ serverUrl+"/file/getImage?id="+state[item.id].img}
                />
                }    
            >
                <HoverMessage style={HoverStyle} data={item.bookId}>详情</HoverMessage>
                {props.type==="Update"? <HoverUpdate style={HoverStyle} data={state[item.id]}>修改</HoverUpdate>
                        :<BorrowBox style={ButtonStyle} data={item.bookId}>借阅</BorrowBox>
                }
                <List.Item.Meta
                title={<a href={item.title}>{item.title}</a>}
                description={"作者:"+item.author+"\t "+"关键词:"+item.keyWord}
                />
                {"简介:"+item.description}
                
            </List.Item>
            
            )}
        />
        </div>
        
    );
}


export default BookCard;