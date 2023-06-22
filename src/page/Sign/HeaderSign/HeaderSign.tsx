import React from 'react';
import classes from "./styles.module.scss";
import {Box, LinearProgress} from "@mui/material";

interface HeaderSignProps{
    page: number,
    progress:number
}

const HeaderSign = ({page, progress}:HeaderSignProps) => {
    return (
        <div className={classes.Header} >
            <p className={`${classes.Title}`}>Реєстрація</p>
            <p className={`${classes.Steps}`}>{`${page}/2`}</p>
            <Box  sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={progress} />
            </Box>
        </div>
    );
};

export default HeaderSign;