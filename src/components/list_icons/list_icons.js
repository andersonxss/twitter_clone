import React, { Component } from 'react';
import { Link }   from 'react-router-dom';

function List_Icons(props) {


    function list(){

      const listas =  props.icones.map((elem,i)=>{
         return <li key={i}>
         {
            elem.link ? <Link to={elem.router}>
                          <div className="container-menu"> {elem.icon}  <span>{elem.name}</span></div>
                        </Link>:<a href={void(0)} className={elem.class}> <div className="container-menu">{elem.icon}  <span>{elem.name}</span></div></a>
          }
                </li>;
       });
       return listas;
    }

    return (
            
        <>
          <ul>
            {list()}
         </ul>
        </>
    )

}

export default List_Icons;