import {useEffect, useState} from 'react';

import Banner from "./Banner/Banner";
import Main from "./Main/Main";

import svg from '../../shared/images/looking_release.svg'
import verify from '../../shared/images/verify.svg'

import classes from './styles.module.scss'
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import {useSelector} from "react-redux";
import {State} from "../../redux/store";
import {Link, useParams} from "react-router-dom";
import Loader from '../../shared/Loader/Loader';


const REACT_APP_DEPLOY_URL = `https://django-auth-gfm6.onrender.com/api/`

const getProfileInfo = (data: string) => {
    return fetch(REACT_APP_DEPLOY_URL + `account/${data}/`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json().then(data => {
                return data
            });
        })
        .catch(error => {
            throw error
        });
}

function Profile() {

    /*const profile:IProfileInfo = useSelector((state:State) => state.profile)*/
    const theme:string = useSelector((state:State) => state.theme)
    const params = useParams()

    const [profile, setProfile] = useState()
    const [similar, setSimilar] = useState([])

    const [fetch, setFetch] = useState(true)

    const getData = async (nickname:string) => {
        try {
            const data = await getProfileInfo(nickname!)
            if (data.similar_accounts) {
                setSimilar(data.similar_accounts)
            }
            else setProfile(data.data)
        }catch (e){
            console.log(e)
        }finally {
            setFetch(false)
        }
    }

    const [isFixed,setIsFixed] = useState(false);

    useEffect(() => {
        getData(params.nickname!)
        const handleScroll = () => {
            setIsFixed(window.pageYOffset >= 165)
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return ( fetch ? (
            <Loader/>
       ) : (
            <div className={`${classes.Profile}`}>
                <Header/>
                {profile ? (
                    <div className={classes.Content}>
                        <Banner user={profile!} disabled={isFixed}/>
                        <Main user={profile!} isFixed={isFixed}/>
                    </div>
                ) : (
                    <div className={`${classes.NoUser} ${theme}Text`}>
                        <img style={{width:'400px', height:'400px'}} src={svg} alt=""/>
                       <div style={{width:'700px', height:'500px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                           <div style={{display:'flex', marginBottom:'20px'}}>
                               <p style={{fontSize:'35px', textTransform:'uppercase', color:'#7C7C7C'}}>Користувача</p>
                               &nbsp;
                               &nbsp;
                               <strong style={{fontSize:'35px'}}>@{params.nickname!}</strong>
                               &nbsp;
                               &nbsp;
                               <p style={{fontSize:'35px', textTransform:'uppercase', color:'#7C7C7C'}}>не знайдено</p>
                           </div>
                           {
                               similar.length ? (
                                   <>
                                       <p style={{ marginBottom: '30px', fontSize:'25px'}}>Можливо, ви шукали:</p>
                                       <div>
                                           {similar.map((account: any, index: number) => {
                                               if (index < 3) {
                                                   return (
                                                       <div key={index} style={{display:'flex', marginRight:'10px'}}>
                                                           <p style={{fontSize:'28px', cursor:'pointer'}} key={index}>
                                                               <strong>@{account.nickname}</strong>
                                                           </p>
                                                           {account.is_verify && <img style={{width:'25px', marginLeft:'5px', marginTop:'5px'}} src={verify} alt=""/>}
                                                       </div >
                                                   );
                                               }
                                               return null;
                                           })}
                                       </div>

                                   </>
                               ) : (
                                   <>
                                       <p style={{fontSize:'28px', marginTop:'20px'}}>Можливо цей акаунт було видалено власником або адміністрацією сайту</p>
                                       <Link to={'../'}>
                                           <button className={`${classes.Button} ${theme}Text`}>На головну</button>
                                       </Link>
                                   </>
                               )
                           }
                       </div>

                    </div>
                )}
                <Footer/>
            </div>
        )
    );
}

export default Profile;

