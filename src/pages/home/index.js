import { Layout, Menu, Breadcrumb, Dropdown,Button,message } from 'antd';
import React from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useState,useEffect } from 'react';

import './style.less'
import DropButton from '../../components/dropButton';
import BookList from '../../components/bookList';
import BookCard from '../../components/bookCard';
import BorrowList from '../../components/borrowList';
import DropDown from '../../components/dropDown';
import api from '../../util/api';
import { DownOutlined } from '@ant-design/icons';
import DefaultList from '../../components/defaultList';
import { useHistory } from 'react-router';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


function Home (props) {
  
    const [collapsed,setCollapsed] = useState(false);
    const [bookLists, setBookLists] = useState([]);
    const [dropdown, setDropdown] = useState();

    const [borrowRow,setBorrowRow] = useState([]);
    
    const history = useHistory();

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

    useEffect(()=>{
        getBookList();
    },[])

    function getBookList(){
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
            bookList.push(
                <BookCard data = {responseData}></BookCard>
            )
            /*
            console.log("ss"+responseData.length);
            for (let i = 0; i < responseData.length; i+=1) {  // for循环数组
                console.log(responseData[i]);
                bookList.push(  //将组件塞入定义的数组中
                    <BookCard/>
                    //<BookList data={responseData[i]}/>
                );
            }*/
            setBookLists(bookList);
        })
    }

    function handleMenuClick(e) {
        console.log('click', e.key);
        if(e.key==='1') {
            setDropdown(null);
            getBookList();
        }
        if(e.key==='2'){
            setBookLists(null)
            setDropdown(
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                筛选 <DownOutlined />
                </a>
            </Dropdown>);
            setBorrowList({pageNow:0,
                pageSize:10,
                type:"UNFINISH"})
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
        if(e.key==='4'){
            history.push("/chatRoom")
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
        }).then((response)=>{
            for (let i = 0; i < responseData.length; i+=1) {  // for循环数组
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
                    bookList.push(  
                        //将组件塞入定义的数组中
                        <div key={i}>
                            <BorrowList data={responseData[i]}/>
                        </div>
                    );
                }
                
            }
            setBookLists(bookList);
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
            
              <Menu.Item key="4" icon={<FileOutlined />}>
                聊天室
              </Menu.Item>

            </Menu>
          </Sider>


          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} >
                <DropButton class = "dropbutton" style={dropStyle}/>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                {dropdown}
                {bookLists}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>图书信息管理系统 ©2021 Created by koi2000</Footer>
          </Layout>
        </Layout>
      );
  
}
export default Home;