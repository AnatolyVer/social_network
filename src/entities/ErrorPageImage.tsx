import React from 'react';
import error from "@shared/images/404.svg";

const ErrorPageImage = () => {
    return (
        <img style={{width:'500px', height:'500px'}} src={error} alt=""/>
    );
};

export default ErrorPageImage;