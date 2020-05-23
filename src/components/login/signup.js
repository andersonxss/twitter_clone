import React, { Component,useState } from 'react';
import {connect} from 'react-redux';
import {useDropzone} from 'react-dropzone';
import firebase from '../../service/firebase';
import { FaTwitter}from "react-icons/fa";
import { MdPhotoCamera}from "react-icons/md";
import { Link,Redirect } from 'react-router-dom';
import {SetUploadMidia} from '../../service/service_post_twitter';
import './login.css';

 function Signup(props) {

    const [textButton,setTextButton]    = useState('Cadastrar');
    const [name,setName]                = useState('');
    const [login,setLogin]              = useState('');
     const [foto,setFoto]               = useState('');
    const [senha,setSenha]              = useState(123456);
    const [files, setFiles]             = useState([]);
    const [filesMidia, setFilesMidia]   = useState();
    const [filesAction, setfilesAction] = useState(false);
    const [redirect, setRedirect]       = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        setTextButton('Enviando...')
        if(filesAction){
          
            props.SetUploadMidia({file:filesMidia,storage:'perfil'}).then((res)=>{
                handleCadastroUser(res);
            });

        }else{
            handleCadastroUser(null);
        }

    }

    async function handleCadastroUser(url){
        const db = firebase.firestore();
        await db.collection('tweet-perfil-user')
            .add({name:name,login:login,senha:senha,url:url,capa:""})
            .then((request)=>{
                  setTextButton('Cadastrar');
                   setRedirect(true);
        });
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({ accept: 'image/*', onDrop: acceptedFiles => {
        const file = acceptedFiles[0];
        setFilesMidia(file);
        setfilesAction(true);
        setFiles(URL.createObjectURL(file));
           
    }});

    {
        if(redirect){
         return <Redirect to='/'/>;   
        }
    }

        return (
                <div className="login-container">
                    <div className="login-form">
                        <FaTwitter/>
                        <p className="titulo">Criar conta no Twitter-Clone</p>
                      
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
                            <div className="input-block">
                                <label htmlFor="login"> Senha</label>
                                <input
                                    name="senha"
                                    id="senha"
                                    value={senha}
                                    onChange={e => setSenha(e.target.value)}
                                    required
                                    disabled
                                />
                            </div>
                            <div className="input-block">
                                <label htmlFor="login"> Foto</label>
                                <div {...getRootProps()} className="svg"> 
                                    <input {...getInputProps()} /><MdPhotoCamera/>
                                </div>
                                <div className={`file-select ${filesAction === false ? "file-select-action":""}`}>
                                     <img src={files}/>
                                </div>
                            </div>
                            <button type="submit">{textButton}</button>
                        </form>
                        <ul>
                           <li> <Link to="/">Home</Link></li>
                        </ul>
                    </div>
                </div>
        
        )
    
}


export default connect(null,{SetUploadMidia})(Signup); 
