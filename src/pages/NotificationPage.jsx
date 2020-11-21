import React, { useState } from 'react';
import NotificationItem from '../components/NotificationItem';
import { getNotificationList }  from '../firebase';

import { 
  IonPage, 
  IonHeader, 
  IonToolbar,
  IonTitle,
  IonList,
  IonContent,
  useIonViewWillEnter
} from '@ionic/react';

/*
props:
  notificationList: array
  myName: string
*/ 
const NotificationPage = (props) => {
  const [notificationList, setNotificationList] = useState([])

  useIonViewWillEnter(async() => {
    const newNotificationList = await props.updateNotificationList()
    setNotificationList(newNotificationList)
    console.log('newNotificationList', newNotificationList)
    console.log('notificationList', notificationList)
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
          {props.notificationList.map((value, index) => {
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