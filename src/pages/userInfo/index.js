import { Descriptions, Badge } from 'antd';
import React,{useState} from 'react';
import store from '../../store';


function UserInfo(props) {

    
    const Desstyle = props.style;
    
    //const [data, setData] = useState(props.location.state.data);
    //console.log(data)
    const [data, setData] = useState(store.getState());
    //console.log(store.state);
    return(
        <div className={'userInfo'} style = {Desstyle}>
            <Descriptions title="User Info" bordered >
                <Descriptions.Item label="Product">{data.nickname}</Descriptions.Item>
                <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
                <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
                <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
                <Descriptions.Item label="Usage Time" span={2}>
                2019-04-24 18:00:00
                
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                <Badge status="processing" text="Running" />
                </Descriptions.Item>
                <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                <Descriptions.Item label="Config Info">
                Data disk type: MongoDB
                <br />
                Database version: 3.4
                <br />
                Package: dds.mongo.mid
                <br />
                Storage space: 10 GB
                <br />
                Replication factor: 3
                <br />
                Region: East China 1<br />
                </Descriptions.Item>
            </Descriptions>
        </div>
    );
}
export default UserInfo