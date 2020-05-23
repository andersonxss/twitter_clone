import React, { Component,useState,useEffect } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {GetAllUser} from '../../service/service_user';
import firebase from '../../service/firebase';
import {useDropzone} from 'react-dropzone';
import { FiArrowLeft } from "react-icons/fi";
import { MdPhotoCamera}from "react-icons/md";
import './perfil.css';
function Perfil(props){

        const [actionFile,setActionFile]= useState();
        const [load,setLoad]= useState(false);
        const [name,setName]= useState('');
        const [login,setLogin]= useState('');
        const [capa,setCapa]= useState('');
        const [url,setUrl]= useState('');
        
     
        useEffect(()=>{
          
            renderGetDadosPerfilUser();
          },[]);

          async function renderGetDadosPerfilUser() {

            const db = firebase.firestore();
            await db.collection("tweet-perfil-user").doc(props.match.params.id)
                .get().then((querySnapshot) => {
                    setName(querySnapshot.data().name);
                    setLogin(querySnapshot.data().login);
                    setCapa(querySnapshot.data().capa);
                    setUrl(querySnapshot.data().url);
                    setLoad(true)
                });

        }
        

        const {getRootProps, getInputProps, isDragActive} = useDropzone({ accept: 'image/*', onDrop: acceptedFiles => {

            const file = acceptedFiles[0];
            const storage = firebase.storage();
            //Guardando os dados do upload na storage do firebase
            const uploadTask = storage.ref(`perfil/${file.name}`).put(file);
                uploadTask.on('state_changed',(snapshot)=>{},(error)=>{

                },()=>{
                    storage.ref('perfil').child(file.name).getDownloadURL().then(url=>{
                        const db = firebase.firestore();
                        //Se a action for perfil o upload irá corresponder para a foto do perfil do usuário
                        // Se não o upload irá para a capa do usuário
                        const fileSelect = (actionFile==='perfil'?{url:url}:{capa:url});
                        //Após receber o request de upload, faremos uma nova requisição 
                        //para guardar a url da imagem na collectiond o usuário
                        db.collection('tweet-perfil-user').doc(props.match.params.id).update(fileSelect).then(function(){
                            console.log("Document successfully written!");
                            const session = JSON.parse(localStorage.getItem('session'));
                            
                            if (actionFile==='perfil') {
                                setUrl(url);
                                session.url=url;
                            } else {
                                setCapa(url);
                                session.capa=url;
                            }
                            
                            localStorage.setItem("session",JSON.stringify(session));
                            //A função GetAllUser corresponde para atualizar 
                            //as informações da sessão do usário que se encontra armazenada no redux
                            props.GetAllUser(session);

                          

                            setActionFile('');
                            
                        }).catch(function(error) {
                            console.error("Error writing document: ", error);
                        });
                    });
               });
        }});

        return (
            <> {load === true?
            <div className="conatainer-perfil">
                
                    <div className="topo-perfil">
                        <Link to={props.router.home}><FiArrowLeft/></Link> <span>{name}</span> 
                    </div>
                <div className="container-capa">
                    <div className="capa">
                         <img src={capa}/>
                          <a href={void(0)}  {...getRootProps({onClick:()=>setActionFile('capa')})}><input {...getInputProps()} /><MdPhotoCamera/></a>
                    </div>
                    <div className="perfil-capa">
                         <img src={url}/>
                         <a href={void(0)}  {...getRootProps({onClick:()=>setActionFile('perfil')})}><input {...getInputProps()}/><MdPhotoCamera/></a>
                    </div>
                    <div className="perfil-dados-pessoal">
                    <p>{name}</p>
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

export default connect(mapStateToProps,{GetAllUser})(Perfil); 
