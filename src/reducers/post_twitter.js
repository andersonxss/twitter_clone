import {
        FETCH_ALL_POST,
        SET_POST
    } from '../service/service_post_twitter';


const INITIAL_STATE = { 
                        fetch_all_post : []
                      };

export default function(state = INITIAL_STATE,action){

    switch (action.type) {

        case FETCH_ALL_POST:
          
          return { ...state, fetch_all_post:(action.payload?action.payload:[]) }
       
 case SET_POST:
           
           
            return { ...state, 
                           fetch_all_post: [action.payload,...state.fetch_all_post]
                            
                        }
        default:
    return state;

    }
}