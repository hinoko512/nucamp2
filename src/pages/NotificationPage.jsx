import React, { useState } from 'react';
import NotificationItem from '../components/NotificationItem';
import { getNotificationList }  from '../firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { 
  IonPage, 
  IonHeader, 
  IonToolbar,
  IonTitle,
  IonList,
  IonContent,
  useIonViewWillEnter,
  useIonViewDidEnter
} from '@ionic/react';

/*
props:
  notificationList: array
  myName: string
*/ 
const NotificationPage = (props) => {
  const [notificationList, setNotificationList] = useState([])

  useIonViewWillEnter(async() => {
    const querySnapshot = await 
      firebase.firestore()
      .collection("notificationList")
      .where("userName", "in", props.groupMember)
      .get()
    const newList = [];
    querySnapshot.forEach(doc => {
      newList.push(doc.data());
    });
    console.log(newList)
    setNotificationList(newList);
    console.log(notificationList)
  })

  return(
    <IonPage>
      {/*------ Header ------*/}
      <IonHeader>
        <IonToolbar>
          <IonTitle>通知</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* ------- Contetet ------ */}
      <IonContent className="ion-padding">
        <IonList>
          {notificationList.map((value, index) => {
            return( 
              <NotificationItem 
                key={index.toString()}
                myName={props.userName}
                name={value.userName}
                type={value.taskType} 
                taskTitle={value.taskTitle}>
              </NotificationItem>
            );
          })}
        </IonList>
      </IonContent>
      
    </IonPage>
  )
}
export default NotificationPage;