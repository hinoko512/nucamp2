import React, { useState } from 'react';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar,
  IonTitle, 
  useIonViewDidEnter,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonDatetime,
  IonButton,
} from '@ionic/react';

import Profile from '../components/Profile';
import TaskItem from '../components/TaskItem';
import TaskList from '../components/TaskList';

const Home = (props) => {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskLimit, setNewTaskLimit] = useState("")
  
  useIonViewDidEnter(() => {
    console.log('Home: ', props.tasks);
  })

  return (
    <IonPage>
      {/* ------ Header ------ */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* ------ Profile ------ */}
      <Profile />
      {/* ------ Add Task ------ */}
      <form className="ion-padding">
        <IonItem>  
          <IonLabel position="floating">タスク内容</IonLabel>
          <IonInput value={newTaskTitle} onIonChange={(e) => {setNewTaskTitle(e.detail.value); console.log(newTaskTitle)}}></IonInput> 
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="floating">期限</IonLabel>
          <IonDatetime displayFormat="MM DD" pickerFormat="MM DD" value={newTaskLimit} onIonChange={(e) => {setNewTaskLimit(e.detail.value.split('T')[0]);console.log(newTaskLimit)}}></IonDatetime>
        </IonItem>
        <IonButton onClick={() => props.addTask(newTaskTitle, newTaskLimit)} className="ion-margin-top" color="primary" expand="block">追加</IonButton>
      </form>
      {/* ------ TaskList ------ */}
      <IonContent className="ion-padding">
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
