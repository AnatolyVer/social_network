import React from 'react';
import verify from "@shared/images/verify.svg";

const VerifiedImage = ({visible = false}:{visible?:boolean}) => {
    return (
        <>
            {visible && <img style={{width:'25px', marginLeft:'5px', marginTop:'5px'}} src={verify} alt=""/>}
        </>
    );
};

export default VerifiedImage;