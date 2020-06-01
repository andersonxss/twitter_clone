import firebase from './firebase';
export const FETCH_SESSION_USER = 'FETCH_SESSION_USER';

const db = firebase.firestore();

export function SetSessionUser(request){
	return dispatch =>{
		localStorage.setItem("session",JSON.stringify(request));
	}
}

export function GetSessionUser(request){

    return{
			type   : FETCH_SESSION_USER,
			payload: request
	};
}


export function GetUserPerfil(id_user){
	return dispatch =>{
		
		return  db.collection("tweet-perfil-user").doc(id_user).get();
	}

}

export function GetUpdate(dados){
	return dispatch =>{
		
		return db.collection(dados.collection).doc(dados.doc).update(dados.data);
	
	}

}