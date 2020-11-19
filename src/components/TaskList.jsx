import { IonButton, IonContent, IonList } from '@ionic/react';
import React from 'react';
import TaskItem from '../components/TaskItem';

const TaskList = (props) => {
  return (
    <IonContent className="ion-padding">
      <h1>タスクリスト</h1>
      <IonButton onClick={() => props.deleteTask(2)}></IonButton>
      <IonList>
        {props.tasks.map((value, index) => {
          return (
            <TaskItem 
              key={index.toString()} 
              task_id={value.task_id} 
              title={value.title} 
              limit={value.limit} 
              deleteTask={() => props.deleteTask()}/>
          )  
        })}
      </IonList>
    </IonContent>
  )
}
export default TaskList;