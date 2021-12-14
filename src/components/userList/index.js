import React,{useState} from 'react';
import { List, Avatar, Space,Descriptions,Button,Popconfirm, message } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import UserUpdate from '../userUpdate';
import UserAdd from '../userAdd';
import api from '../../util/api';
import ImportFile from '../importFile';

function UserList(props){


    const [data,setData] = useState(props.data);

    const [hover,setHover] = useState();
    const listData = [];
    function add(){

    }

    function update() {
        //setHover(<UserInfo></UserInfo>)
        
    }

    function imports(){

    }

    function deleteUser(username){

        let params = []
        params.push(username);
        console.log(params)
        api.deleteUser(params).then(()=>{
            message.success("删除成功")
        })
    }

    for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        listData.push({
            href: data[i].username,
            title: data[i].username,
            avatar: 'https://joeschmoe.io/api/v1/random',
            description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content:
            <div>
                <Descriptions>
                        <Descriptions.Item label="用户昵称">{data[i].nickname}</Descriptions.Item>
                        <Descriptions.Item label="用户电话">{data[i].phone}</Descriptions.Item>
                        <Descriptions.Item label="用户邮箱">{data[i].email}</Descriptions.Item>
                        <Descriptions.Item label="用户身份">
                            {data[i].roles.map(role=>(
                                <Button type="link" style={{
                                    "position":"relative",
                                    "top":"-6px",
                                    "left":"-10px"
                                }}>{role}</Button>
                            ))}
                        </Descriptions.Item>
                        
                </Descriptions>
                
               <UserUpdate userId = {data[i].userId} username = {data[i].username}></UserUpdate>
               <Popconfirm title="确定要删除该用户吗" okText="是" cancelText="否" onConfirm={o=>deleteUser(data[i].username)} style={{
                   "position":"relative",
                   "top":"10px",
                   "left":"90px"
               }}>
                  <a href="#">Delete</a>
               </Popconfirm>
            </div>
        });
    }

    const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
    );

    return(
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
            onChange: page => {
                console.log(page);
            },
            pageSize: 3,
            }}
            dataSource={listData}
            footer={
            <div>
                <UserAdd></UserAdd>
                {/*<Button type="default" size="mini" onClick={add()}>新增</Button>*/}
                {/*<Button type="default" size="mini" onClick={imports()}>导入</Button>*/}
                <ImportFile></ImportFile>
            </div>
            }
            renderItem={item => (
            <List.Item
                key={item.title}
                /*actions={[
                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                ]}
                /*extra={
                <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
                }*/
            >
                <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
                />
                {item.content}
                
            </List.Item>
            )}
        />
    );
}

export default UserList;