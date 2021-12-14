import React,{useState} from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Select,
  } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import api from '../../util/api';
  const { Option } = Select;
    const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
    };
/* eslint-disable no-template-curly-in-string */

    let formStyle = {
        position:"absoulty",
        top:"250px",
        right:"400px"
    }

    const uploadStyle = {
        position:"absoulty",
        top:"150px",
        left:"400px"
    }

    
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
  
    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
    };
/* eslint-enable no-template-curly-in-string */

function UploadBook(props) {

    const [bookId,setBookId] = useState();
    /*const [initData,setInitData] = useState({

    });*/
    let initData = {
        author: "",
        bookId: "",
        bookName: "",
        description: "",
        number: 0,
        keyWord:[],
    }
    if(props.data!==undefined){
        console.log(props)
        if(props.data.bookId!==undefined){
           // setBookId(props.data.bookId)
           initData = props.data;
           console.log("初始"+initData)
           console.log(initData)
        }
    }
    const onFinish = (values) => {
        if(initData.bookId!==undefined&&initData.bookId!==null&&initData.bookId!==""){
            console.log(values)
            values.book["bookId"]=initData.bookId
            api.updateBook(values.book).then((response)=>{
                console.log(response.data);
                initData.bookId=response.data
            })
        }else{
            api.createBook(values.book).then((response)=>{
                console.log(response.data);
            })
            console.log(values.book);
        }
        
    };

    if(props.style!==null){
        formStyle=props.style
    }
    const [loading, setLoading] = useState(false)
    const [imageUrl,setImageUrl] = useState();
    

    const handleChange = info => {
        if (info.file.status === 'uploading') {
        setLoading(true);
        return;
        }
        if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl =>
            setImageUrl(imageUrl),
            setLoading(false)
        );
        }
    };

  
    const uploadButton = (
      <div style={uploadStyle}>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    const upload = (data)=>{
        let formData = new FormData();
        formData.append("file",data) 
        formData.append("bookId",initData.bookId); 
        api.uploadFile(formData).then(res => { 
            console.log("成功")
            message.success(
                "上传成功"
                );
          }).catch((err)=>{
            console.log("失败")
            message.error(
                "上传失败",
             );
          })     
        console.log(data)
    }

    const normFile = (e) => {
        console.log('Upload event:', e);
      
        if (Array.isArray(e)) {
          return e;
        }
      
        return e && e.fileList;
    };

    return (
        <div>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} style={formStyle}>
                <Form.Item
                    name={['book', 'bookName']}
                    label="书籍名称"
                    
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Input initvalue={initData.bookName}/>
                </Form.Item>

                <Form.Item
                    name={['book', 'author']}
                    label="书籍作者"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Input initvalue={initData.author}/>
                </Form.Item>
                <Form.Item
                    name={['book', 'keyWord']}
                    label="关键词"
                    rules={[
                    {
                        required: false,
                        message: '请选择对应的关键词',
                        type: 'array',
                    },
                    ]}
                >
                    <Select mode="multiple" placeholder="Please select favourite colors" defaultValue={initData.keyWord}>
                    <Option value="青春">青春</Option>
                    <Option value="孤独">孤独</Option>
                    <Option value="科普">科普</Option>
                    </Select>
                </Form.Item>
                
                <Form.Item
                    name={['book', 'classification']}
                    label="分类"
                    rules={[
                    {
                        required: false,
                        message: '请选择书籍分类',
                        type: 'array',
                    },
                    ]}
                >
                    <Select mode="multiple" placeholder="Please select favourite colors" >
                    <Option value="科普">科普</Option>
                    <Option value="文学">文学</Option>
                    <Option value="经典">经典</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name={['book', 'price']}
                    label="价格"
                    rules={[
                    {
                        type: 'number',
                        min: 0,
                    },
                    ]}
                >
                    <InputNumber defaultValue={initData.price}/>
                </Form.Item>

                <Form.Item
                    name={['book', 'number']}
                    label="数量"
                    rules={[
                    {
                        type: 'number',
                        min: 0,
                    },
                    ]}
                >
                    <InputNumber defaultValue={initData.number}/>
                </Form.Item>

                <Form.Item name={['book', 'description']} label="书籍简介">
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name={['book', 'image']}
                    label="封面"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra=""
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
               

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>  
        </div>

  );
};

export default UploadBook;