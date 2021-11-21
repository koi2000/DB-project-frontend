import { Layout, Menu, Breadcrumb, Dropdown,Button,message } from 'antd';
import React from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

import './style.less'
import DropButton from '../../components/dropButton';
import BookList from '../../components/bookList';
import BorrowList from '../../components/borrowList';
import DropDown from '../../components/dropDown';
import api from '../../util/api';
import { DownOutlined } from '@ant-design/icons';
import DefaultList from '../../components/defaultList';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


function Home (props) {
  
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
    const menu = (
        <Menu>
            <Menu.Item onClick={()=>{
                    setBorrowList({
                        pageNow:0,
                        pageSize:10
                    })
                }}>
                <div>
                all
                </div>
            </Menu.Item>

            <Menu.Item onClick={()=>{
                    setBorrowList({
                        pageNow:0,
                        pageSize:10,
                        type:"FINISH"
                    })
                }}>
                <div>
                已归还
                </div>
            </Menu.Item>

            <Menu.Item onClick={()=>{
                    setBorrowList({
                        pageNow:0,
                        pageSize:10,
                        type:"UNFINISH"
                    })
                }}>
                <div>
                未归还
                </div>
            </Menu.Item>
        
        </Menu>
    );

    const onCollapse = (collapsed) => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };

    function handleMenuClick(e) {
        console.log('click', e.key);
        if(e.key==='1') {
            setDropdown(null);
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
            setBookLists(null)
            setDropdown(
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                筛选 <DownOutlined />
                </a>
            </Dropdown>);
        }
        if(e.key==='3'){
            setBookLists(null)
            setDropdown(null);
            const data = {
                pageNow:0,
                pageSize:10
            }
            let responseData = []
            api.getDefaultList(data).then((response)=>{
                responseData = response.data.rows
            }).then((response)=>{
                let bookList = []
                //console.log("ss"+responseData.length);
                for (let i = 0; i < responseData.length; i+=1) {  // for循环数组
                    console.log(responseData[i]);
                    bookList.push(  //将组件塞入定义的数组中
                        <DefaultList data={responseData[i]}/>
                    );
                }
                setBookLists(bookList);
            })
        }
      }
      var responseData = []
      const returnBook = (e)=>{
        console.log(e)
        console.log("cs"+responseData[e].borrowHistoryId)
        api.returnBook({
            borrowHistoryId:responseData[e].borrowHistoryId
        }).then((response)=>{
            setBorrowList({
                pageNow:0,
                pageSize:10
            });
            message.success("还书成功")
        })
      }

      const change = (data) =>{
        return setBorrowRow(data => {
            console.log("内部")
            console.log(data)
            return data;
        });
      }
      const setBorrowList = (data)=>{

        setBookLists(null);
        
        let bookList = []
        api.getBorrowList(data).then((response)=>{
            responseData = response.data.rows
            //console.log(responseData)
            //let er = change(responseData);
        }).then((response)=>{
            for (let i = 0; i < responseData.length; i+=1) {  // for循环数组
                //console.log("驻足"+responseData[i]);
                if(responseData[i].realTime===null){
                    bookList.push(  //将组件塞入定义的数组中
                        <div key={i}>
                            <BorrowList data={responseData[i]}/>
                            <Button style={buttonStyle} onClick={
                                o=>{
                                    returnBook(i)
                                }
                            }>归还</Button>
                        </div>
                    );
                }else{
                    bookList.push(  //将组件塞入定义的数组中
                        <div key={i}>
                            <BorrowList data={responseData[i]}/>
                        </div>
                    );
                }
                
            }
            setBookLists(bookList);
            /*setBorrowRow(responseData => {
                console.log("内部")
                console.log(responseData)
                return responseData;
            });*/
        })
      }

      return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleMenuClick}>
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                图书列表
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
                借阅记录
              </Menu.Item>

              <Menu.Item key="3" icon={<FileOutlined />}>
                违约记录
              </Menu.Item>


              <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                <Menu.Item key="9">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9" icon={<FileOutlined />}>
                Files
              </Menu.Item>
            </Menu>
          </Sider>


          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} >
                <DropButton class = "dropbutton" style={dropStyle}/>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              {/*<Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>*/}
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                {dropdown}
                {bookLists}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      );
  
}
export default Home;