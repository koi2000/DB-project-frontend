import { Modal, Button,Descriptions, message } from 'antd';
import React, {useState,useEffect}from 'react';
import api from '../../util/api';
import { DatePicker, Space } from 'antd';
import { data } from 'autoprefixer';

const { RangePicker } = DatePicker;

function ReBorrowBox(props) {

    const style = props.style
    const id = props.id; 
    const [modal2Visible,setmodal2Visible] = useState(false)
    const [params,setParams] = useState({
        borrowHistoryId:id
    })
    const [borrowDetail,setBorrowDetail] = useState({})

    const queryDetail = ()=>{
        const params={
            borrowHistoryId:id
        }
        api.getBorrowHistory(params).then((response)=>{
            setBorrowDetail(response.data)
        })
    }
    useEffect(() => {
        console.log(props)
        queryDetail()
    }, [])
    

    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        let params = {
            borrowHistoryId:id,
            newDate:dateString
        }
        console.log(params);
        setParams(params);
    }

    const onOk = ()=> {
        console.log("这里")
        //console.log(value)
        //console.log(dateString)
        //console.log("ok")
        //console.log(params)
        /*let params = {
            borrowHistoryId:id,
            newDate:dateString
        }*/
        setModal2Visible(false)
        api.reBorrow(params).then((response)=>{
            message.success("续借成功")
        }).catch(err=>{
            message.error(err);
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
        console.log(value)
        console.log("ok")
    }

    return (
        <>
        <Button style = {style} type="primary" onClick={borrow}>
            续借
        </Button>

        
        <Modal
            title="书籍信息"
            centered
            visible={modal2Visible}
            onOk={onOk}
            onCancel={() => setModal2Visible(false)}
        >
            <Space direction="vertical" size={12}>
                <DatePicker  
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                onChange={onChange} onOk={onOkTime} />
            </Space>
        </Modal>
        </>
    );
}

export default ReBorrowBox