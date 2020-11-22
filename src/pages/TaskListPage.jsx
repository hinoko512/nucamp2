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
  IonModal,
  IonRow,
  useIonViewWillEnter
} from '@ionic/react';

import TaskItem from '../components/TaskItem';
import '../css/taskList.css';
import { uploadNotificationData } from '../firebase';
/*
props:
  task: array
  addTask: function
  deleteTask: function
  name: string
*/ 
const TaskListPage = (props) => {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskLimit, setNewTaskLimit] = useState("")
  const [showEditTaskModal, setShowEditTaskModal] = useState(false)
  const [editTaskTitle, setEditTaskTitle] = useState("")
  const [editTaskLimit, setEditTaskLimit] = useState("")
  const [currTaskIdx, setCurrTaskIdx] = useState(-1)
  
  // 期限切れタスクの処理
  useIonViewWillEnter(() => {
    console.log('ionViewWillEnter')
    console.log(JSON.parse(localStorage.taskList))
    const taskList = JSON.parse(localStorage.taskList)
    const date = new Date()
    const y = date.getFullYear().toString()
    const m = (date.getMonth()+1).toString()
    const d = date.getDate().toString()
    const today = y + m + d
    taskList.map((value, index) => {
      let taskLimit = value.limit.replace(/-/g, '')
      if(parseInt(taskLimit) < parseInt(today)) {
        uploadNotificationData( props.userName ,'expired', value.title)
        taskList.splice(index, 1)
      }
    })
    console.log(taskList)
    props.setTaskList(taskList)

  })

  return (
    <IonPage>
      {/* ------ Header ------ */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>課題リスト</IonTitle>
        </IonToolbar>
      </IonHeader>
        {/* ------ Add Task ------ */}
      <div className="ion-padding">
        <h3>新規登録</h3>
        <IonItem>  
          <IonInput 
            placeholder="課題内容" 
            value={newTaskTitle}
            onIonChange={(e) => setNewTaskTitle(e.detail.value)}
          ></IonInput> 
        </IonItem>
        <IonItem>
          <IonLabel position="floating">期限</IonLabel>
          <IonDatetime 
            value={newTaskLimit}
            displayFormat="YYYY MM DD" 
            pickerFormat="YYYY MM DD"
            max="2030-01-01"
            onIonChange={(e) => {setNewTaskLimit(e.detail.value.split('T')[0]);}}
          ></IonDatetime>
        </IonItem>
        <IonButton 
          className="ion-margin-top" 
          color="primary" 
          expand="block"
          onClick={() => {
            props.addTask(newTaskTitle, newTaskLimit)
            setNewTaskTitle("");
            setNewTaskLimit("");
          }} 
        >追加</IonButton>
      </div>

      {/* ------ TaskList ------ */}
      <div className="ion-padding">
        <h3>課題リスト</h3>
      </div>

      {/* ------ タスク編集用Modal ------- */}
      <IonModal isOpen={showEditTaskModal} cssClass="ion-modal">
        <IonContent className="ion-padding ion-margin-bottom">
          <IonItem>  
            <IonInput 
              placeholder="課題内容" 
              onIonChange={(e) => setEditTaskTitle(e.detail.value)}
            ></IonInput> 
          </IonItem>
          <IonItem>
            <IonLabel position="floating">期限</IonLabel>
            <IonDatetime 
              displayFormat="YYYY MM DD" 
              pickerFormat="YYYY MM DD"
              max="2030-01-01"
              onIonChange={(e) => setEditTaskLimit(e.detail.value.split('T')[0])}
            ></IonDatetime>        
          </IonItem>
          <IonRow className="ion-justify-content-end">
            <IonButton onClick={() => setShowEditTaskModal(false)}>キャンセル</IonButton>
            <IonButton onClick={() => {
              props.editTask(editTaskTitle, editTaskLimit, currTaskIdx)
              setShowEditTaskModal(false)
            }}>完了</IonButton>
          </IonRow>
        </IonContent>     
      </IonModal>

      {/* タスクリスト */}
      <IonContent className="ion-padding">
        <IonList>
          {props.taskList.map((value, index) => {
            return (
              <TaskItem 
                key={index.toString()}
                title={value.title} 
                limit={value.limit} 
                deleteTask={() => props.deleteTask(index)}
                remakeTask={() => props.remakeTask(index)}
                completeTask={() => props.completeTask(index)}
                setCurrTaskIdx={() => setCurrTaskIdx(index)}
                showModal={() => setShowEditTaskModal(true)}
              />
            )  
          })}
        </IonList>
      </IonContent>
    </IonPage>
  )
}
export default TaskListPage;
