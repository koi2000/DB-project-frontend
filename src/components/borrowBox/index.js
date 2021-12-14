import { Modal, Button,Descriptions, message } from 'antd';
import React, {useState,useEffect}from 'react';
import api from '../../util/api';
import { DatePicker, Space } from 'antd';
import { data } from 'autoprefixer';

const { RangePicker } = DatePicker;

function BorrowBox(props) {

    const style = props.style
    const data = props.data; 
    const [modal2Visible,setmodal2Visible] = useState(false)
    const [params,setParams] = useState({})
    const [bookDetail,setBookDetail] = useState({
        bookName:""
    })

    const queryDetail = ()=>{
        console.log(data)
        const params={
            bookId:data
        }
        console.log(data);
        let param = [];
        api.getDetail(params).then((response)=>{
            //console.log(response)
            param = response.data.data
            console.log(param)
            setBookDetail(param);
        })
    }
    useEffect(() => {
        queryDetail()
    }, [])
    

    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        let params = {
            bookId:data,
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
            title="书籍信息"
            centered
            visible={modal2Visible}
            onOk={onOk}
            onCancel={() => setModal2Visible(false)}
        >
            <Descriptions>
                    <Descriptions.Item label="书籍名称">{bookDetail.bookName}</Descriptions.Item>
                    <br/><br/>
                    <Descriptions.Item label="书籍作者">{bookDetail.author}</Descriptions.Item>
                    <br/><br/>
                    <Descriptions.Item label="书籍描述">{bookDetail.description}</Descriptions.Item>
                    <br/><br/>
                    <Descriptions.Item label="书籍数量">{bookDetail.number}</Descriptions.Item>
            </Descriptions>

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