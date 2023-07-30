import React, {useState} from 'react';
import Loader from "@entities/Loader/Loader";
import classes from "./styles.module.scss";
import Header from "@layout/Header/Header";
import Footer from "@layout/Footer/Footer";
import {IFetch} from "@shared/TypesAndInterfaces/IFetch";
import {useDispatch, useSelector} from "react-redux";
import {State} from "@redux/store";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {createPost} from "@redux/action-creators";
import {useNavigate} from "react-router-dom";

const Posting = () => {

    const [content, setContent] = useState<string>('')
    const [photos, setPhotos] = useState<string[]>([])
    const [files, setFiles] = useState<File[]>([])

    const dispatch = useDispatch()
    const nav = useNavigate()

    const fetch:IFetch = useSelector((state:State) => state.fetch)
    const theme:string = useSelector((state:State) => state.theme)

    const RemoveImage = (index: number) => {
        setPhotos(prevState => prevState!.filter((_, i) => i !== index));
        setFiles(prevState => prevState!.filter((_, i) => i !== index));
    }

    const handleDrop = (event : React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const files = event.dataTransfer.files

        const imageUrls = Array.from(files).slice(0, (4 - photos.length)).map((file) => URL.createObjectURL(file))

        setPhotos(prevState => [...prevState, ...imageUrls])
        setFiles(prevState => [...prevState, ...Array.from(files).slice(0, (4 - photos.length))])
    }

    const handleClick = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const files = e.target.files;
        for (const file of Array.from(files!).slice(0, (4 - photos.length))) {
            if (file && file.type && file.type.startsWith('image/')) {
                const reader = new FileReader();

                const fileReadPromise = new Promise<string>((resolve, reject) => {
                    reader.onloadend = () => {
                        resolve(reader.result as string);
                    };
                    reader.onerror = reject;
                });
                reader.readAsDataURL(file);
                try {
                    const dataURL = await fileReadPromise;
                    setFiles(prevState => [...prevState, file]);
                    setPhotos(prevState => [...prevState, dataURL]);
                } catch (error) {
                    console.error('InvalidPage reading file:', error);
                }
            }
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }


    const send = () => {
        dispatch(createPost({content, photos:files, is_edited:false, reply_id:''}, nav))
    }

    return ( localStorage.getItem('nickname') ? (
            fetch.status !== 200 ? (
                <Loader/>
            ) : (
                <div className={classes.Posting}>
                    <Header/>
                    <div className={`${classes.Content} ${theme}Text`}>
                        <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                            <div>
                                <p className={classes.Title}>Додати пост</p>
                                <label>Зміст</label>
                                <textarea
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                    rows={7}
                                    maxLength={256}
                                    className={`${classes.TextBioArea} ${theme}Text ${theme}Post`}
                                />
                                {photos.length < 4 &&
                                    <>
                                        <label>Додати фотографію</label>
                                        <label htmlFor="avatar">
                                            <div
                                                className={`${classes.DragField} ${theme}Post`}
                                                onDrop={handleDrop}
                                                onDragOver={handleDragOver}
                                            >
                                                <AddPhotoAlternateIcon sx={{width:'40px', height:'40px'}}/>
                                                <div className={classes.AddPhoto}>
                                                    Додайте / перетягніть фотографію до 3 мб
                                                </div>
                                            </div></label>
                                        <input multiple hidden key={Date.now()} type="file" id="avatar" name="avatar" onChange={(e)=> handleClick(e)} />

                                    </>
                                }
                                <p className={classes.Rules}>
                                    <TextSnippetIcon/> Правила публікації постів
                                </p>
                                <div onClick={send} className={classes.Button}>
                                    Створити
                                </div>
                            </div>
                            <div style={{marginTop:'100px'}}>
                                {photos.length > 0 && <p style={{marginLeft: '15px'}}>Фотографії: {photos.length}/4</p>}
                                <div className={classes.Photos}>
                                    { photos.length > 0 &&
                                        photos.map((photo, index) => (
                                            <div key={index} className={classes.Photo}>
                                                <img alt='Photo' src={photo}/>
                                                <CloseIcon sx={{cursor:'pointer'}} onClick={() => RemoveImage(index)}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )):(
            <div className={classes.Posting}>
                <Header/>
                <div className={`${classes.Error} ${theme}Text`}>
                    <h1>Авторизуйтеся, щоб ділитися враженнями з усіма.</h1>
                </div>
                <Footer/>
            </div>
        )
    );
};

export default Posting;