import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { presentToast } from "./util";

const firebaseConfig = {
  apiKey: "AIzaSyDDjOfzmXMiduuonoJfhW9ryCKg7wpX5EI",
  authDomain: "nucamp-970cd.firebaseapp.com",
  databaseURL: "https://nucamp-970cd.firebaseio.com",
  projectId: "nucamp-970cd",
  storageBucket: "nucamp-970cd.appspot.com",
  messagingSenderId: "541426173393",
  appId: "1:541426173393:web:511860241bb155c4308cf0"
};

firebase.initializeApp(firebaseConfig);

// ログイン処理
export async function loginUser(username, password) {
  const email = `${username}@nucamp.com`

  try {
    const res = await firebase.auth().signInWithEmailAndPassword(email, password) 
    console.log(res)
    return true
  } catch(error) {
    presentToast(error.message)
    console.log(error);
    return false
  }
}

// サインイン処理
export async function registerUser(username, password) {
  const email = `${username}@nucamp.com`

  try{
    const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log(res)
    return true
  } catch(error) {
    presentToast(error.message)
    console.log(error)
    return false
  }
}