// react
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// Pages
import ProfilePage from './pages/ProfilePage';
import TaskListPage from './pages/TaskListPage';
import NotificationPage from './pages/NotificationPage';

// icons
import { person, list, notifications } from 'ionicons/icons';


//firebase
import { getNotificationList } from './firebase';
import { uploadNotificationData } from './firebase';

// Ionic
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  withIonLifeCycle,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';


class App extends React.Component {
  constructor(props) {
    super(props);
    let localStorageTaskList = []
    let localStorageUserName = ""
    let localStorageGroupMember = []
    if('taskList' in localStorage) {
      localStorageTaskList = JSON.parse(localStorage.taskList)
    }
    if('userName' in localStorage) {
      localStorageUserName = JSON.parse(localStorage.userName)
    }
    if('groupMember' in localStorage) {
      localStorageGroupMember = JSON.parse(localStorage.groupMember)
    }
    // Stateの初期化
    this.state = {
      userName: localStorageUserName,
      taskList: localStorageTaskList,
      groupMember:localStorageGroupMember,
      notificationList: [],
      showModal: false
    };
    // if(this.state.groupMember.length !== 0) {
    //   const firestoreNotificationList = getNotificationList(this.state.groupMember);
    //   console.log('[info] getMotificationList')
    // }
    this.setTaskList = this.setTaskList.bind(this);
    this.setUserName = this.setUserName.bind(this);

    this.addGroupMember = this.addGroupMember.bind(this);
    this.deleteGroupMember = this.deleteGroupMember.bind(this);

    this.addTask = this.addTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    
    this.updateNotificationList = this.updateNotificationList.bind(this);
    this.showNotiList = this.showNotiList.bind(this);
  }
  showNotiList = () => {
    console.log(this.state.notificationList)
  }
  // タスクリストを更新する関数
  setTaskList = (taskList) => {
    this.setState({taskList: taskList})
    localStorage.taskList=JSON.stringify(this.state.taskList)
  }

  // ユーザネームを設定する関数
  setUserName = (name) => {
    this.setState({userName: name})
    // this.state.groupMemberの0番目は常に自分
    let newGroupMember = Object.assign([], this.state.groupMember)
    newGroupMember[0] = name
    this.setState({groupMember: newGroupMember})
    console.log('[info] setUserName', this.state.userName)
    localStorage.userName = JSON.stringify(name)
    localStorage.groupMember = JSON.stringify(newGroupMember)
  }
  // グループメンバーを追加する
  addGroupMember = (name) => {
    let newGroupMember = Object.assign([], this.state.groupMember);
    newGroupMember.push(name)
    this.setState({groupMember: newGroupMember});
    localStorage.groupMember = JSON.stringify(newGroupMember)
    console.log('[info] Add GroupMember');
  }
  // グループメンバーを削除する
  deleteGroupMember = (index) => {
    let newGroupMember = Object.assign([], this.state.groupMember);
    newGroupMember.splice(index, 1)
    this.setState({groupMember: newGroupMember});
    localStorage.groupMember = JSON.stringify(newGroupMember)
    console.log('[info] Delete GroupMember');
  }



  //追加ボタンを押したときの処理
  addTask = (title, limit) => {
    const newTask = {
      "title": title,
      "limit": limit
    }
    let newTaskList = Object.assign([], this.state.taskList);
    newTaskList.push(newTask);
    this.setState({taskList: newTaskList});
    localStorage.taskList = JSON.stringify(newTaskList);
    console.log('[info] addTask\n', this.state.taskList);
  }
  // 編集ボタンを押した時の処理
  editTask = (title, limit, index) => {
    let newTaskList = Object.assign([], this.state.taskList)
    newTaskList[index] = {
      "title": title,
      "limit": limit
    }
    this.setState({taskList: newTaskList})
    localStorage.taskList = JSON.stringify(newTaskList)
    console.log('[info] editTask')
  }
  // 完了ボタンを押したときの処理
  completeTask = async (index) => {
    let newTaskList = Object.assign([], this.state.taskList)
    const userName = this.state.userName
    const type = "finish"
    const title = newTaskList[index].title
    await uploadNotificationData(userName, type, title)
    newTaskList.splice(index, 1)
    this.setState({taskList: newTaskList})
    localStorage.taskList = JSON.stringify(newTaskList)
    const newList = await this.updateNotificationList()
    console.log(newList)
  }
  //削除ボタンを押したときの処理
  deleteTask = (index) => {
    let newTaskList = Object.assign([], this.state.taskList);
    newTaskList.splice(index, 1);
    this.setState({taskList: newTaskList})
    localStorage.taskList= JSON.stringify(newTaskList);
    console.log('[info] deleteTask\n', newTaskList);
  }


  
  //　通知リストを更新する関数
  updateNotificationList = async () => {
    let newNotificationList = []
    if(this.state.groupMember.length !== 0) {
      newNotificationList = await getNotificationList(this.state.groupMember)
    }
    console.log('newNotificationList recieved', newNotificationList)
    this.setState({ notificationList: newNotificationList })
    console.log('[info] uploadNotificationList', this.state.notificationList)
    return newNotificationList
  }

  render() {
    return (
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              {/* Profile Page */}
              <Route path="/" render={() => <Redirect to="/profile" />} exact={true} />
              <Route path="/profile" exact={true} render={() => 
                <ProfilePage 
                  userName={this.state.userName}
                  groupMember={this.state.groupMember}
                  addGroupMember={this.addGroupMember}
                  deleteGroupMember={this.deleteGroupMember}
                  setUserName={this.setUserName}
                  taskList={this.state.taskList}
                />}
              />
              {/* taskList Page*/}
              <Route path="/tasklist" exact={true} render={() => 
                <TaskListPage 
                  setTaskList={this.setTaskList}
                  taskList={this.state.taskList} 
                  deleteTask={this.deleteTask} 
                  addTask={this.addTask}
                  editTask={this.editTask}
                  completeTask={this.completeTask}
                  userName={this.state.userName}
                />}/>
              {/* NotificationList */}
              <Route path="/notification" exact={true} render={() => 
                <NotificationPage 
                  a={this.showNotiList}
                  notificationList={this.state.notificationList}
                  updateNotificationList={this.updateNotificationList}
                  userName={this.state.userName}
                  groupMember={this.state.groupMember}
                />}
              />  
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="profile" href="/profile">
                <IonIcon icon={person} />
                <IonLabel>プロフィール</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tasklist" href="/tasklist">
                <IonIcon icon={list} />
                <IonLabel>課題リスト</IonLabel>
              </IonTabButton>
              <IonTabButton tab="notification" href="/notification">
                <IonIcon icon={notifications} />
                <IonLabel>通知</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    );
  }
}

export default withIonLifeCycle(App);
