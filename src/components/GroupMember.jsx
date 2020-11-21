import { IonButton, IonItem, IonLabel } from '@ionic/react'
import React from 'react'

const GroupMember = (props) => {
  return(
    <IonItem>
      <IonLabel>{props.name}</IonLabel>
      <IonButton 
        color="danger" 
        onClick={() => props.deleteGroupMember()}
      >削除</IonButton>
    </IonItem>
  )
}
export default GroupMember