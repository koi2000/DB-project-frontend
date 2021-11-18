import { Carousel, Radio } from 'antd';
import React from 'react';
import png09 from "../../asserts/img/9.png"
import png10 from "../../asserts/img/10.png"
import png11 from "../../asserts/img/11.png"

const contentStyle = {
    height: '170px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
const imgStyle = {
    //height: '200px',
    color: '#ffff',
    textAlign: 'center',
    background: '#364d79',
    position: 'relative',
    left:'100px',
    top: '10px'
};

const Headers = () => {
  const [dotPosition, setDotPosition] = React.useState('bottom');

  const handlePositionChange = ({ target: { value } }) => {
    setDotPosition(value);
  };

  return (
    <div className={'header'}>
      {/*<Radio.Group onChange={handlePositionChange} value={dotPosition} style={{ marginBottom: 8 }}>
        <Radio.Button value="top">Top</Radio.Button>
        <Radio.Button value="bottom">Bottom</Radio.Button>
        <Radio.Button value="left">Left</Radio.Button>
        <Radio.Button value="right">Right</Radio.Button>
  </Radio.Group>*/}


      <Carousel dotPosition={dotPosition}>
        <div style ={contentStyle}>
            {/*<img src={logo} alt='logo'/>*/}
            <h3 style={contentStyle}>1</h3>
        </div>
        
        <div>
          {/*<h3 style={contentStyle}></h3>*/}
          {/*<img src={png10} alt='logo' style={imgStyle}/>*/}
          <h3 style={contentStyle}>2</h3>
        </div>
        
        <div>   
          {/*<h3 style={contentStyle}></h3>*/}
          {/*<img src={png11} alt='logo'style={imgStyle}/>*/}
          <h3 style={contentStyle}>3</h3>
        </div>

      </Carousel>
    </div>
  );
};
export default Headers
