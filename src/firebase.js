import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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

//firestoreアップロード処理
export async function uploadNotificationData(userName, type, title) {
  firebase.firestore().collection("notificationList").add({
    taskType: type,
    userName: userName,
    taskTitle: title
  }).then(function(docRef) {
    console.log("Written with ID: ", docRef.id)
  }).catch(function(error) {
    console.log("Cloud firestore Error: ", error);
  })
}

// firestoreから読み込む処理
export async function getNotificationList(groupMember) {
  let res = []
  firebase.firestore().collection("notificationList").where("userName", "in", groupMember)
    .get()
    .then((querySnapshot) => { 
      querySnapshot.forEach((doc) => {
        res.push(doc.data())
      })
    }
  )
  return res
}