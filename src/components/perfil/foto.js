import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
 function Foto(props){
    
        return (
            <>
            <Link to={props.router.perfil}><img src={props.url!=undefined?props.url:props.sesion.url} alt="Perfil"/></Link>
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

