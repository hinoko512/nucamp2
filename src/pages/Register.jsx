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
import { registerUser } from '../firebase';
import { presentToast } from '../util';

/*
props:
  setUserName: function
*/ 
const Register = (props) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')
  const [busy, setbusy] = useState(false)

  async function register() {
    setbusy(true)
    if (password !== cpassword) {
      return presentToast('パスワードが確認用と違います')
    }
    if (userName.trim() === '' || password.trim() === '') {
      return presentToast('ユーザ名かパスワードが入力されていません')
    }

    const res = await registerUser(userName, password)
    if (res) {
      props.setUserName(userName)
      presentToast('ユーザー登録に成功しました')
    } 
    setbusy(false)
  }

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>サインアップ</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Registraion is processing..." duration={0} isOpen={busy}></IonLoading>
      <IonContent className="ion-padding">
        <IonInput 
          placeholder="UserName" 
          onIonChange={(e) => {setUserName(e.target.value)}}
          >
        </IonInput>
        <IonInput 
          type="password" 
          placeholder="Password" 
          onIonChange={(e) => {setPassword(e.target.value)}}>
        </IonInput>
        <IonInput 
          type="password"
          placeholder="Confirm Password" 
          onIonChange={(e) => {setCPassword(e.target.value)}}>
        </IonInput>
        <IonButton onClick={register}>Sign up</IonButton>
        <p>登録済みですか？ <Link to="/login">ログイン</Link></p>
      </IonContent>
    </IonPage>
    
  )
}
export default Register