import { IonGrid, IonItem, IonRow, IonTitle } from '@ionic/react';
import React from 'react';

/*
props:
  myName: string
  name: string
  taskTitle: string
*/ 
const NotiItem = (props) => {
  let background = ""
  if (props.name === props.myName) {
    background = "secondary"
  }
  return(
    <IonItem color={background}>
      <IonGrid>
        <IonRow>
          <p>{props.name}さんがタスクを終了しました</p>
        </IonRow>
        <IonRow>
          <IonTitle className="ion-margin-bottom">{props.taskTitle}</IonTitle>
        </IonRow>
      </IonGrid>
    </IonItem>
  )
}
export default NotiItem