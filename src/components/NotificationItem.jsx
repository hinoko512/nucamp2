import { IonCard, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import React from "react";
import "../css/notificationItem.css";

const NotiItem = (props) => {
  let color = "";
  let message = `${props.name}さんがタスクを終了しました`;
  if (props.name === props.myName) {
    color = "secondary";
  }
  if (props.type === "expired") {
    color = "warning";
    message = `${props.name}さんがタスクを終えられませんでした`;
  }

  return (
    <IonCard className="ion-padding" color={color}>
      <IonCardSubtitle className="ion-margin-bottom">{message}</IonCardSubtitle>
      <IonCardTitle>{props.taskTitle}</IonCardTitle>
    </IonCard>
  );
};
export default NotiItem;
