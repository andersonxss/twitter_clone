import React, { Component } from 'react'
import moment from 'moment';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { FaRegComment,
    FaRegGrin,
    FaUpload }             from "react-icons/fa";
import { AiOutlineRetweet} from "react-icons/ai";
import Pefil from '../perfil/foto';


function Twitter_Post_Item(props){

    return (
        <>
        <div className="list-post-item">
            <div className="post-foto">
                 <Pefil url={props.item.urlPerfil} id={props.item.data.post_user_id}/>
            </div>
            <div className="post-descricao">
                <div className="post-descricao-topo">
                    <div className="post-nome">
                        <Link to={`${props.router.perfil}/${props.item.data.post_user_id}`}>
                            {props.item.namePerfil}
                        </Link>
                    </div>
                    <div className="post-data"><span> {moment(props.item.data.post_date).format("DD/MM/YYYY")} </span></div>
                </div>
                <div className="post-descricao-item">
                  <p> {props.item.data.post_descricao}</p>

                    {props.item.data.post_tipo === 1  ?<img src={props.item.data.post_midia}/>:""}
                </div>
                <div className="post-descricao-action">
                    <ul>
                        <li><a href={void(0)} className="inativo"><FaRegComment/><span>10</span></a></li>
                        <li><a href={void(0)} className="inativo"><AiOutlineRetweet/> <span>10</span></a></li>
                        <li><a href={void(0)} className="inativo"><FaRegGrin/></a></li>
                        <li><a href={void(0)} className="inativo"><FaUpload/></a></li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}


function mapStateToProps(state){
   
    return {
           
        router : state.router_twitter, 
           
        }
}

export default connect(mapStateToProps,null)(Twitter_Post_Item); 
