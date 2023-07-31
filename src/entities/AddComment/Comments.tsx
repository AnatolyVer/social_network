import React, {useState} from 'react';
import classes from "@page/FullPost/styles.module.scss";
import {Avatar} from "@mui/material";
import CustomTextField from "@shared/CustomTextField/CustomTextField";
import {IProfileInfo} from "@shared/TypesAndInterfaces/IProfileInfo";
import {useSelector} from "react-redux";
import {State} from "@redux/store";

const Comments = ({comments}:any) => {

    const user:IProfileInfo = useSelector((state:State) => state.user)
    const [comment, setComment] = useState('')

        return (
            <div>
                <div className={`${classes.Comments} `}>
                    {comments ? (
                        `Comments`
                    ) : (
                        `No comments`
                    )}

                </div>
                <div className={classes.AddComment}>
                    <Avatar alt={user?.nickname.toUpperCase()} src={`https://django-auth-gfm6.onrender.com` + user?.account_photo}/>
                    <CustomTextField value={comment} onChange={(e) => setComment(e.target.value)} label="Додайте комментар..."/>
                    <div className={classes.Add}>
                        Додати
                    </div>
                </div>
            </div>

    );
};

export default Comments;