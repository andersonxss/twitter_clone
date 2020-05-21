import firebase from "firebase";

const config = {
                apiKey: "AIzaSyDHET2PE0W5LQE1Ms-kESnCZwgY97IyGFM",
                authDomain: "api-free-code.firebaseapp.com",
                databaseURL: "https://api-free-code.firebaseio.com",
                projectId: "api-free-code",
                storageBucket: "api-free-code.appspot.com",
                messagingSenderId: "418411805389",
                appId: "1:418411805389:web:8ac71de0e3b91a4e2b0784",
                measurementId: "G-YKNPGJX2CX"
            };
  // Initialize Firebase
  firebase.initializeApp(config);

export default firebase;


