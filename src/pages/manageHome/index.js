import { Layout, Menu, Dropdown,Button,message } from 'antd';
import React from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import DropButton from '../../components/dropButton';
import BookList from '../../components/bookList';
import BorrowList from '../../components/borrowList';
import DropDown from '../../components/dropDown';
import api from '../../util/api';
import { DownOutlined } from '@ant-design/icons';
import DefaultList from '../../components/defaultList';
import UploadBook from '../../components/uploadBook';
import BookUpdate from '../../components/bookUpdate';
import BookCard from '../../components/bookCard';
import UserList from '../../components/userList';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


function ManageHome (props) {
  
    const [collapsed,setCollapsed] = useState(false);
    const [bookLists, setBookLists] = useState([]);
    const [dropdown, setDropdown] = useState();

    const [borrowRow,setBorrowRow] = useState([]);
    
  
    const dropStyle = {
        position:"relative",
        top: "0px",
        right:"-1000px"
    }

    const buttonStyle = {
        position:"absoulty",
        top: "0px",
        right:"0px"
    }
    

    const onCollapse = (collapsed) => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };

    function handleMenuClick(e) {
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
                let bookList = []
                console.log("ss"+responseData.length);
                bookList.push(
                    <BookCard data = {responseData} type={"Update"}/>
                )
                /*for (let i = 0; i < responseData.length; i+=1) {  // for循环数组
                    console.log(responseData[i]);
                    bookList.push(  //将组件塞入定义的数组中
                        <BookUpdate data={responseData[i]} isShow = {1}/>
                    );
                }*/
                setBookLists(bookList);
            })
        }
        if(e.key==='2'){
            setBookLists(
                <UploadBook style={{
                  position:"absoulty",
                  top:"250px",
                  left:"400px"
                }}/>
            )
        }
        if(e.key==='3'){
            console.log("发出")
            let responseData = []
            let param = {
                reqDTO: {
                    pageNow:0,
                    pageSize:10
                }
            }
            api.getUserList(param).then((response)=>{
                responseData = response.data
                console.log(responseData)
                
            }).then((response)=>{
                let bookList = []
                
                bookList.push(
                    <UserList data = {responseData}></UserList>
                )
                setBookLists(bookList);
            })
        }
      }
      
      return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} >
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleMenuClick}style={{height:"3500px"}}>
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                图书列表
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
                上传图书
              </Menu.Item>
              <Menu.Item key="3" icon={<FileOutlined />}>
                用户管理
              </Menu.Item>
            </Menu>
          </Sider>


          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} >
                <DropButton class = "dropbutton" style={dropStyle}/>
            </Header>
            <Content style={{ margin: '0 16px',height:"1500px" }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                {bookLists}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      );
  
}
export default ManageHome;