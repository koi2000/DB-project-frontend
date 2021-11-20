import { Modal, Button,Descriptions } from 'antd';
import React, {useState}from 'react';
import api from '../../util/api';
function HoverMessage(props) {

    const style = props.style
    const data = props.data; 
    const [modal1Visible,setmodal1Visible] = useState(false)
    const [modal2Visible,setmodal2Visible] = useState(false)

    const [bookDetail,setBookDetail] = useState({
        bookName:""
    })
    
    const setModal1Visible=(modal1Visible)=> {
        setmodal1Visible(modal1Visible);
    }

    const setModal2Visible=(modal2Visible)=> {
        queryDetail();
        setmodal2Visible(modal2Visible);
    }

    const queryDetail = ()=>{
        const params={
            bookId:data.bookId
        }
        console.log(data);
        let param = [];
        api.getDetail(params).then((response)=>{
            console.log(response)
            param = response.data.data
            console.log(param)
            setBookDetail(param);
        })
    }
    return (
        <>
        <Button style = {style} type="primary" onClick={() => setModal2Visible(true)}>
            详情
        </Button>
        <Modal
            title="书籍详情"
            centered
            visible={modal2Visible}
            onOk={() => setModal2Visible(false)}
            onCancel={() => setModal2Visible(false)}
        >
            <Descriptions>
                    <br/><br/><br/>
                    <Descriptions.Item label="书籍名称">{bookDetail.bookName}</Descriptions.Item>
                    <br/><br/>
                    <Descriptions.Item label="书籍作者">{bookDetail.author}</Descriptions.Item>
                    <br/><br/>
                    <Descriptions.Item label="书籍描述">{bookDetail.description}</Descriptions.Item>
                    <br/><br/>
                    <Descriptions.Item label="书籍数量">{bookDetail.number}</Descriptions.Item>
            </Descriptions>
            
        </Modal>
        </>
    );
}

export default HoverMessage;