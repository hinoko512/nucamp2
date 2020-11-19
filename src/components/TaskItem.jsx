import { 
  IonButton, 
  IonGrid, 
  IonItem, 
  IonRow,
  useIonViewDidEnter, 
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
          <p>期限：11/11</p>
        </IonRow>
        <IonRow className="ion-justify-content-end">
          <IonButton color="primary" className="">編集</IonButton>
          <IonButton color="success">完了</IonButton>
          <IonButton color="danger" onClick={() => props.deleteTask(props.task_id)}>削除</IonButton>
        </IonRow>
      </IonGrid>
    </IonItem>
  )
}

export default TaskItem;