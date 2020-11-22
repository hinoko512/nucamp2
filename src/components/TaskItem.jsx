import { 
  IonButton, 
  IonGrid, 
  IonItem, 
  IonRow,
} from '@ionic/react';
import React from 'react';

const TaskItem = (props) => {
  return(
    <IonItem>
      <IonGrid>
        <IonRow>
          <h2>{props.title}</h2>
        </IonRow>
        <IonRow>
          <p>期限：{props.limit.replace(/-/g, '/')}</p>
        </IonRow>
        <IonRow className="ion-justify-content-end">
          <IonButton color="primary" onClick={() => {
            props.showModal()
            props.setCurrTaskIdx()
          }}>編集</IonButton>
          <IonButton color="success" onClick={() => props.completeTask()}>完了</IonButton>
          <IonButton color="danger" onClick={() => props.deleteTask()}>削除</IonButton>
        </IonRow>
      </IonGrid>
    </IonItem>
  )
}

export default TaskItem;