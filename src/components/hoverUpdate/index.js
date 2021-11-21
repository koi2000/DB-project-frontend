import { Modal, Button,Descriptions } from 'antd';
import React, {useState}from 'react';
import api from '../../util/api';
import UploadBook from '../uploadBook';

function HoverUpdate(props) {

    const style = props.style
    const data = props.data; 
    const [modal1Visible,setmodal1Visible] = useState(false)
    const [modal2Visible,setmodal2Visible] = useState(false)

    const [bookDetail,setBookDetail] = useState({
        bookName:""
    })

    const hoverStyle = {
        position:"relative",
        top:"0px"
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
            修改
        </Button>
        <Modal
            title="修改"
            centered
            visible={modal2Visible}
            onOk={() => setModal2Visible(false)}
            onCancel={() => setModal2Visible(false)
            }
            width="700px"
            
        >
            <content>
                <UploadBook style = {hoverStyle} data = {data}/>
            </content>
             
        </Modal>
        </>
    );
}

export default HoverUpdate;