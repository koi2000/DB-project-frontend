import { Modal, Button,Descriptions, message } from 'antd';
import React, {useState}from 'react';
import api from '../../util/api';
import { DatePicker, Space } from 'antd';
import { data } from 'autoprefixer';

const { RangePicker } = DatePicker;

function BorrowBox(props) {

    const style = props.style
    const data = props.data; 
    const [modal2Visible,setmodal2Visible] = useState(false)
    const [params,setParams] = useState({})
    

    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        let params = {
            bookId:data.bookId,
            start:dateString[0],
            shouldTime:dateString[1]
        }
        console.log(params);
        setParams(params);
    }

    const onOk = ()=> {
        console.log("ok"+params)
        setModal2Visible(false)
        api.borrow(params).catch((err)=>{
            message.error(err)
        })
    }
    const setModal2Visible=(modal2Visible)=> {
        setmodal2Visible(modal2Visible);
    }


    const borrow = ()=>{
        console.log()
        setModal2Visible(true)
    }

    
    const onOkTime = (value)=>{
        console.log("ok"+value)
        
        //setModal2Visible(true)
    }

    return (
        <>
        <Button style = {style} type="primary" onClick={borrow}>
            借阅
        </Button>
        <Modal
            title="书籍详情"
            centered
            visible={modal2Visible}
            onOk={onOk}
            onCancel={() => setModal2Visible(false)}
        >
            
            <Space direction="vertical" size={12}>
                <RangePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                onChange={onChange}
                onOk={onOkTime}
                />
            </Space>
        </Modal>
        </>
    );
}

export default BorrowBox