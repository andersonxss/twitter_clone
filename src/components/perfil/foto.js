import React  from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import User from '../../img/user.png';
 function Foto(props){
   
        return (
            <>
            <Link to={`${props.router.perfil}/${props.id?props.id:props.sesion.id}`}>
                <img src={(props.url!=undefined?props.url:(props.sesion.url!=undefined?props.sesion.url:User))} alt="Perfil"/>
            </Link>
            </>
        )
    
}
function mapStateToProps(state){
   
    return {
           
        sesion : state.user_twitter.fetch_session_user, 
        router : state.router_twitter, 
           
        }
}

export default connect(mapStateToProps,null)(Foto); 

