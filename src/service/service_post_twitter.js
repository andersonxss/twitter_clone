import firebase from './firebase';
export const FETCH_ALL_POST = 'FETCH_ALL_POST';
export const SET_POST = 'SET_POST';



export function GetAllPost(request){

    return{
			type   : FETCH_ALL_POST,
			payload: request
	};
}

export function SetPost(request){
	
    return{
			type   : SET_POST,
			payload: request
	};
}