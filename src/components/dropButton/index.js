import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import api from '../../util/api';
import store from '../../store';
import {saveAction} from "../../action/index"
import { useHistory } from 'react-router';


function DropButton(props){
      
  const history = useHistory();
      function handleMenuClick(e) {
        //message.info('Click on menu item.');
        console.log('click', e.key);
        if(e.key==='1') {
            console.log(props)
            api.logout();
        }
        if(e.key==='2'){
          history.push('/profile')
        }
        if(e.key==='3'){
          history.push('/chatRoom')
        }
        if(e.key==='4'){
          history.push("/manage")
        }
      }
    
    const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Louout
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            Chat
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            Manage
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

