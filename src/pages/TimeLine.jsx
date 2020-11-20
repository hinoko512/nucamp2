import React from 'react';
import NotiItem from '../components/NotiItem';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar,
  IonTitle,
  IonList,
  IonContent, 
} from '@ionic/react';

/*
props:
  notiList: array
  myName: string
*/ 
const TimeLine = (props) => {
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
          {props.notiList.map((value, index) => {
            return( 
              <NotiItem 
                key={index.toString()}
                myName={props.myName}
                name={value.name} 
                taskTitle={value.taskTitle}>
              </NotiItem>
            );
          })}
        </IonList>
      </IonContent>
      
    </IonPage>
  )
}
export default TimeLine;