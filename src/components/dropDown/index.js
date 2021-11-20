import React, {useState}from 'react';
import { Card,Button } from 'antd';
import { Descriptions } from 'antd';
import axios from 'axios';
import { serverUrl } from '../../config';
import api from '../../util/api';
import HoverMessage from '../hoverMessage';
import BorrowBox from '../borrowBox';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          all
        </a>
        
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          已归还
        </a>
        
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          未归还
        </a>
      </Menu.Item>
      
    </Menu>
  );

function DropDown(props){

    return(
        <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            筛选 <DownOutlined />
            </a>
        </Dropdown>
    );
}

export default DropDown;
