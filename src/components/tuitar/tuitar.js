import React, { Component,useState,useCallback,useEffect } from 'react'
import firebase from '../../service/firebase';
import {connect} from 'react-redux';
import {useDropzone} from 'react-dropzone'
import moment from 'moment';
import { AiOutlineFileGif,AiOutlineStar } from "react-icons/ai";
import { MdInsertPhoto } from "react-icons/md";
import { RiEmotionHappyLine } from "react-icons/ri";
import { FaCalendarAlt,FaTimes }from "react-icons/fa";
import Perfil from '../../img/perfil/user.jpg';
import Twitter_Post from '../twitter_post/twitter_post';
import {SetPost,SetUploadMidia} from '../../service/service_post_twitter';
import Pefil from '../perfil/foto';
import './tuitar.css';


function Tuitar(props) {

    const [text_Tuitar,setText_Tuitar]            = useState('');
    const [disable_button,disable_button_Tuitar]  = useState(true);
    const [filesAction, setfilesAction]           = useState(false);
    const [files, setFiles]                       = useState([]);
    const [filesMidia, setFilesMidia]             = useState();



    async function handleSubmit(e){
        e.preventDefault();
        //Se state filesAction for igual a true, corresponde que o post realizado pelo o usuário, contém mídia.
        if(filesAction){
     
            props.SetUploadMidia({file:filesMidia,storage:'post-item'}).then((res)=>{
               
                handleCadastroPostItem(res);
            });

        }else{
            handleCadastroPostItem(null);
        }
        
    }
    
    async function handleCadastroPostItem(url){
      const db = firebase.firestore();
      const post_date =  moment().format();
        //Cadastro de post do usuário
     const retorno = await db.collection('tweet-post-item').add({
                                            post_descricao:text_Tuitar,
                                            post_user_id:props.sesion.id,
                                            post_date:post_date,
                                            post_tipo:(url!=null?1:0),
                                            post_midia:url
                                            }).then(function() {
                                            console.log("Document successfully written!");
                                            //A funçãi props.SetPost, foi criada para atualizar o state da lista de post no redux
                                            //Dessa forma atualizamos o state sem precisar fazer uma nova requisição
                                            props.SetPost(
                                                                {
                                                                    id:Math.random(),
                                                                    data:{
                                                                           post_date:post_date,
                                                                           post_user_id:props.sesion.id,
                                                                           post_descricao:text_Tuitar,
                                                                           post_tipo:(url!=null?1:0),
                                                                           post_midia:url
                                                                         },
                                                                    namePerfil:props.sesion.name,
                                                                    urlPerfil:props.sesion.url,
                                                                    loginPerfil:props.sesion.login,
                                                                });
                                            setText_Tuitar('');
                                            handleDisalbledMidia();
                                        })
                                        .catch(function(error) {
                                            console.error("Error writing document: ", error);
                                        });
    }

    function handleActionButton(value){
        setText_Tuitar(value);
        disable_button_Tuitar(value.length>0?false:true)
    }

    function handleDisalbledMidia(){
        setfilesAction(false);
        setFilesMidia("");
        setFiles("");
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({ accept: 'image/*', onDrop: acceptedFiles => {
        const file = acceptedFiles[0];
        setFilesMidia(file);
        setfilesAction(true);
        setFiles(URL.createObjectURL(file));
           
    }});

    return (<>
                <div className="topo">
                        <span><b>Página Inicial</b></span> 
                        <AiOutlineStar/>
                </div>
                <div className="main-container-center">
                <div className="area-tuitar">
                    <div className="area-tuitar-container">
                        <div className="area-tuitar-left">
                           <Pefil/>
                        </div>
                        <div className="area-tuitar-right">
                            <form onSubmit={handleSubmit}>
                                <textarea 
                                    name        = "text_Tuitar" 
                                    id          = "text_Tuitar"
                                    value    = {text_Tuitar}
                                    onChange = {e => handleActionButton((e.target.value))} 
                                    cols        = "30" 
                                    rows        = "10" 
                                    className   = "form-post" 
                                    placeholder = "O que está acontecendo agora?"
                                    required
                                >
                                </textarea>
                                <div className={`area-tuitar-midia ${filesAction === false? "area-tuitar-midia-action":""}`}>
                                    <button onClick={()=>handleDisalbledMidia()}><FaTimes/></button>
                                     <img src={files}/>
                                </div>
                                <div className="list-icones-post">
                                    <ul>
                                        <li> <div {...getRootProps()} className="svg"> <input {...getInputProps()} /><MdInsertPhoto/></div></li>
                                        <li><a href={void(0)} className="inativo"><AiOutlineFileGif/></a></li>
                                        <li><a href={void(0)} className="inativo"><RiEmotionHappyLine/></a></li>
                                        <li><a href={void(0)} className="inativo"><FaCalendarAlt/></a></li>
                                    </ul>
                                    <button type="submit" disabled={disable_button}  className="button-Tuitar">Tweetar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Twitter_Post/>
                </div>
                </>
        )
    
}
function mapStateToProps(state){
   
    return {
           
        sesion : state.user_twitter.fetch_session_user, 
           
        }
}

export default connect(mapStateToProps,{SetPost,SetUploadMidia})(Tuitar); 


