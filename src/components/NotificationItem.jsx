import { IonCard, IonCardSubtitle, IonCardTitle, IonGrid, IonItem, IonRow, IonTitle } from '@ionic/react';
import React from 'react';
import '../css/notificationItem.css'

/*
props:
  myName: string
  name: string
  taskTitle: string
*/ 
const NotiItem = (props) => {
  let color = ""
  let message = `${props.name}さんがタスクを終了しました`
  if (props.name === props.myName) {
    color = "secondary"
  }
  if (props.type === 'expired') {
    color = "warning"
    message = `${props.name}さんがタスクを終えられませんでした`
  }

  return(
    // <IonItem color={background}>
    //   <IonGrid>
    //     <IonRow>
    //       <p>{props.name}さんがタスクを終了しました</p>
    //     </IonRow>
    //     <IonRow>
    //       <IonTitle className="ion-margin-bottom">{props.taskTitle}</IonTitle>
    //     </IonRow>
    //   </IonGrid>
    // </IonItem>
    <IonCard className="ion-padding"　color={color}>
      <IonCardSubtitle className="ion-margin-bottom">{message}</IonCardSubtitle>
      <IonCardTitle>{props.taskTitle}</IonCardTitle>
    </IonCard>
  )
}
export default NotiItem