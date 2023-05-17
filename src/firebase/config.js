import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDyuj8cuD9eaYy-zOTKFUcxZ1xAhZLwYYY",
    authDomain: "music-manager-3a2e6.firebaseapp.com",
    projectId: "music-manager-3a2e6",
    storageBucket: "music-manager-3a2e6.appspot.com",
    messagingSenderId: "796902323698",
    appId: "1:796902323698:web:437c379d105b5df0b4a76b"
  };

  firebase.initializeApp(firebaseConfig)  

  const projectFirestore = firebase.firestore()
  const projectAuth= firebase.auth()
  const projectStorage = firebase.storage()

  const timestamp= firebase.firestore.FieldValue.serverTimestamp

  export {projectAuth, projectFirestore, projectStorage, timestamp}
