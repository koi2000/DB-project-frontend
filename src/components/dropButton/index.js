import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import {React,useState,useEffect} from 'react';
import api from '../../util/api';
import store from '../../store';
import {saveAction} from "../../action/index"
import { useHistory } from 'react-router';


function DropButton(props){
  
      const [state, setstate] = useState("");

      useEffect(()=>{
        let user = store.getState()
        
        let flag = 0
        console.log(user)
        if(user.roles===''||user.roles===null){
          flag = 0;
        } else {
          console.log(user.roles)
          for(let i = 0;i< user.roles.length;i++){
            if(user.roles[i]==='admin'){
               flag = 1;
            }
          }
        }
        if(flag===1){
          
        }
        setstate(<Menu.Item key="3" icon={<UserOutlined />}>
            Manage
          </Menu.Item>)
      },[])
      
      const history = useHistory();


      function handleMenuClick(e) {
        console.log('click', e.key);
        if(e.key==='1') {
            console.log(props)
            api.logout();
        }
        if(e.key==='2'){
          history.push("/profile")
        }
        if(e.key==='3'){
          console.log(store.getState())
          let user = store.getState()
          var role = user.roles;
          var flag = 0;
          api.isManage().then((response)=>{
            console.log(response)
            if(response.data){
              history.push("/manage")
            }else{
              message.error("用户无权限");
            }
        })
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
        
          {state}
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

