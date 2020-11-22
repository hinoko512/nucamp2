import React, { useState } from "react";
import NotificationItem from "../components/NotificationItem";
import firebase from "firebase/app";
import "firebase/firestore";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonContent,
  useIonViewWillEnter,
} from "@ionic/react";

const NotificationPage = (props) => {
  const [notificationList, setNotificationList] = useState([]);

  useIonViewWillEnter(async () => {
    if (props.groupMember.length !== 0) {
      console.log(props.groupMember);
      const querySnapshot = await firebase
        .firestore()
        .collection("notificationList")
        .where("userName", "in", props.groupMember)
        .get();
      const newList = [];
      querySnapshot.forEach((doc) => {
        newList.push(doc.data());
      });
      console.log(newList);
      setNotificationList(newList);
    }
  });

  return (
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
            return (
              <NotificationItem
                key={index.toString()}
                myName={props.userName}
                name={value.userName}
                type={value.taskType}
                taskTitle={value.taskTitle}
              ></NotificationItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default NotificationPage;
