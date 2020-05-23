import React, { Component } from 'react';
import { Link }   from 'react-router-dom';

function List_Icons(props) {


    function list(){

      const listas =  props.icones.map((elem,i)=>{
         return <li key={i}>
         {
            elem.link ? <Link to={elem.router}> {elem.icon}  <span>{elem.name}</span></Link>:<a href={void(0)} className={elem.class}> {elem.icon}  <span>{elem.name}</span></a>
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