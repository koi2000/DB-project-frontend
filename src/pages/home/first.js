import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import './style.less'
import DropButton from '../../components/dropButton';
import BookList from '../../components/bookList';
import api from '../../util/api';
import { useState } from 'react';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


function Home(props){

    const dropStyle = {
        position:"absolute",
        top: "4px",
        right: "50px"
    }

    const [bookLists, setBookLists] = useState([]);
    
    let bookList = []
    function handleMenuClick(e) {
        //message.info('Click on menu item.');
        console.log('click', e.key);
        if(e.key==='1') {
            const data = {
                pageNow:0,
                pageSize:10
            }
            let responseData = []
            api.getBookList(data).then((response)=>{
                responseData = response.data.rows
                console.log("sc"+responseData.length);
                console.log(responseData)
            }).then((response)=>{
                
                console.log("ss"+responseData.length);
                for (let i = 0; i < responseData.length; i+=1) {  // for循环数组
                    console.log(responseData[i]);
                    bookList.push(  //将组件塞入定义的数组中
                        <BookList data={responseData[i]}/>
                    );
                }
                setBookLists(bookList);
            })
        }
        if(e.key==='2'){
          
        }
        if(e.key==='3'){
          
        }
      }
    
    return(
        <Layout>
            <Header className="header">
                <div className="logo" />
                
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
                <DropButton style={dropStyle}/>
            </Header>
            <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            
            <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                <Sider className="site-layout-background" width={200}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                >
                    <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1" onClick = {handleMenuClick}>
                        <Menu.Item key="1">图书列表</Menu.Item>
                        <Menu.Item key="2">option2</Menu.Item>
                        <Menu.Item key="3">option3</Menu.Item>
                        <Menu.Item key="4">option4</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                        <Menu.Item key="5">option5</Menu.Item>
                        <Menu.Item key="6">option6</Menu.Item>
                        <Menu.Item key="7">option7</Menu.Item>
                        <Menu.Item key="8">option8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                        <Menu.Item key="9">option9</Menu.Item>
                        <Menu.Item key="10">option10</Menu.Item>
                        <Menu.Item key="11">option11</Menu.Item>
                        <Menu.Item key="12">option12</Menu.Item>
                    </SubMenu>
                </Menu>
                </Sider>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    {bookLists}
                </Content>
                
            </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
}

