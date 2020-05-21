import React, { Component,useState } from 'react';
import firebase from '../../service/firebase';
import { FaTwitter}from "react-icons/fa";
import { Link,Redirect }                from 'react-router-dom';
import Login_Ilustration from "../../img/twitter_login_sidebar_illustration.png";
import './login.css';

 function Login() {

    
    const [actionButton,setActionButton] = useState('Entrar');
    const [action,setAction] = useState(false);
    const [login,setLogin] = useState('');
    const [senha,setSenha] = useState('123456');
    const [redirect, setRedirect]       = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        setAction(false);
        setActionButton('Enviando...');
        const db = firebase.firestore();
        db.collection("tweet-perfil-user")
        .where("login", "==", login)
        .where("senha", "==", parseInt(senha)).get()
        .then((querySnapshot) => {
            
            const dados = querySnapshot.docs.map((doc)=>{ return {id:doc.id,data:doc.data()}});
              
                if (dados.length) {
                   
                      const id = dados[0].id;
                      const data = dados[0].data;
                      
                      localStorage.setItem("session",JSON.stringify({
                                                                      id:id,
                                                                      name:data.name,
                                                                      login:data.login,
                                                                      url:data.url,
                                                                      capa:data.capa,
                                                                      }));
                    setRedirect(true);
                } else {
                    setAction(true);
                }

                 setActionButton('Entrar');
        });

    }

      {
        if(redirect){
         return <Redirect to='/home'/>;   
        }
    }
   
        return (
                <div className="login-container">
                    <div className="login-form">
                        <FaTwitter/>
                        <p className="titulo">Entrar no Twitter-Clone</p>
                       {action?<div className="action">O nome de usuário e a senha fornecidos não correspondem às informações em nossos registros. Verifique-as e tente novamente.</div>:''}
                        <form onSubmit={handleSubmit}>
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
                            <button type="submit">{actionButton}</button>
                        </form>
                        
                        <ul>
                            <li><a href={void(0)} disabled>Esqueceu sua senha?</a></li>
                            <li> <Link to="/signup"> Inscrever-se no Twitter</Link></li>
                        </ul>
                    </div>
                </div>
        
        )
    
}
export default Login;