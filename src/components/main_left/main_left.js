import React, { Component } from 'react'
import {connect} from 'react-redux';
import { FaTwitter,
         FaHashtag,
         FaRegBell,
         FaRegEnvelope,
         FaRegBookmark,
         FaRegListAlt,
         FaRegUser,
         FaRegSun}       from "react-icons/fa";
import { RiHome7Line }   from "react-icons/ri";
import ListIcons         from '../list_icons/list_icons'
import './main_left.css';



export class Main_Left extends Component {
    render() {
        return (
            <>
            <div className="logo">
               <a href={void(0)}><FaTwitter/></a>
            </div>
            <div className="menu">
                  <ListIcons icones={[
                                        {icon:<RiHome7Line/>,name:'Página Inicial',link:true,router:this.props.router.home},
                                        {icon:<FaHashtag/>,name:'Explorar',class:"inativo",link:false},
                                        {icon:<FaRegBell/>,name:'Notificações',class:"inativo",link:false},
                                        {icon:<FaRegEnvelope/>,name:'Mensagem',class:"inativo",link:false},
                                        {icon:<FaRegBookmark/>,name:'Itens salvos',class:"inativo",link:false},
                                        {icon:<FaRegListAlt/>,name:'Listas',class:"inativo",link:false},
                                        {icon:<FaRegUser/>,name:'Perfil',link:true,router:`${this.props.router.perfil}/${this.props.sesion.id}`},
                                        {icon:<FaRegSun/>,name:'Mais',class:"inativo",link:false},
                                    ]}
                  />
            </div>
            <div className="tweetar">
                 <a href={void(0)}>Tweetar</a>
            </div>
            </>
        )
    }
}


function mapStateToProps(state){
   
    return {
        sesion : state.user_twitter.fetch_session_user, 
        router : state.router_twitter, 
           
        }
}

export default connect(mapStateToProps,null)(Main_Left); 

