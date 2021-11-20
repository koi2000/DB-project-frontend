import React,{useState} from 'react';
import Navicator from "../navicator";
import Headers from '../../components/header';
import UserInfo from '../userInfo';
import './style.less'
import DropButton from '../../components/dropButton';

const Desstyle ={
    position: 'absolute',
    top: '210px',
    right: '10px',
    left: '270px',
    bottom: '100px',
}

const ButtonStyle = {
    position: 'absolute',
    top: '175px',
    right: '10px',
}

function Home(props) {
    let [data,setData] = useState({
        name:"小度",
        type:"智能机器人"
     });

     //setData({name:"koi"});
    return (
        <>
            <Headers/>
            <div className={"box"}>
                <DropButton props={props}style={ButtonStyle}/>
                <Navicator data={data}/>
                {/*<UserInfo style = {Desstyle}/>*/}
            </div>
            
        </>
    );
}

//export default Home