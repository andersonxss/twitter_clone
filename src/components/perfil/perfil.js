import React, { Component,useState } from 'react';
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

        const {getRootProps, getInputProps, isDragActive} = useDropzone({ accept: 'image/*', onDrop: acceptedFiles => {

            const file = acceptedFiles[0];
            const storage = firebase.storage();
        
            const uploadTask = storage.ref(`perfil/${file.name}`).put(file);
                uploadTask.on('state_changed',(snapshot)=>{},(error)=>{

                },()=>{
                    storage.ref('perfil').child(file.name).getDownloadURL().then(url=>{
                        const db = firebase.firestore();
                        const fileSelect = (actionFile==='perfil'?{url:url}:{capa:url});
                     
                        db.collection('tweet-perfil-user').doc(props.sesion.id).update(fileSelect).then(function(){
                            console.log("Document successfully written!");
                            const session = JSON.parse(localStorage.getItem('session'));
                           
                            const sessionUpdate = ( actionFile==='perfil'? session.url=url : session.capa=url);
                            localStorage.setItem("session",JSON.stringify(session));
                            props.GetAllUser(session);
                            setActionFile('');
                            
                        }).catch(function(error) {
                            console.error("Error writing document: ", error);
                        });
                    });
               });
        }});

     
        return (
            <div className="conatainer-perfil">
                <div className="topo-perfil">
                    <Link to={props.router.home}><FiArrowLeft/></Link> <span>{props.sesion.name}</span> 
                </div>
                <div className="container-capa">
                    <div className="capa">
                         <img src={props.sesion.capa}/>
                          <a href={void(0)}  {...getRootProps({onClick:()=>setActionFile('capa')})}><input {...getInputProps()} /><MdPhotoCamera/></a>
                    </div>
                    <div className="perfil-capa">
                         <img src={props.sesion.url}/>
                         <a href={void(0)}  {...getRootProps({onClick:()=>setActionFile('perfil')})}><input {...getInputProps()}/><MdPhotoCamera/></a>
                    </div>
                    <div className="perfil-dados-pessoal">
                    <p>{props.sesion.name}</p>
                    </div>
                </div>
            </div>
        )
    
}
function mapStateToProps(state){
   
    return {
           
         sesion : state.user_twitter.fetch_session_user, 
         router : state.router_twitter, 
           
        }
}

export default connect(mapStateToProps,{GetAllUser})(Perfil); 
