import { 
  IonContent, 
  IonInput, 
  IonPage, 
  IonHeader,  
  IonToolbar,
  IonTitle,
  IonButton,
  IonLoading
} from '@ionic/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { loginUser } from '../firebase';
import { presentToast } from '../util';

/*
props:
  setUserName: function
*/ 
const Login = (props) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setbusy] = useState(false)


  async function login() {
    setbusy(true)
    const res = await loginUser(userName, password)
    if (res) {
      props.setUserName(userName)
      presentToast('ログインに成功しました')
    }
    setbusy(false)    
  }

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>サインイン</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Loading..." duration={0} isOpen={busy}></IonLoading>
      <IonContent className="ion-padding">
        <IonInput 
          placeholder="UserName" 
          onIonChange={(e) => {setUserName(e.target.value)}}>
        </IonInput>
        <IonInput 
          type="password"
          placeholder="Password" 
          onIonChange={(e) => {setPassword(e.target.value)}}>
        </IonInput>
        <IonButton onClick={login}>Sign in</IonButton>
        <p>アカウントを作成する <Link to="/register">サインアップ</Link></p>
      </IonContent>
    </IonPage>
    
  )
}
export default Login