import firebase from './firebase';
export const FETCH_ALL_POST = 'FETCH_ALL_POST';
export const SET_POST = 'SET_POST';
export const SET_URL = 'SET_URL';



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

export function SetUploadMidia(dados){
	
   return dispatch =>{
		
			const storage = firebase.storage();
			const uploadTask = storage.ref(`${dados.storage}/${dados.file.name}`).put(dados.file);
			return storage.ref(dados.storage).child(dados.file.name).getDownloadURL();
		
	};
}