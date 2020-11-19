import { 
  IonCard,
  IonCardHeader,
  IonCardTitle
} from '@ionic/react';
import React from 'react';


const Profile = (props) => {
  return (
    <div className="ion-padding">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>名前</IonCardTitle>
        </IonCardHeader>
      </IonCard>
    </div>
    
  );
}
export default Profile