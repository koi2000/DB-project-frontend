import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import api from '../../util/api';
import store from '../../store';
import {saveAction} from "../../action/index"


function DropButton(props){
      
      function handleMenuClick(e) {
        //message.info('Click on menu item.');
        console.log('click', e.key);
        if(e.key==='1') {
            console.log(props)
            api.logout();
        }
        if(e.key==='2'){

          props.props.history.push('/profile')
          //const action  = saveAction();
          //console.log(store)
          //store.dispatch(action)
          //let res = store.getState();
          //console.log(res)
          /*
            api.getProfile().then((response)=>{
              console.log(response);
              let data = response.data;
              //console.log(data)
              //props.props.history.push("/profile",{data:da});
              props.props.history.push({ pathname: '/profile',state:{data:data}})  
            })*/
            
           //console.log(props.props.history)
           //props.props.history.push("/profile",{})
        }
        if(e.key==='3'){
          props.props.history.push('/chatRoom')
        }
      }
    
    const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            louout
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            profile
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            chat
          </Menu.Item>
        </Menu>
    );

    return (
        <div style={props.style}>
            <Dropdown overlay={menu} >
                <Button>
                    Here <DownOutlined />
                </Button>
            </Dropdown>
        </div>
        
    );
}

export default DropButton;

