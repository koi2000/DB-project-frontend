import { Alert } from 'antd';
import React from 'react';

const ErrorAlert = (props) => {

    const data = this.props.msg;

    return (
        <>
            <Alert
                message="Error"
                description={data}
                type="error"
                showIcon
            />
        </>
    );
}

export default ErrorAlert;