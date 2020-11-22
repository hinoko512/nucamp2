import { 
  IonContent, 
  IonItem, 
  IonList, 
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonButton,
  IonLabel,
  IonAlert,
  useIonViewWillEnter
} from '@ionic/react'
import React, { useState } from 'react'
import GroupMember from '../components/GroupMember';

/*
props:
  myName: string
  teamMember: array
  setUserName: function
*/ 
const ProfilePage = (props) => {
  const [addMemberName, setAddMemberName] = useState(false)
  const [showEditNameAlert, setShowEditNameAlert] = useState(false)

  useIonViewWillEnter(() => {
    console.log('willEnter: profile\n', localStorage.taskList)
  })
  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>プロフィール</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* My name */}
      <div className="ion-padding">
        <IonItem lines="none">
          <IonLabel>名前：{props.userName}</IonLabel>
          <IonButton onClick={() => setShowEditNameAlert(true)}>編集</IonButton>  
        </IonItem> 
      </div>

      {/* 名前編集用alert */}
      <IonAlert
        isOpen={showEditNameAlert}
        onDidDismiss={() => setShowEditNameAlert(false)}
        header={'名前を入力してください'}
        buttons={[
          {
            text: "キャンセル",
            handler: () => {
              setShowEditNameAlert(false)
            }
          },
          {
            text: "完了",
            handler: (data) => {
              props.setUserName(data.name)
            }
          }
        ]}
        inputs={[
          {
            name: "name",
            type: 'text',
            placeholder: props.userName
          }
        ]}
      />

      {/* Group */}
      <div className="ion-padding">
        <h3>グループ</h3>
      </div>

      <IonContent className="ion-padding">  

        <IonInput 
          placeholder="追加したいメンバーの名前" 
          onIonChange={(e) => {setAddMemberName(e.target.value)}}
        />
        <IonButton 
          expand="block"
          onClick={() => props.addGroupMember(addMemberName)}>追加</IonButton>
        <IonList>
          {props.groupMember.map((value, index) => {
            return(
              <GroupMember
                key={index.toString()}
                name={value}
                index={index}
                deleteGroupMember={() => props.deleteGroupMember(index)}
              />
            )
          })}
        </IonList>
      </IonContent>
    </IonPage>
  )
}
export default ProfilePage