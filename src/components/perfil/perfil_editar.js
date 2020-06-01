import React, { useState,useEffect } from 'react';
import {connect} from 'react-redux';
import { FiArrowLeft}from "react-icons/fi";
import { Link,Redirect} from 'react-router-dom';
import {GetUserPerfil,GetUpdate,GetSessionUser,SetSessionUser} from '../../service/service_user';
import '../login/login.css';

 function Perfil_Editar(props) {

    const [session,setSession]       = useState(props.sesion);
    const [textButton,setTextButton] = useState('Editar');
    const [load,setLoad]             = useState(false);
    const [name,setName]             = useState('');
    const [login,setLogin]           = useState('');
    const [redirect, setRedirect]    = useState(false);
    const [perfil, setPerfil]        = useState(`${props.router.perfil}/${props.match.params.id}`);

    useEffect(() => {
         
            setName(session.name)
            setLogin(session.login)
            setLoad(true);
       
    }, []);


    async function handleSubmit(e){

        e.preventDefault();
        setTextButton('Enviando...');
        props.GetUpdate({collection:'tweet-perfil-user',doc:props.match.params.id,data:{name:name,login:login}}).then((response)=>{
            setRedirect(true);
            session.name  = name;
            session.login = login;
            props.SetSessionUser(session);
            props.GetSessionUser(session);
            setTextButton('Editar');
        }).catch(function(error) {
            console.error("Error writing document: ", error);
        });


    }

    {
        if(redirect){
        return <Redirect to={perfil}/>;   
        }
    }

    return (
            <> 
            {load === true?
            <div className="conatainer-perfil">
            <div className="container-capa">
                <div className="topo-perfil">
                    <Link to={perfil}><FiArrowLeft/></Link> <span>Editar perfil</span> 
                </div>
                <div className="login-container">
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <div className="input-block">
                            <label htmlFor="name"> Name</label>
                            <input
                                name="name"
                                id="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="login"> Login</label>
                            <input
                                name="login"
                                id="login"
                                value={login}
                                onChange={e => setLogin(e.target.value)}
                                required
                            />
                        </div>
                    
                        <button type="submit">{textButton}</button>
                    </form>
                    </div>
                    </div>
                    </div>
            </div>
            : <div className="loader"/>
        }
        
        </>
    
    )
    
}


function mapStateToProps(state){
   
    return {
           
         sesion : state.user_twitter.fetch_session_user, 
         router : state.router_twitter, 
           
        }
}

export default connect(mapStateToProps,{GetUserPerfil,GetUpdate,GetSessionUser,SetSessionUser})(Perfil_Editar); 
