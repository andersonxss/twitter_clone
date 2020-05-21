import {
    FETCH_SESSION_USER,
} from '../service/service_user';


const INITIAL_STATE = { 
                        fetch_session_user : []
                     };

export default function(state = INITIAL_STATE,action){

switch (action.type) {

    case FETCH_SESSION_USER:
      
      return { ...state, fetch_session_user:(action.payload?action.payload:[]) }
   

    default:
    return state;

}
}