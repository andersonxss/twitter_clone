import firebase from './firebase';
export const FETCH_SESSION_USER = 'FETCH_SESSION_USER';



export function GetAllUser(request){

    return{
			type   : FETCH_SESSION_USER,
			payload: request
	};
}