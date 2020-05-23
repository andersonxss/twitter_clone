import React, { Component,
                useEffect } from 'react';
import {connect}            from 'react-redux';
import {GetAllPost}         from '../../service/service_post_twitter';
import Twitter_Post_Item from './twitter_post_item';
import firebase from '../../service/firebase';


import './twitter_post.css'; 

class Twitter_Post extends Component {

    componentWillMount() {
        //Busca dos POSTS cadastrado
            const db = firebase.firestore();
            //Buscando a lista de post
             db.collection("tweet-perfil-user").get().then((responseUsers)=>{
              var users =  responseUsers.docs.map((doc)=>{ 
                
                    return {id:doc.id,data:doc.data()}
                });
           
               db.collection("tweet-post-item").get().then((responsePosts) => {
                     const returnPosts = responsePosts.docs.map((docPost,i)=>{ 
                       
                        const retornoUser = users.filter((elem => elem.id == docPost.data().post_user_id));
                        if (retornoUser[0]!=undefined) {
                             
                              const namePerfil = retornoUser[0].data.name;
                              const urlPerfil = retornoUser[0].data.url;
                              const loginPerfil = retornoUser[0].data.login;
                           
                              return {
                                        id:docPost.id,
                                        data:docPost.data(),
                                        namePerfil:namePerfil,
                                        urlPerfil:urlPerfil,
                                        loginPerfil:loginPerfil
                                     }
                        }
                
                     });
                //Enviando o array de post para ser inserido no redux
                this.props.GetAllPost(returnPosts);
            });
        
         });

         
        
          
            
    }

    render() {
    
      const lista_posts = this.props.all_post;


        return (
            <div className="list-post-container">
             {
                //A lista de posts, só será carrada quando houver algum dado cadastrado
                lista_posts.length>0?
                    lista_posts.map(item=>( 
                        <Twitter_Post_Item 
                            key={item.id} 
                            item={item}/>
                        ))
                :<div className="loader"/>
                }
                <div className="list-post-container-footer">Twitter Clone</div>
            </div>
        )
    }
}


function mapStateToProps(state){
   
    return {
           
        all_post : state.post_twitter.fetch_all_post, 
           
        }
}

export default connect(mapStateToProps,{GetAllPost})(Twitter_Post); 
