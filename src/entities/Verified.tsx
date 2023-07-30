import React from 'react';
import VerifiedIcon from "@mui/icons-material/Verified";

const Verified = ({verified}:{verified:boolean}) => {
    return (verified ? (
           <VerifiedIcon sx={{marginLeft:'5px', color:'#29ABE2'}}/>
        ):(
            <></>
        )
    );
};

export default Verified;