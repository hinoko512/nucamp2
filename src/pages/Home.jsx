import React, { useState } from 'react';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar,
  IonTitle, 
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonDatetime,
  IonButton,
} from '@ionic/react';

import TaskItem from '../components/TaskItem';

/*
props:
  task: array
  addTask: function
  deleteTask: function
  name: string
*/ 
const Home = (props) => {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskLimit, setNewTaskLimit] = useState("")

  return (
    <IonPage>
      {/* ------ Header ------ */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>ホーム</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      {/* ------ User Name ------ */}
        <IonItem lines="none" className="ion-margin-bottom">
          <IonLabel>ユーザー名：{props.name}</IonLabel>
        </IonItem> 
      {/* ------ Add Task ------ */}
        <IonItem>  
          <IonInput 
            placeholder="タスク内容" 
            onIonChange={(e) => {setNewTaskTitle(e.detail.value); console.log(newTaskTitle)}}
          ></IonInput> 
        </IonItem>
        <IonItem>
          <IonLabel position="floating">期限</IonLabel>
          <IonDatetime 
            displayFormat="MM DD" 
            pickerFormat="MM DD"
            onIonChange={(e) => {setNewTaskLimit(e.detail.value.split('T')[0]);}}
          ></IonDatetime>
        </IonItem>
        <IonButton onClick={() => props.addTask(newTaskTitle, newTaskLimit)} className="ion-margin-top" color="primary" expand="block">追加</IonButton>
      {/* ------ TaskList ------ */}
      <h1>タスクリスト</h1>
      <IonList>
        {props.tasks.map((value, index) => {
          return (
            <TaskItem 
              key={index.toString()}  
              title={value.title} 
              limit={value.limit} 
              deleteTask={() => props.deleteTask(index)}/>
          )  
        })}
      </IonList>
      </IonContent>
    </IonPage>
  )
}
export default Home;
